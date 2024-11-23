import React from "react";
import { useAppSelector } from "@/store/store";
import SideEffects from "@/components/common/SideEffect";
import OtherDetails from "@/components/common/OtherDetails";
import Loading from "@/components/common/Loading";

const DrugDetailsComponent: React.FC = () => {
  const drugInfo = useAppSelector(
    (state) => state.reducer.drugInfoReducer.drugInfo
  );

  if (!drugInfo) {
    return (
      <div className="pl-[25px] pr-0 ">
        <div className="flex item-center">
          <div className="max-w-2xl mx-auto p-6">
            <Loading />
          </div>
        </div>
      </div>
    );
  }

  let {
    name,
    status,
    description,
    mechanism_of_action,
    side_effects,
    other_details,
  } = drugInfo;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">{name}</h1>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Status:</span> <span data-testid='drug-status'>{status}</span>
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Description:</span> <span data-testid='drug-description'>{description}</span>
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">Mechanism of Action:</span>
        <span data-testid='mechanism_of_action'>{mechanism_of_action}</span>
      </p>

      {/* Side Effects */}
      <SideEffects sideEffects={side_effects} />

      {/* Other details */}
      <OtherDetails otherDetails={other_details} />
    </div>
  );
};

export default DrugDetailsComponent;
