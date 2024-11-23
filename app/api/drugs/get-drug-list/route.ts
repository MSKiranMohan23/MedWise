import { NextRequest, NextResponse } from "next/server";
import jsonData from "./../drug_candidates.json";

export async function GET(req: NextRequest) {
  // Extract query parameters for pagination
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("pageLimit") || "10", 10);
  const searchText: string | null = searchParams.get("searchText");
  const filterText = searchParams.get("filterText");

  // Ensure valid pagination parameters
  const validPage = Math.max(1, page);
  const validLimit = Math.max(1, limit);

  // Calculate start and end indices for slicing data
  const startIndex = (validPage - 1) * validLimit;
  const endIndex = startIndex + validLimit;
  let filteredData = jsonData.data;

  if (typeof searchText !== "undefined" && searchText) {
    // return NextResponse.json({ data : searchText})
    filteredData = filteredData.filter(
      (item) =>
        item.name == searchText ||
        item.name.toLowerCase().includes(searchText.toLowerCase().trim())
    );
  }

  if (typeof filterText !== "undefined" && filterText) {
    filteredData = filteredData.filter(
      (drug: any) => drug.status.toLowerCase() == filterText.toLowerCase()
    );
  }

  // Slice the data for the current page
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Prepare response metadata
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / validLimit);

  return NextResponse.json({
    data: {
      data: paginatedData,
      currentPage: validPage,
      totalPages: totalPages,
      totalRecords: totalItems,
      limit: validLimit,
    },
  });
}
