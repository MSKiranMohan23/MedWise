import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { DrugInfoProps } from "@/types/drugListing.props";

export type DrugInfoSlice = {
  drugInfo: DrugInfoProps | null;
  drugInfoList: {
    data: DrugInfoProps[] | [];
    currentPage: number;
    totalRecords: number;
    totalPages: number;
  };
};

const initialState: DrugInfoSlice = {
  drugInfo: null,
  drugInfoList: {
    data: [],
    currentPage: 0,
    totalRecords: 0,
    totalPages: 0,
  },
};

const DrugInfoSlice = createSlice({
  name: "druginfo",
  initialState,
  reducers: {
    setDrugInfo: (state, action: PayloadAction<DrugInfoProps>) => {
      state.drugInfo = action.payload;
    },
    setDrugInfoList: (
      state,
      action: PayloadAction<{
        data: DrugInfoProps[] | [];
        currentPage: number;
        totalRecords: number;
        totalPages: number;
      }>
    ) => {
      console.log("data action.payload => ", state, action.payload);
      state.drugInfoList = action.payload;
    },
  },
});

export const { setDrugInfo, setDrugInfoList } = DrugInfoSlice.actions;
export default DrugInfoSlice.reducer;
