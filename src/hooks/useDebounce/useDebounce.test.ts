import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should initialize with null state", () => {
    const { result } = renderHook(() => useDebounce<string>());
    const [state] = result.current;
    expect(state).toBeNull();
  });

  it("should update state after delay", () => {
    const { result } = renderHook(() =>
      useDebounce<string>("Initial value", 1500)
    );
    const [initialState, setState] = result.current;

    act(() => {
      setState("new value");
    });

    expect(initialState).toEqual("Initial value");

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    const [updatedState] = result.current;

    expect(updatedState).toEqual("new value");
  });

  it("should cancel timeout on unmount", () => {
    const { result, unmount } = renderHook(() =>
      useDebounce<string>("Initial value", 1500)
    );
    const [initialState, setState] = result.current;

    act(() => {
      setState("new value");
    });

    expect(initialState).toEqual("Initial value");

    unmount();

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    const [updatedState] = result.current;

    expect(updatedState).toEqual("Initial value");
  });
});
