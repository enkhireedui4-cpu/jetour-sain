import { describe, it, expect } from "vitest";
import config from "../../next.config";

async function csp(): Promise<Record<string, string>> {
  const rules = await config.headers!();
  const value = rules[0].headers.find((h) => h.key === "Content-Security-Policy")!.value;
  return Object.fromEntries(
    value.split(";").map((d) => d.trim()).filter(Boolean).map((d) => {
      const [name, ...sources] = d.split(/\s+/);
      return [name, sources.join(" ")];
    }),
  );
}

describe("Content-Security-Policy", () => {
  it("allows the Google Maps embed on /dealer", async () => {
    expect((await csp())["frame-src"]).toContain("https://www.google.com");
  });

  it("allows Meta Pixel beacons (Lead events) to facebook.com", async () => {
    expect((await csp())["connect-src"]).toContain("https://www.facebook.com");
  });
});
