import { describe, expect, it, vi } from 'vitest';
import type Anthropic from '@anthropic-ai/sdk';
import { classify } from './classifier.js';
import type { ClassifierConfig } from './config.js';
import type { ClassifierInputPost } from '@app/shared-types';

const CONFIG: ClassifierConfig = {
  apiKey: 'sk-test',
  model: 'claude-opus-4-7',
  maxTokens: 1024,
};

function makePost(over: Partial<ClassifierInputPost> = {}): ClassifierInputPost {
  return {
    postId: 'C1a2b3d4',
    accountHandle: 'brand_cz',
    postedAt: new Date('2026-04-10T10:00:00Z'),
    caption: 'Vyhraj n\u00e1\u0161 produkt! Dej like, sleduj n\u00e1s a ozna\u010d kamar\u00e1da.',
    permalink: 'https://www.instagram.com/p/C1a2b3d4/',
    ...over,
  };
}

function makeClient(responseText: string, usage: Partial<Anthropic.Usage> = {}) {
  const create = vi.fn(async () => ({
    id: 'msg_1',
    type: 'message',
    role: 'assistant',
    model: 'claude-opus-4-7',
    stop_reason: 'end_turn',
    stop_sequence: null,
    content: [{ type: 'text', text: responseText }],
    usage: {
      input_tokens: 1000,
      output_tokens: 200,
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
      ...usage,
    },
  }));
  return { client: { messages: { create } } as unknown as Anthropic, create };
}

describe('classify', () => {
  it('parses a well-formed JSON response into typed results', async () => {
    const { client, create } = makeClient(
      JSON.stringify({
        results: [
          {
            postId: 'C1a2b3d4',
            isContest: true,
            summary: 'Dej like, sleduj a ozna\u010d kamar\u00e1da.',
            suggestedComment: '@kamarad ber\u00e1\u0161 m\u011b s sebou?',
            tasks: ['like_post', 'follow_account', 'tag_friend'],
            deadline: '2026-04-20T23:59:00+02:00',
            confidence: 0.95,
          },
        ],
      }),
    );

    const results = await classify(CONFIG, [makePost()], { client });

    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      postId: 'C1a2b3d4',
      isContest: true,
      tasks: ['like_post', 'follow_account', 'tag_friend'],
      confidence: 0.95,
    });
    expect(create).toHaveBeenCalledOnce();
  });

  it('tolerates ```json fences around the JSON body', async () => {
    const { client } = makeClient(
      '```json\n' +
        JSON.stringify({
          results: [
            {
              postId: 'X',
              isContest: false,
              summary: null,
              suggestedComment: null,
              tasks: [],
              deadline: null,
              confidence: 0.9,
            },
          ],
        }) +
        '\n```',
    );

    const results = await classify(CONFIG, [makePost({ postId: 'X' })], { client });
    expect(results[0]?.isContest).toBe(false);
  });

  it('drops results below the confidence threshold', async () => {
    const { client } = makeClient(
      JSON.stringify({
        results: [
          {
            postId: 'lo',
            isContest: true,
            summary: 'mo\u017en\u00e1',
            suggestedComment: null,
            tasks: ['like_post'],
            deadline: null,
            confidence: 0.4,
          },
          {
            postId: 'hi',
            isContest: true,
            summary: 'jist\u011b',
            suggestedComment: null,
            tasks: ['like_post'],
            deadline: null,
            confidence: 0.95,
          },
        ],
      }),
    );

    const results = await classify(
      CONFIG,
      [makePost({ postId: 'lo' }), makePost({ postId: 'hi' })],
      { client },
    );
    expect(results.map((r) => r.postId)).toEqual(['hi']);
  });

  it('sends system prompt with ephemeral cache_control', async () => {
    const { client, create } = makeClient(
      JSON.stringify({ results: [] }),
    );
    await classify(CONFIG, [makePost()], { client });

    const call = create.mock.calls[0]?.[0] as Anthropic.MessageCreateParams;
    expect(Array.isArray(call.system)).toBe(true);
    const systemBlocks = call.system as Array<{ type: string; cache_control?: { type: string } }>;
    expect(systemBlocks[0]?.cache_control).toEqual({ type: 'ephemeral' });
  });

  it('chunks batches larger than MAX_POSTS_PER_BATCH into separate calls', async () => {
    const { client, create } = makeClient(
      JSON.stringify({ results: [] }),
    );
    const posts = Array.from({ length: 23 }, (_, i) => makePost({ postId: `p${i}` }));
    await classify(CONFIG, posts, { client });
    // 23 posts at chunk size 10 → 3 calls
    expect(create).toHaveBeenCalledTimes(3);
  });

  it('throws when the response is not valid JSON', async () => {
    const { client } = makeClient('sorry, I cannot comply');
    await expect(classify(CONFIG, [makePost()], { client })).rejects.toThrow(
      /non-JSON response/,
    );
  });

  it('throws when the response does not match the schema', async () => {
    const { client } = makeClient(
      JSON.stringify({ results: [{ postId: 'x', isContest: 'maybe' }] }),
    );
    await expect(classify(CONFIG, [makePost()], { client })).rejects.toThrow();
  });

  it('short-circuits on empty input without calling the API', async () => {
    const { client, create } = makeClient('{}');
    const results = await classify(CONFIG, [], { client });
    expect(results).toEqual([]);
    expect(create).not.toHaveBeenCalled();
  });
});
