"use client";

import React, { useEffect } from "react";
import DrugListing from "@/components/Drugs/DrugListing";
import { GetDrugDataList } from "@/constants/ApiConstants";
import { fetchData } from "@/utils/FetchDatahelper";
import { store } from "@/store/store";
import { setDrugInfoList } from "@/store/actions/drugInfoSlice";
import { DrugInfoProps } from "@/types/drugListing.props";
import { errorCallback } from "@/utils/common";

type DrugInfoListProps = {
  data: DrugInfoProps[] | [];
  currentPage: number;
  totalRecords: number;
  totalPages: number;
};

const Home = () => {

  const successCallback = (responseData: { data: DrugInfoListProps }) => {
    //Success callback
    const drugList: DrugInfoListProps = responseData.data;
    const updatedData = {
      data: drugList.data,
      currentPage: drugList.currentPage,
      totalRecords: drugList.totalRecords,
      totalPages: drugList.totalPages,
    };

    store.dispatch(setDrugInfoList(updatedData));
  };

  useEffect(() => {
    //Fetching drug candidates
    fetchData(GetDrugDataList, successCallback, errorCallback);
  }, []);

  return (
    <div data-testid="listing-page">
      <div className="">
        <DrugListing />
      </div>
    </div>
  );
};

export default Home;
