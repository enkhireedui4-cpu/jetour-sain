import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { runInNewContext } from "node:vm";

const state = vi.hoisted(() => {
  const oldGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST1234";
  return { scripts: [] as Record<string, unknown>[], oldGaId };
});

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/script", () => ({
  default: (props: Record<string, unknown>) => {
    state.scripts.push(props);
    return null;
  },
}));

import { MetaPixel } from "@/components/jetour/meta-pixel";
import { GoogleAnalytics } from "@/components/jetour/google-analytics";

beforeEach(() => { state.scripts.length = 0; });
afterAll(() => {
  if (state.oldGaId === undefined) delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = state.oldGaId;
});

function metaSandbox() {
  const createElement = vi.fn(() => ({}));
  const sandbox: Record<string, unknown> = {
    document: {
      createElement,
      getElementsByTagName: () => [{ parentNode: { insertBefore: vi.fn() } }],
    },
  };
  sandbox.window = sandbox;
  return { sandbox, createElement };
}

describe("analytics startup", () => {
  it("queues Meta events without downloading the tracker during initialization", () => {
    renderToStaticMarkup(createElement(MetaPixel));
    const init = state.scripts.find((s) => s.id === "meta-pixel")!;
    const { sandbox, createElement: createScript } = metaSandbox();
    runInNewContext(String(init.children), sandbox);
    const fbq = sandbox.fbq as ((...args: unknown[]) => void) & { queue: unknown[][] };
    fbq("track", "Lead", { content_name: "quick-lead" });
    expect(fbq.queue.map((entry) => Array.from(entry))).toEqual([
      ["init", "1359124325435159"],
      ["track", "PageView"],
      ["track", "Lead", { content_name: "quick-lead" }],
    ]);
    expect(createScript).not.toHaveBeenCalled();
  });

  it("initializes the Meta queue once if the bootstrap runs again", () => {
    renderToStaticMarkup(createElement(MetaPixel));
    const init = String(state.scripts.find((s) => s.id === "meta-pixel")!.children);
    const { sandbox } = metaSandbox();
    runInNewContext(init, sandbox);
    runInNewContext(init, sandbox);
    expect((sandbox.fbq as { queue: unknown[] }).queue).toHaveLength(2);
  });

  it("loads both external trackers after the page load", () => {
    renderToStaticMarkup(createElement(MetaPixel));
    renderToStaticMarkup(createElement(GoogleAnalytics));
    const sources = state.scripts.filter((s) => s.src);
    expect(sources).toHaveLength(2);
    expect(sources.every((s) => s.strategy === "lazyOnload")).toBe(true);
  });

  it("retains GA events while its external script is delayed", () => {
    renderToStaticMarkup(createElement(GoogleAnalytics));
    const init = state.scripts.find((s) => s.id === "ga4-init")!;
    const sandbox: Record<string, unknown> = {};
    sandbox.window = sandbox;
    runInNewContext(String(init.children), sandbox);
    (sandbox.gtag as (...args: unknown[]) => void)("event", "generate_lead", { lead_type: "quick-lead" });
    const events = (sandbox.dataLayer as unknown[][]).map((entry) => Array.from(entry));
    expect(events[1]).toEqual(["config", "G-TEST1234", { send_page_view: true }]);
    expect(events[2]).toEqual(["event", "generate_lead", { lead_type: "quick-lead" }]);
  });
});
