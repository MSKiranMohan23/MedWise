"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, use } from "react";
import { GetDrugDataDetails } from "@/constants/ApiConstants";
import { fetchData } from "@/utils/FetchDatahelper";
import { store } from "@/store/store";
import { setDrugInfo } from "@/store/actions/drugInfoSlice";
import { DrugInfoProps } from "@/types/drugListing.props";
import { errorCallback } from "@/utils/common";
import DrugDetailsComponent from "@/components/Drugs/DrugDetails";
import BackwardArrow from "@/Icons/BackwardArrow";

export default function Page({
  params,
}: {
  params: React.Usable<{ slug: string }>;
}) {
  //Getting slug value from url
  const { slug } = use<{ slug: string }>(params);
  const router = useRouter();

  useEffect(() => {
    // if slug is empty  then redirect to listing page
    if (slug == "") {
      router.push("/");
      return;
    }
  }, []);

  const successCallback = (responseData: { drugData: DrugInfoProps }) => {
    //Successs callback
    const drugInfo: DrugInfoProps = responseData.drugData;
    store.dispatch(setDrugInfo(drugInfo));
  };

  useEffect(() => {
    if (slug != "") {
      // Fetch drug candidate details
      fetchData(
        `${GetDrugDataDetails}?drugId=${slug}`,
        successCallback,
        errorCallback
      );
    }
  }, [slug]);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      <div>
        <div className=" p-10">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleBack}
          >
            <span className=" flex flex-row p">
              <span className="mt-1">
                <BackwardArrow />
              </span>
              <span className="text-[15px] ml-3">Back to Listing</span>
            </span>
          </button>
        </div>
        <DrugDetailsComponent />
      </div>
    </>
  );
}
