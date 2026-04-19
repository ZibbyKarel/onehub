import { type ScrapedPost } from '@app/shared-types';
/**
 * Shape of a single edge in the `user.edge_owner_to_timeline_media.edges` array
 * returned from IG's profile GraphQL payload. We only pick the fields we use.
 *
 * IG's internal structure changes regularly — if the scraper starts returning
 * empty arrays, **inspect the live payload first** before blaming this file.
 */
export interface RawIgTimelineNode {
    shortcode: string;
    taken_at_timestamp: number;
    edge_media_to_caption?: {
        edges: Array<{
            node: {
                text: string;
            };
        }>;
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
export declare function extractPostsFromNodes(nodes: RawIgTimelineNode[], opts: ExtractOptions): ScrapedPost[];
/**
 * Extract the profile JSON blob from the raw HTML of `instagram.com/<handle>/`.
 *
 * IG has used a few different shapes over the years:
 * 1. `window._sharedData = { ... };` — legacy, still present on public pages
 * 2. An `<script type="application/json" data-sjs>` ProfilePage block
 *
 * This helper tries them in order and returns the first match's `edges`.
 */
export declare function extractTimelineNodesFromHtml(html: string): RawIgTimelineNode[];
//# sourceMappingURL=parse.d.ts.map