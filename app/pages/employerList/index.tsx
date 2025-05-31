import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useLocation } from "react-router";

import { type employerListCols, columns } from "./employerListColumns";
import { DataTable } from "~/components/common/dataTable";

export function getData(): employerListCols[] {
  return [
    {
      employerName: "John Doe",
      employerPhone: "123-456-7890",
      latestStatus: "C123",
    },
    {
      employerName: "WONG WAI",
      employerPhone: "98765432",
      latestStatus: "proofs document missing",
    },
    {
      employerName: "CHAN WAI",
      employerPhone: "98765432",
      latestStatus: "all collected",
    },
    {
      employerName: "LEE MING",
      employerPhone: "91234567",
      latestStatus: "missing mandatory data",
    },
    // ...add more records as needed
  ];
}

const Index = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const data = getData();
  // Use `search` to filter your datatable
  // ...

  return (
    <>
      <Card className="h-[600px]">
        <CardContent>
          <div className="w-full py-4">
            <DataTable columns={columns} data={data} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Index;
