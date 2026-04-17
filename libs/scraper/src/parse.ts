import { scrapedPostSchema, type ScrapedPost } from '@app/shared-types';

/**
 * Shape of a single edge in the `user.edge_owner_to_timeline_media.edges` array
 * returned from IG's profile GraphQL payload. We only pick the fields we use.
 *
 * IG's internal structure changes regularly — if the scraper starts returning
 * empty arrays, **inspect the live payload first** before blaming this file.
 */
export interface RawIgTimelineNode {
  shortcode: string;
  taken_at_timestamp: number; // unix seconds
  edge_media_to_caption?: {
    edges: Array<{ node: { text: string } }>;
  };
  display_url?: string;
  thumbnail_src?: string;
  is_video?: boolean;
  video_url?: string;
}

export interface ExtractOptions {
  accountHandle: string;
  /** Posts older than this are filtered out. `null` means no lower bound. */
  since: Date | null;
  /** Hard cap after filtering. */
  maxPosts: number;
}

/**
 * Convert raw IG nodes into validated `ScrapedPost`s.
 *
 * - Drops nodes whose shape doesn't match `scrapedPostSchema` (rather than
 *   throwing) — a single bad entry shouldn't kill the whole batch.
 * - Sorted newest-first.
 */
export function extractPostsFromNodes(
  nodes: RawIgTimelineNode[],
  opts: ExtractOptions,
): ScrapedPost[] {
  const since = opts.since?.getTime() ?? -Infinity;
  const out: ScrapedPost[] = [];

  const sorted = [...nodes].sort((a, b) => b.taken_at_timestamp - a.taken_at_timestamp);

  for (const node of sorted) {
    if (out.length >= opts.maxPosts) break;
    const postedAt = new Date(node.taken_at_timestamp * 1000);
    if (postedAt.getTime() <= since) break; // sorted desc, we can stop here

    const caption = node.edge_media_to_caption?.edges[0]?.node.text ?? '';
    const mediaUrl = node.display_url ?? node.thumbnail_src ?? null;
    const permalink = `https://www.instagram.com/p/${node.shortcode}/`;

    const parsed = scrapedPostSchema.safeParse({
      shortcode: node.shortcode,
      accountHandle: opts.accountHandle,
      postedAt,
      caption,
      mediaUrl,
      permalink,
    });
    if (parsed.success) out.push(parsed.data);
  }

  return out;
}

/**
 * Extract the profile JSON blob from the raw HTML of `instagram.com/<handle>/`.
 *
 * IG has used a few different shapes over the years:
 * 1. `window._sharedData = { ... };` — legacy, still present on public pages
 * 2. An `<script type="application/json" data-sjs>` ProfilePage block
 *
 * This helper tries them in order and returns the first match's `edges`.
 */
export function extractTimelineNodesFromHtml(html: string): RawIgTimelineNode[] {
  // Legacy _sharedData path
  const sharedDataMatch = html.match(/window\._sharedData\s*=\s*(\{[\s\S]*?\});<\/script>/);
  if (sharedDataMatch?.[1]) {
    try {
      const data = JSON.parse(sharedDataMatch[1]) as unknown;
      const nodes = findTimelineEdges(data);
      if (nodes.length) return nodes;
    } catch {
      // fall through to next strategy
    }
  }

  // Modern inline JSON blocks
  const blockRegex = /<script[^>]+type="application\/json"[^>]*>([\s\S]*?)<\/script>/g;
  for (const match of html.matchAll(blockRegex)) {
    const body = match[1];
    if (!body) continue;
    try {
      const data = JSON.parse(body) as unknown;
      const nodes = findTimelineEdges(data);
      if (nodes.length) return nodes;
    } catch {
      // ignore and try next block
    }
  }

  return [];
}

/**
 * Walk an arbitrary object looking for `edge_owner_to_timeline_media.edges`.
 * IG keeps moving this around inside different nesting paths, so a generic
 * walker is more robust than hard-coding the path.
 */
function findTimelineEdges(root: unknown): RawIgTimelineNode[] {
  const stack: unknown[] = [root];
  const seen = new WeakSet<object>();

  while (stack.length) {
    const cur = stack.pop();
    if (!cur || typeof cur !== 'object') continue;
    if (seen.has(cur as object)) continue;
    seen.add(cur as object);

    const obj = cur as Record<string, unknown>;
    const timeline = obj.edge_owner_to_timeline_media;
    if (timeline && typeof timeline === 'object') {
      const edges = (timeline as Record<string, unknown>).edges;
      if (Array.isArray(edges)) {
        const nodes: RawIgTimelineNode[] = [];
        for (const edge of edges) {
          if (edge && typeof edge === 'object') {
            const node = (edge as Record<string, unknown>).node;
            if (isTimelineNode(node)) nodes.push(node);
          }
        }
        if (nodes.length) return nodes;
      }
    }

    for (const value of Object.values(obj)) {
      if (value && typeof value === 'object') stack.push(value);
    }
  }
  return [];
}

function isTimelineNode(v: unknown): v is RawIgTimelineNode {
  if (!v || typeof v !== 'object') return false;
  const n = v as Record<string, unknown>;
  return typeof n.shortcode === 'string' && typeof n.taken_at_timestamp === 'number';
}
