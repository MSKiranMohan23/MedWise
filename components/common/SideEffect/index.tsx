import React from "react";

const SideEffects = ({ sideEffects }: any) => {
  if (!sideEffects) {
    return <div>Loading...</div>; // Handle loading state
  }
  return (
    <div className="mb-4" data-testid='test-side-effect'>
      <h2 className="text-lg font-semibold">Side Effects:</h2>
      <ul className="list-disc list-inside text-gray-600">
        {sideEffects.map((effect: string, index: number) => (
          <li key={index}>{effect}</li>
        ))}
      </ul>
    </div>
  );
};

export default SideEffects;
