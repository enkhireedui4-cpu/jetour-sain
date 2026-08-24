import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Phase 5 — Vitest configuration (unit tests, Task B).
// `@/` alias is resolved here directly (no vite-tsconfig-paths dependency).
// Environment is `node`: unit targets are pure functions/validators/transformers
// with no DOM. Component (jsdom) + E2E setups are added in Tasks C/E.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      // Scope coverage to the pure modules under test in Task B.
      include: [
        "src/lib/leads.ts",
        "src/lib/cms.ts",
        "src/lib/utils.ts",
        "src/hooks/use-toast.ts",
      ],
    },
  },
});
