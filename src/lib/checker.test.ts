import { describe, it, expect, vi, afterEach } from "vitest";
import { checkUrl } from "@/lib/checker";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("checkUrl", () => {
  it("marks a 200 response as up", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200 }));
    const result = await checkUrl("m1", "https://example.com");

    expect(result.status).toBe("up");
    expect(result.statusCode).toBe(200);
    expect(result.error).toBeUndefined();
  });

  it("marks a 500 response as down but keeps the status code", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    const result = await checkUrl("m1", "https://example.com");

    expect(result.status).toBe("down");
    expect(result.statusCode).toBe(500);
  });

  it("marks a network failure as down with an error message", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));
    const result = await checkUrl("m1", "https://example.com");

    expect(result.status).toBe("down");
    expect(result.statusCode).toBeNull();
    expect(result.error).toBe("ECONNREFUSED");
  });

  it("times out slow requests", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((_url: string, init?: RequestInit) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new Error("aborted"))
          );
        })
      )
    );
    const result = await checkUrl("m1", "https://example.com", 50);

    expect(result.status).toBe("down");
    expect(result.error).toContain("Timed out");
  });

  it("records response time and check timestamp", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200 }));
    const result = await checkUrl("m1", "https://example.com");

    expect(result.responseMs).toBeGreaterThanOrEqual(0);
    expect(result.checkedAt).toBeLessThanOrEqual(Date.now());
    expect(result.monitorId).toBe("m1");
  });
});