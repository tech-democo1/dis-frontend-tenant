import * as React from "react";
import { type missingDocCols, columns } from "./missingDocumentColumns";
import { DataTable } from "~/components/common/dataTable"; // Reuse DataTable if structure is the same

// Sample data for missing documents
export function getData(): missingDocCols[] {
  return [
    {
      workerType: "OVERSEA",
      employerName: "John Doe",
      employerPhone: "123-456-7890",
      helperName: "May",
      depositPaidDate: "13/3/2024",
      missingDocCount: 2,
      missingDocList: ["Passport", "Visa"], // Example missing documents
    },
    {
      workerType: "OVERSEA-EXHK",
      employerName: "WONG WAI",
      employerPhone: "98765432",
      helperName: "Amy",
      depositPaidDate: "13/2/2024",
      missingDocCount: 1,
      missingDocList: ["Medical Report"], // Example missing document
    },
    {
      workerType: "OVERSEA",
      employerName: "CHAN WAI",
      employerPhone: "98765432",
      helperName: "Susan",
      depositPaidDate: "13/6/2024",
      missingDocCount: 0,
      missingDocList: [], // No missing documents
    },
  ];
}

export default function MissingDocumentTab() {
  const data = getData();
  return (
    <div className="w-full py-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
