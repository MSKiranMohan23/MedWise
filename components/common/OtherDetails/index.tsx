import React from "react";

import { OtherDetailsProps } from "@/types/drugListing.props";

interface IProps {
  otherDetails : OtherDetailsProps
}

const OtherDetails = ({otherDetails}:IProps) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold" data-testid="test-other-details">
        Other Details:
      </h2>
      <p className="text-gray-600">
        <span className="font-semibold">Manufacturer:</span>
        {otherDetails.manufacturer}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Trial Phase:</span>
        {otherDetails.trial_Phase}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Indications:</span>
        {otherDetails.indications.join(", ")}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Formulation:</span>
        {otherDetails.formulation}
      </p>
    </div>
  );
};

export default OtherDetails;
