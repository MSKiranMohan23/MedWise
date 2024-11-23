"use client";
import React, { useEffect, useState } from "react";

import { DrugInfoProps } from "@/types/drugListing.props";
import DrugCard from "@/components/Drugs/DrugCard";
import { store, useAppSelector } from "@/store/store";
import Loading from "@/components/common/Loading";
import { fetchData } from "@/utils/FetchDatahelper";
import { GetDrugDataList } from "@/constants/ApiConstants";
import { setDrugInfoList } from "@/store/actions/drugInfoSlice";
import { errorCallback } from "@/utils/common";

type DrugInfoListProps = {
  data: DrugInfoProps[] | [];
  currentPage: number;
  totalRecords: number;
  totalPages: number;
};

const DrugListing = () => {
  const [drugData, setDrugData] = useState<DrugInfoProps[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [filterText, setFilterText] = useState<string>("");
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const drugList = useAppSelector(
    (state) => state.reducer.drugInfoReducer.drugInfoList
  );

  useEffect(() => {
    if (drugList.data) {
      setDrugData(drugList.data);
    }
  }, [drugList]);

  const onSearchChangeAction = (searchValue: string) => {
    setSearchText(searchValue);
  };

  const onFilterChangeAction = (filterValue: string) => {
    setFilterText(filterValue);
  };

  const onLimitChangeAction = (limit: number) => {
    setPageLimit(limit);
  };

  const onPaginate = (direction: string) => {
    let pagenum = pageNumber;
    if (direction == "next") {
      pagenum = pageNumber < 10 ? pageNumber + 1 : pageNumber;
    } else {
      pagenum = pageNumber > 1 ? pageNumber - 1 : pageNumber;
    }
    setPageNumber(pagenum);
  };

  const successCallback = (responseData: { data: DrugInfoListProps }) => {
    //Succss callback
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
    let queryString = `page=${pageNumber}`;
    if (pageLimit) {
      queryString += `&pageLimit=${pageLimit}`;
    }
    if (searchText) {
      queryString += `&searchText=${searchText}`;
    }
    if (filterText) {
      queryString += `&filterText=${filterText}`;
    }

    fetchData(
      `${GetDrugDataList}/?${queryString}`,
      successCallback,
      errorCallback
    );
  }, [searchText, filterText, pageLimit, pageNumber]);

  return (
    <>
      <div className="grid pl-[25px] pr-0 " data-testid="drug-listing">
        <div className="h-[59vh]">
          <div className="mr-5 mt-4">Drug Listing page</div>

          {/* Search and filter */}
          <div className="flex block mr-5 mt-4">
            <div className="mb-10 w-[100%]">
              <div className="float-left">
                Search:{" "}
                <input
                  type="text"
                  onChange={(e) => onSearchChangeAction(e.target.value)}
                  className="bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search by Drug Name..."
                />
              </div>
              <div className="float-right flex">
                <div className=" ml-5">
                  Filter:{" "}
                  <select
                    onChange={(e) => {
                      if (e.target.value != "") {
                        onFilterChangeAction(e.target.value);
                      }
                    }}
                    value={filterText}
                    data-testid='test-select-filter'
                  >
                    <option value={""}>Select</option>
                    <option value={"Approved"}>Approved</option>
                    <option value={"In Development"}>In Development</option>
                  </select>
                </div>
                <div className="">
                  Page Limit:
                  <select
                    onChange={(e) => {
                      if (e.target.value != "") {
                        onLimitChangeAction(parseInt(e.target.value));
                      }
                    }}
                    value={pageLimit}
                  >
                    <option value={""}>Select</option>
                    <option value={"10"}>10</option>
                    <option value={"20"}>20</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto p-6 bg-white shadow-md rounded-md overflow-y-auto h-[90%]">
            <div className=" ">
              {drugData.length ? (
                drugData?.map((data: DrugInfoProps, index: number) => {
                  return (
                    <div key={`${index}`}>
                      <DrugCard {...data} />
                    </div>
                  );
                })
              ) : (
                <div className="">
                  {/* <Loading /> */}
                  No data found
                </div>
              )}
            </div>
          </div>
          {/* Pagination */}
          <div>
            <div className="float-right mt-[10px]">
              <button
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                disabled={pageNumber == 1}
                onClick={() => onPaginate("prev")}
              >
                Previous
              </button>
              <button
                className={`ml-[10px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                disabled={pageNumber == 10}
                onClick={() => onPaginate("next")}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrugListing;
