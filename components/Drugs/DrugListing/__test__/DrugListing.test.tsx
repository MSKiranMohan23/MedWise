import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import DrugListing from "@/components/Drugs/DrugListing";
import { store } from "@/store/store";
import * as fetchDataHelper from "@/utils/FetchDatahelper";
import { mockData } from "@/mockData/testData";

// Mock fetchData
jest.mock("@/utils/FetchDatahelper", () => ({
  fetchData: jest.fn(),
}));

// Mock DrugCard
jest.mock("@/components/Drugs/DrugCard", () => jest.fn(({ name }: { name: string }) => <div>{name}</div>));

describe("DrugListing Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the DrugListing component", () => {
    render(
      <Provider store={store}>
        <DrugListing />
      </Provider>
    );

    expect(screen.getByTestId("drug-listing")).toBeInTheDocument();
    expect(screen.getByText(/Drug Listing page/i)).toBeInTheDocument();
  });

  it("displays 'No data found' when drugData is empty", () => {
    render(
      <Provider store={store}>
        <DrugListing />
      </Provider>
    );

    expect(screen.getByText(/No data found/i)).toBeInTheDocument();
  });

  it("fetches and displays drugs on load", async () => {
    const mockFetchData = fetchDataHelper.fetchData as jest.Mock;

    mockFetchData.mockImplementation((url, successCallback) => {
      successCallback({
        data: {
          data: mockData,
          currentPage: 1,
          totalRecords: 2,
          totalPages: 1,
        },
      });
    });

    render(
      <Provider store={store}>
        <DrugListing />
      </Provider>
    );

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalled();
    });

    // Verify DrugCards are rendered
    expect(screen.getByText("DrugA0")).toBeInTheDocument();
    expect(screen.getByText("DrugB0")).toBeInTheDocument();
  });

  it("handles search input change", async () => {
    const mockFetchData = fetchDataHelper.fetchData as jest.Mock;

    mockFetchData.mockImplementation((url, successCallback) => {
      successCallback({
        data: {
          data: mockData.filter((drug) => drug.name.includes("Drug")),
          currentPage: 1,
          totalRecords: 1,
          totalPages: 1,
        },
      });
    });

    render(
      <Provider store={store}>
        <DrugListing />
      </Provider>
    );

    // Simulate typing in the search box
    const searchInput = screen.getByPlaceholderText(/Search by Drug Name/i);
    fireEvent.change(searchInput, { target: { value: "Dru" } });

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalled();
    });

    // Verify filtered results
    expect(screen.getByText("DrugA0")).toBeInTheDocument();
    expect(screen.queryByText("DrugB0")).toBeInTheDocument();
  });

  it("handles filter selection", async () => {
    const mockFetchData = fetchDataHelper.fetchData as jest.Mock;

    mockFetchData.mockImplementation((url, successCallback) => {
      successCallback({
        data: {
          data: mockData,
          currentPage: 1,
          totalRecords: 1,
          totalPages: 1,
        },
      });
    });

    render(
      <Provider store={store}>
        <DrugListing />
      </Provider>
    );

    // Simulate filter selection
    const filterSelect = screen.getByTestId('test-select-filter') as HTMLSelectElement;
    fireEvent.change(filterSelect, { target: { value: "Approved" } });

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalled();
    });

    // Verify filtered results
    expect(screen.getByText("DrugA0")).toBeInTheDocument();
  });

  it("handles pagination", async () => {
    const mockFetchData = fetchDataHelper.fetchData as jest.Mock;

    mockFetchData.mockImplementation((url, successCallback) => {
      successCallback({
        data: {
          data: mockData.slice(0, 1),
          currentPage: 2,
          totalRecords: 2,
          totalPages: 2,
        },
      });
    });

    render(
      <Provider store={store}>
        <DrugListing />
      </Provider>
    );

    // Simulate clicking "Next"
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalled();
    });

    // Verify paginated results
    expect(screen.getByText("DrugA0")).toBeInTheDocument();
    expect(screen.queryByText("DrugB0")).not.toBeInTheDocument();
  });
});
