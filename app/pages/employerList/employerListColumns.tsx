import { ArrowUpDown, Search, MessageCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";
export type employerListCols = {
  employerName: string;
  employerPhone: string;
  latestStatus: string;
};

export const columns: ColumnDef<employerListCols>[] = [
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
    accessorKey: "latestStatus",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Latest Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => <div className="pl-2">{String(getValue())}</div>,
    sortingFn: "alphanumeric",
  },
  {
    id: "actions",
    header: "",
    cell: function ActionCell({
      row,
    }: {
      row: { original: employerListCols };
    }) {
      const navigate = useNavigate();
      return (
        <div className="flex gap-2 pl-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              navigate("/employer", { replace: true });
            }}
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
