import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DrugDetailsComponent from "@/components/Drugs/DrugDetails";
// import Loading from "@/components/common/Loading";
import SideEffects from "@/components/common/SideEffect";
import OtherDetails from "@/components/common/OtherDetails";

jest.mock("@/components/common/Loading", () =>
  jest.fn(() => <div>Loading...</div>)
);
jest.mock("@/components/common/SideEffect", () =>
  jest.fn(() => <div>Side Effects Component</div>)
);
jest.mock("@/components/common/OtherDetails", () =>
  jest.fn(() => <div>Other Details Component</div>)
);

const mockStore = configureStore([]);

describe("DrugDetailsComponent", () => {
  it("renders the loading state when drugInfo is null", () => {
    const store = mockStore({
      reducer: {
        drugInfoReducer: {
          drugInfo: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <DrugDetailsComponent />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the drug details when drugInfo is available", () => {
    const mockDrugInfo = {
      drug_id: "drug-id-0",
      name: "DrugA0",
      status: "Approved",
      description: "Targets cancer cells with precision.",
      mechanism_of_action: "Modulates NMDA receptors.",
      side_effects: ["Fatigue", "Increased risk of infections"],
      other_details: {
        manufacturer: "HeartWell Pharma",
        trial_Phase: "Phase I",
        indications: ["Chronic pain", "Neuropathic pain"],
        formulation: "Oral tablet",
      },
    };

    const store = mockStore({
      reducer: {
        drugInfoReducer: {
          drugInfo: mockDrugInfo,
        },
      },
    });

    render(
      <Provider store={store}>
        <DrugDetailsComponent />
      </Provider>
    );

    // Check drug info fields
    expect(screen.getByText("DrugA0")).toBeInTheDocument();
    expect(screen.getByTestId('drug-status')).toHaveTextContent("Approved");
    expect(screen.getByTestId('drug-description')).toHaveTextContent(
      "Targets cancer cells with precision."
    );
    expect(screen.getByTestId('mechanism_of_action')).toHaveTextContent(
      "Modulates NMDA receptors."
    );
   
  });

  it("renders with empty side effects and other details if not provided", () => {
    const mockDrugInfo = {
      drug_id: "drug-id-1",
      name: "DrugB0",
      status: "In Development",
      description: "Designed for cognitive enhancement.",
      mechanism_of_action: "Acts on serotonin reuptake inhibitors.",
      side_effects: [],
      other_details: {},
    };

    const store = mockStore({
      reducer: {
        drugInfoReducer: {
          drugInfo: mockDrugInfo,
        },
      },
    });

    render(
      <Provider store={store}>
        <DrugDetailsComponent />
      </Provider>
    );

    expect(screen.getByText("DrugB0")).toBeInTheDocument();
    expect(SideEffects).toHaveBeenCalledWith({ sideEffects: [] }, {});
    expect(OtherDetails).toHaveBeenCalledWith({ otherDetails: {} }, {});
  });
});
