import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import DrugDetailsCard from "@/components/Drugs/DrugCard";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
});

jest.mock("@/Icons/ForwardArrow", () => () => (
  <svg data-testid="forward-arrow" />
));

describe("DrugDetailsCard Component", () => {
  const mockProps = {
    drug_id: "drug-id-1",
    name: "DrugB0",
    status: "In Development",
    description: "Designed for cognitive enhancement.",
    mechanism_of_action: "Acts on serotonin reuptake inhibitors.",
    side_effects: ["Abdominal pain", "Mild anxiety"],
    other_details: {
      manufacturer: "PharmaGenix Inc.",
      trial_Phase: "Phase III",
      indications: ["Rheumatoid arthritis", "Crohn's disease"],
      formulation: "IV drip",
    },
  };

  it("renders the drug details correctly", () => {
    render(<DrugDetailsCard {...mockProps} />);

    expect(screen.getByText("DrugB0")).toBeInTheDocument();
    expect(screen.getByTestId("drug-status")).toHaveTextContent(
      "In Development"
    );
    expect(screen.getByTestId("drug-description")).toHaveTextContent(
      "Designed for cognitive enhancement."
    );
  });

  it("renders the link with correct href and text", () => {
    render(<DrugDetailsCard {...mockProps} />);

    const link = screen.getByTestId("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/drug-details/drug-id-1");
    expect(screen.getByText("More info on DrugB0")).toBeInTheDocument();
  });

  it("renders the ForwardArrow icon", () => {
    render(<DrugDetailsCard {...mockProps} />);

    expect(screen.getByTestId("forward-arrow")).toBeInTheDocument();
  });

  it("navigates to the correct URL when the link is clicked", async () => {
    const user = userEvent.setup();
    render(<DrugDetailsCard {...mockProps} />);

    const link = screen.getByTestId("link");
    expect(link).toBeInTheDocument();

    await user.click(link);
    expect(link).toHaveAttribute("href", "/drug-details/drug-id-1");
  });
});
