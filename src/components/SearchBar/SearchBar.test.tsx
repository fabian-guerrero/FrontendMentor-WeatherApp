import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";

const mockFetch = (data: any, ok = true) => {
  globalThis.fetch = vi.fn(
    () =>
      Promise.resolve({
        ok,
        json: async () => data,
      }) as Response
  ) as unknown as typeof fetch;
};

describe("SearchBar component", () => {
  it("renderiza input y botón", () => {
    render(<SearchBar onSelectLocation={() => {}} onSetNoResults={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("dispara onSetNoResults(true) cuando no hay resultados", async () => {
    const mockSelect = vi.fn();
    const mockNoResults = vi.fn();

    mockFetch({ results: [] });

    render(
      <SearchBar onSelectLocation={mockSelect} onSetNoResults={mockNoResults} />
    );
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "noresults" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(mockNoResults).toHaveBeenCalledWith(true);
      expect(mockSelect).toHaveBeenCalledWith(null);
    });
  });
});
