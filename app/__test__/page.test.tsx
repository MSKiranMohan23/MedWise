import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import * as fetchDataHelper from "@/utils/FetchDatahelper"; // Import the fetchData helper to mock it
import { store } from "@/store/store";
import { setDrugInfoList } from "@/store/actions/drugInfoSlice";
import DrugListing from "@/components/Drugs/DrugListing";
import {mockData} from '@/mockData/testData'

// Mocking the store and components
jest.mock("@/store/store", () => ({
  store: {
    dispatch: jest.fn(),
  },
}));

jest.mock("@/components/Drugs/DrugListing", () => jest.fn(() => <div data-testid="drug-listing" />));

// Mocking fetchData
jest.mock("@/utils/FetchDatahelper", () => ({
  fetchData: jest.fn(),
}));

describe("Home Component", () => {
  it("renders the Home component and DrugListing", () => {
    render(<Home />);

    // Assert that the listing page is rendered
    expect(screen.getByTestId("listing-page")).toBeInTheDocument();

    // Assert that the DrugListing component is rendered
    expect(screen.getByTestId("drug-listing")).toBeInTheDocument();
  });

  it("calls fetchData on mount", async () => {
    // Mock fetchData to simulate API response
    const mockFetchData = fetchDataHelper.fetchData as jest.Mock;
    const mockApiResponse = {
      data: {
        data: mockData,
        currentPage: 1,
        totalRecords: 2,
        totalPages: 1,
      },
    };

    mockFetchData.mockImplementation((url, successCallback) => {
      successCallback(mockApiResponse);
    });

    render(<Home />);

    // Wait for fetchData to be called
    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith(
        expect.any(String), // The API URL
        expect.any(Function), // The success callback
        expect.any(Function) // The error callback
      );
    });

    // Assert that the store dispatch was called with the correct data
    expect(store.dispatch).toHaveBeenCalledWith(
      setDrugInfoList({
        data: mockApiResponse.data.data,
        currentPage: mockApiResponse.data.currentPage,
        totalRecords: mockApiResponse.data.totalRecords,
        totalPages: mockApiResponse.data.totalPages,
      })
    );
  });

  it("handles fetchData errorCallback", async () => {
    // Mock fetchData to call the error callback
    const mockFetchData = fetchDataHelper.fetchData as jest.Mock;
    const mockErrorCallback = jest.fn();

    mockFetchData.mockImplementation((url, successCallback, errorCallback) => {
      errorCallback("Error occurred");
    });

    render(<Home />);

    // Wait for fetchData to be called
    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalled();
    });

    // Assert that the errorCallback was called
    expect(mockErrorCallback).not.toHaveBeenCalled(); 
  });
});
