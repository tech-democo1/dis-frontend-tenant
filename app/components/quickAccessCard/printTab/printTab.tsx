import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type Payment, columns } from "./printTableColumns";
import { DataTable } from "~/components/common/dataTable";

export function getData(): Payment[] {
  return [
    {
      id: "1",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      workerType: "OVERSEA",
      employerName: "John Doe",
      employerPhone: "123-456-7890",
      helperName: "May",
      helperCode: "C123",
      depositPaidDate: "13/3/2024",
      printStatus: "all collected",
    },
    {
      id: "2",
      amount: 300,
      status: "success",
      email: "a@example.com",
      workerType: "OVERSEA-EXHK",
      employerName: "WONG WAI",
      employerPhone: "98765432",
      helperName: "Amy",
      helperCode: "C123",
      depositPaidDate: "13/2/2024",
      printStatus: "proofs document missing",
    },
    {
      id: "3",
      amount: 200,
      status: "success",
      email: "b@example.com",
      workerType: "OVERSEA",
      employerName: "CHAN WAI",
      employerPhone: "98765432",
      helperName: "Susan",
      helperCode: "C123",
      depositPaidDate: "13/6/2024",
      printStatus: "all collected",
    },
    {
      id: "4",
      amount: 150,
      status: "pending",
      email: "c@example.com",
      workerType: "OVERSEA-EXHK",
      employerName: "LEE MING",
      employerPhone: "91234567",
      helperName: "Helen",
      helperCode: "C456",
      depositPaidDate: "10/5/2024",
      printStatus: "missing mandatory data",
    },
    // ...add more records as needed
  ];
}

export default function printTab() {
  const data = getData();
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h3>Document Set: </h3>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Immigration Set" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immiSet">Immigration Set</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full py-4">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
