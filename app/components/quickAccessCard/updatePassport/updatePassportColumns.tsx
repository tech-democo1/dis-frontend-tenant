import { ArrowUpDown, Search, MessageCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";

export type updatePassportCols = {
  workerType: string;
  employerName: string;
  code: string;
  helperName: string;
  visaExpiryDate: string;
  passportExpiryDate: string;
};

export const columns: ColumnDef<updatePassportCols>[] = [
  {
    accessorKey: "workerType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Worker Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <div className="pl-2">{String(getValue())}</div>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "employerName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Employer's Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <div className="pl-2">{String(getValue())}</div>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Code
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <div className="pl-2">{String(getValue())}</div>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "helperName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Helper's Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <div className="pl-2">{String(getValue())}</div>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "visaExpiryDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Visa Expiry Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <div className="pl-2">{String(getValue())}</div>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "passportExpiryDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Passport Expiry Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <div className="pl-2">{String(getValue())}</div>,
    sortingFn: "alphanumeric",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }: { row: { original: updatePassportCols } }) => (
      <div className="flex gap-2 pl-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            // View more logic here
            alert(`View more for ${row.original.employerName}`);
          }}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
