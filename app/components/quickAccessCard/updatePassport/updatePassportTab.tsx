import * as React from "react";
import { type updatePassportCols, columns } from "./updatePassportColumns";
import { DataTable } from "~/components/common/dataTable";

export function getData(): updatePassportCols[] {
  return [
    {
      workerType: "OVERSEA",
      employerName: "John Doe",
      code: "123-456-7890",
      helperName: "May",
      visaExpiryDate: "13/3/2024",
      passportExpiryDate: "13/3/2024",
    },
    {
      workerType: "OVERSEA-EXHK",
      employerName: "WONG WAI",
      code: "98765432",
      helperName: "Amy",
      visaExpiryDate: "13/2/2024",
      passportExpiryDate: "13/2/2024",
    },
    {
      workerType: "OVERSEA",
      employerName: "CHAN WAI",
      code: "98765432",
      helperName: "Susan",
      visaExpiryDate: "13/6/2024",
      passportExpiryDate: "13/6/2024",
    },
  ];
}

export default function UpdatePassportTab() {
  const data = getData();
  return (
    <div className="w-full py-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
