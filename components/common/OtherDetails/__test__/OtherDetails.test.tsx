// test-other-details

import React from "react";
import { render, screen } from "@testing-library/react";
import DrugDetailsCard from "@/components/common/OtherDetails";
import { OtherDetailsProps } from "@/types/drugListing.props";

// Mock the ForwardArrow component
jest.mock("@/Icons/ForwardArrow", () => () => (
  <svg data-testid="forward-arrow" />
));

// Mock the next/link component
jest.mock("next/link", () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="drug-link">
      {children}
    </a>
  );
});

describe("DrugDetailsCard Component", () => {
  const mockProps: OtherDetailsProps =
  {
    manufacturer: "PharmaGenix Inc.",
    trial_Phase: "Phase III",
    indications: ["Rheumatoid arthritis", "Crohn's disease"],
    formulation: "IV drip",
  };

  it("renders the drug details correctly", () => {
    render(<DrugDetailsCard otherDetails={mockProps} />);

    expect(screen.getByTestId("test-other-details")).toBeInTheDocument();
  
  });

});
