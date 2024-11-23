import { NextRequest, NextResponse } from "next/server";
import jsonData from "./../drug_candidates.json";

export async function GET(req: NextRequest) {
  // Extract query parameters for pagination
  const { searchParams } = new URL(req.url);
  const drugId = searchParams.get("drugId");

  const filteredDrugData = jsonData.data.filter(
    (drug: any) => drug.drug_id == drugId
  );

  return NextResponse.json({
    drugData: filteredDrugData[0],
  });
}
