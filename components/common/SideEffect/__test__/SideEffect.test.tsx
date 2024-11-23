import React from "react";
import { render, screen } from "@testing-library/react";
import SideEffects from "@/components/common/SideEffect"; // Adjust the import according to your file structure

describe("SideEffects Component", () => {
  it("renders loading state when no side effects are provided", () => {
    render(<SideEffects sideEffects={null} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the side effects list when side effects are provided", () => {
    const mockSideEffects = ["Nausea", "Headache", "Dizziness"];
    render(<SideEffects sideEffects={mockSideEffects} />);
    
    expect(screen.getByTestId("test-side-effect")).toBeInTheDocument();
    expect(screen.getByText("Side Effects:")).toBeInTheDocument();
    mockSideEffects.forEach((effect) => {
      expect(screen.getByText(effect)).toBeInTheDocument();
    });
  });
});
