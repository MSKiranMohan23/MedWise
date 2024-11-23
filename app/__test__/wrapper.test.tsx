import { render, screen } from "@testing-library/react";
import Wrapper from "../wrapper";

describe("RootLayout and wrapper component", () => {
  it("renders correctly with children", () => {
    const testChildText = "Test Child Content";
    render(
      <Wrapper>
          {testChildText}
      </Wrapper>
    );
    // Check if Providers and Wrapper components render
    // expect(screen.getByTestId("provider")).toBeInTheDocument();
    expect(screen.getByTestId("wrapper")).toBeInTheDocument();

    // Check if children render inside the Wrapper component
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });
});
