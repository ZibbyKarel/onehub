import { scrapedPostSchema } from '@app/shared-types';
/**
 * Convert raw IG nodes into validated `ScrapedPost`s.
 *
 * - Drops nodes whose shape doesn't match `scrapedPostSchema` (rather than
 *   throwing) — a single bad entry shouldn't kill the whole batch.
 * - Sorted newest-first.
 */
export function extractPostsFromNodes(nodes, opts) {
    const since = opts.since?.getTime() ?? -Infinity;
    const out = [];
    const sorted = [...nodes].sort((a, b) => b.taken_at_timestamp - a.taken_at_timestamp);
    for (const node of sorted) {
        if (out.length >= opts.maxPosts)
            break;
        const postedAt = new Date(node.taken_at_timestamp * 1000);
        if (postedAt.getTime() <= since)
            break; // sorted desc, we can stop here
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
        if (parsed.success)
            out.push(parsed.data);
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
export function extractTimelineNodesFromHtml(html) {
    // Legacy _sharedData path
    const sharedDataMatch = html.match(/window\._sharedData\s*=\s*(\{[\s\S]*?\});<\/script>/);
    if (sharedDataMatch?.[1]) {
        try {
            const data = JSON.parse(sharedDataMatch[1]);
            const nodes = findTimelineEdges(data);
            if (nodes.length)
                return nodes;
        }
        catch {
            // fall through to next strategy
        }
    }
    // Modern inline JSON blocks
    const blockRegex = /<script[^>]+type="application\/json"[^>]*>([\s\S]*?)<\/script>/g;
    for (const match of html.matchAll(blockRegex)) {
        const body = match[1];
        if (!body)
            continue;
        try {
            const data = JSON.parse(body);
            const nodes = findTimelineEdges(data);
            if (nodes.length)
                return nodes;
        }
        catch {
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
function findTimelineEdges(root) {
    const stack = [root];
    const seen = new WeakSet();
    while (stack.length) {
        const cur = stack.pop();
        if (!cur || typeof cur !== 'object')
            continue;
        if (seen.has(cur))
            continue;
        seen.add(cur);
        const obj = cur;
        const timeline = obj.edge_owner_to_timeline_media;
        if (timeline && typeof timeline === 'object') {
            const edges = timeline.edges;
            if (Array.isArray(edges)) {
                const nodes = [];
                for (const edge of edges) {
                    if (edge && typeof edge === 'object') {
                        const node = edge.node;
                        if (isTimelineNode(node))
                            nodes.push(node);
                    }
                }
                if (nodes.length)
                    return nodes;
            }
        }
        for (const value of Object.values(obj)) {
            if (value && typeof value === 'object')
                stack.push(value);
        }
    }
    return [];
}
function isTimelineNode(v) {
    if (!v || typeof v !== 'object')
        return false;
    const n = v;
    return typeof n.shortcode === 'string' && typeof n.taken_at_timestamp === 'number';
}
//# sourceMappingURL=parse.js.map