import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Printer, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { PrintStatusProgressBar } from "./printStatusProgressBar";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  workerType: string;
  employerName: string;
  employerPhone: string;
  helperName: string;
  helperCode: string;
  depositPaidDate: string;
  printStatus:
    | "missing mandatory data"
    | "proofs document missing"
    | "all collected";
};

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "employerPhone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Employer's Phone
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
    accessorKey: "helperCode",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Helper's Code
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <div className="pl-2">{String(getValue())}</div>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "depositPaidDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Deposit Paid Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <div className="pl-2">{String(getValue())}</div>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "printStatus",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: { row: { original: Payment } }) => (
      <div className="pl-2">
        <PrintStatusProgressBar status={row.original.printStatus} />
      </div>
    ),
    sortingFn: (a, b) => {
      const order = [
        "missing mandatory data",
        "proofs document missing",
        "all collected",
      ];
      return (
        order.indexOf(a.getValue("printStatus")) -
        order.indexOf(b.getValue("printStatus"))
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }: { row: { original: Payment } }) => (
      <div className="flex gap-2 pl-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            // Print logic here
            //window.print();
          }}
        >
          <Printer className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            // View more logic here
            alert(`View more for ${row.original.id}`);
          }}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
