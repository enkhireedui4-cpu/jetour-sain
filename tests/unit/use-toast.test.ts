import { describe, it, expect, vi, afterEach } from "vitest";
import { reducer } from "@/hooks/use-toast";

type ToastState = Parameters<typeof reducer>[0];

const toast = (id: string) => ({ id, open: true, title: id });

afterEach(() => {
  vi.useRealTimers();
});

describe("use-toast reducer", () => {
  it("ADD_TOAST prepends and honours TOAST_LIMIT (1)", () => {
    let state: ToastState = { toasts: [] };
    state = reducer(state, { type: "ADD_TOAST", toast: toast("1") as never });
    state = reducer(state, { type: "ADD_TOAST", toast: toast("2") as never });
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].id).toBe("2"); // newest kept
  });

  it("UPDATE_TOAST merges fields into the matching toast", () => {
    const state: ToastState = { toasts: [toast("1") as never] };
    const next = reducer(state, { type: "UPDATE_TOAST", toast: { id: "1", title: "updated" } });
    expect(next.toasts[0].title).toBe("updated");
  });

  it("DISMISS_TOAST with an id closes only that toast", () => {
    vi.useFakeTimers(); // reducer schedules a removal timeout as a side effect
    const state: ToastState = { toasts: [toast("1") as never, toast("2") as never] };
    const next = reducer(state, { type: "DISMISS_TOAST", toastId: "1" });
    expect(next.toasts.find((t) => t.id === "1")?.open).toBe(false);
    expect(next.toasts.find((t) => t.id === "2")?.open).toBe(true);
  });

  it("DISMISS_TOAST without an id closes all toasts", () => {
    vi.useFakeTimers();
    const state: ToastState = { toasts: [toast("1") as never, toast("2") as never] };
    const next = reducer(state, { type: "DISMISS_TOAST" });
    expect(next.toasts.every((t) => t.open === false)).toBe(true);
  });

  it("REMOVE_TOAST with an id removes only that toast", () => {
    const state: ToastState = { toasts: [toast("1") as never, toast("2") as never] };
    const next = reducer(state, { type: "REMOVE_TOAST", toastId: "1" });
    expect(next.toasts.map((t) => t.id)).toEqual(["2"]);
  });

  it("REMOVE_TOAST without an id clears everything", () => {
    const state: ToastState = { toasts: [toast("1") as never] };
    const next = reducer(state, { type: "REMOVE_TOAST" });
    expect(next.toasts).toEqual([]);
  });
});
