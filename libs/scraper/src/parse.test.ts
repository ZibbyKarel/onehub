import { describe, expect, it } from 'vitest';
import {
  extractPostsFromNodes,
  extractTimelineNodesFromHtml,
  type RawIgTimelineNode,
} from './parse.js';

function node(over: Partial<RawIgTimelineNode> = {}): RawIgTimelineNode {
  return {
    shortcode: 'C1abcd',
    taken_at_timestamp: Math.floor(new Date('2026-04-10T10:00:00Z').getTime() / 1000),
    edge_media_to_caption: { edges: [{ node: { text: 'Vyhraj produkt! #soutez' } }] },
    display_url: 'https://scontent.example/media.jpg',
    ...over,
  };
}

describe('extractPostsFromNodes', () => {
  it('maps valid nodes into ScrapedPosts with permalink', () => {
    const posts = extractPostsFromNodes([node()], {
      accountHandle: 'brand',
      since: null,
      maxPosts: 10,
    });
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({
      shortcode: 'C1abcd',
      accountHandle: 'brand',
      permalink: 'https://www.instagram.com/p/C1abcd/',
      caption: 'Vyhraj produkt! #soutez',
    });
  });

  it('respects the maxPosts cap', () => {
    const nodes = Array.from({ length: 5 }, (_, i) =>
      node({ shortcode: `C1abc${i}`, taken_at_timestamp: 1_700_000_000 + i }),
    );
    const posts = extractPostsFromNodes(nodes, {
      accountHandle: 'b',
      since: null,
      maxPosts: 3,
    });
    expect(posts).toHaveLength(3);
  });

  it('stops at posts older than `since` (sorted newest-first)', () => {
    const nodes = [
      node({ shortcode: 'new1', taken_at_timestamp: 1_700_000_100 }),
      node({ shortcode: 'new2', taken_at_timestamp: 1_700_000_050 }),
      node({ shortcode: 'old1', taken_at_timestamp: 1_699_999_000 }),
    ];
    const since = new Date(1_700_000_000 * 1000);
    const posts = extractPostsFromNodes(nodes, { accountHandle: 'b', since, maxPosts: 10 });
    expect(posts.map((p) => p.shortcode)).toEqual(['new1', 'new2']);
  });

  it('drops malformed nodes without throwing', () => {
    const bad = { shortcode: '', taken_at_timestamp: 1 } as unknown as RawIgTimelineNode;
    const posts = extractPostsFromNodes([bad, node()], {
      accountHandle: 'b',
      since: null,
      maxPosts: 10,
    });
    expect(posts).toHaveLength(1);
    expect(posts[0]?.shortcode).toBe('C1abcd');
  });

  it('falls back to empty caption and null mediaUrl', () => {
    const bare = node({
      shortcode: 'bare1',
      edge_media_to_caption: { edges: [] },
      display_url: undefined,
      thumbnail_src: undefined,
    });
    const posts = extractPostsFromNodes([bare], {
      accountHandle: 'b',
      since: null,
      maxPosts: 10,
    });
    expect(posts[0]?.caption).toBe('');
    expect(posts[0]?.mediaUrl).toBeNull();
  });
});

describe('extractTimelineNodesFromHtml', () => {
  it('reads timeline edges from legacy window._sharedData', () => {
    const payload = {
      entry_data: {
        ProfilePage: [
          {
            graphql: {
              user: {
                edge_owner_to_timeline_media: {
                  edges: [{ node: node({ shortcode: 'leg1' }) }],
                },
              },
            },
          },
        ],
      },
    };
    const html =
      '<html><body><script>window._sharedData = ' +
      JSON.stringify(payload) +
      ';</script></body></html>';
    const nodes = extractTimelineNodesFromHtml(html);
    expect(nodes).toHaveLength(1);
    expect(nodes[0]?.shortcode).toBe('leg1');
  });

  it('reads timeline edges from modern inline JSON blocks', () => {
    const payload = {
      some: {
        nested: {
          user: {
            edge_owner_to_timeline_media: {
              edges: [{ node: node({ shortcode: 'mod1' }) }],
            },
          },
        },
      },
    };
    const html =
      '<html><body><script type="application/json" data-sjs>' +
      JSON.stringify(payload) +
      '</script></body></html>';
    const nodes = extractTimelineNodesFromHtml(html);
    expect(nodes[0]?.shortcode).toBe('mod1');
  });

  it('returns [] when no timeline block is present', () => {
    expect(extractTimelineNodesFromHtml('<html></html>')).toEqual([]);
  });
});
