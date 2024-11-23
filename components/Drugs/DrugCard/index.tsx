import React from "react";
import { DrugInfoProps } from "@/types/drugListing.props";
import Link from "next/link";
import ForwardArrow from "@/Icons/ForwardArrow";

const DrugDetailsCard: React.FC<DrugInfoProps> = (props) => {

  const { drug_id, name, status, description } = props;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4" data-testid='drug-name'>{name}</h1>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Status:</span> <span data-testid='drug-status'>{status}</span>
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Description:</span> <span data-testid='drug-description'>{description}</span>
      </p>
      <div className="w-[100%]">
        <span className="float-right">
          <Link  data-testid='drug-link' href={`/drug-details/${drug_id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span className="mr-3">{`More info on ${name}`}</span> <ForwardArrow />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default DrugDetailsCard;
