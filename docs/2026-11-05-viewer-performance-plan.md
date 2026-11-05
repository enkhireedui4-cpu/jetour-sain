# Viewer loading improvements

User request: apply the CHERY loading improvements to Jetour and push this repository.

1. Replace unbounded frame loading with a cancellable queue. Load the current angle first, then neighbours; report successful frames, keep the previous vehicle visible, retry failures, and retain at most two decoded paints under an estimated memory budget.
2. Generate versioned 640px WebP spin frames for small screens. Keep existing desktop files. Match frame rendering and preloading URLs.
3. Replace eagerly mounted static colour images with a selected-only image loader. Preserve the last decoded image until the requested image is ready. Show actual transfer/decode status, support retries, and ignore stale responses.
4. Verify queue behaviour with deterministic tests and browser interactions (initial load, colour change, cached return, rapid changes, failed frame/retry, mobile scrolling and drag). Run available lint/type/build checks, perform a fresh review, commit only these changes and push main.

Reference: public Jetour Global T2 viewer inspected during the CHERY work. Its compact 60×30px percentage badge, selected-angle priority and selected-only colour loading inform this work. Failed frames must not be counted as successful, unlike the reference.

Baseline: main 1f9f9ea. Existing unrelated edit in src/components/jetour/contact.tsx is excluded.

Execution notes:
- npm ci cannot fetch packages in the shell environment (EACCES). Verification will use available local tools while investigating dependency availability; do not change the lockfile or runtime dependency versions.
- Final review: no critical findings. Reclassified the reviewer's per-frame-timeout finding as important for this request: a stalled slow-network queue could hide Retry for six minutes. Added a 45-second overall deadline; successfully decoded frames survive retry. Regression reproduced failing, then passed after the fix. Tradeoff: extremely slow transfers may require Retry.
