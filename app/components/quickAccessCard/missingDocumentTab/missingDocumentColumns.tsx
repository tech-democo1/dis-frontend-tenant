import { useState } from "react";
import { ArrowUpDown, Search, MessageCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";

export type missingDocCols = {
  workerType: string;
  employerName: string;
  employerPhone: string;
  helperName: string;
  depositPaidDate: string;
  missingDocCount: number;
  missingDocList?: string[]; // Add this field for tooltip/template
};

export const columns: ColumnDef<missingDocCols>[] = [
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
    accessorKey: "missingDocCount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Number of Missing Doc/info
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: function MissingDocCell({ row, getValue }) {
      const count = getValue() as number;
      const missingList = row.original.missingDocList || [];
      const employerPhone = row.original.employerPhone;
      const phone = employerPhone.replace(/[^0-9]/g, "");
      const message = `Dear ${
        row.original.employerName
      },\n\nThe following documents/info are missing:\n${missingList
        .map((item, idx) => `${idx + 1}. ${item}`)
        .join("\n")}\n\nPlease provide them as soon as possible. Thank you!`;
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
        message
      )}`;

      // Modal state
      const [open, setOpen] = useState(false);

      // Copy to clipboard handler
      const handleCopy = () => {
        navigator.clipboard.writeText(message);
      };

      return (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center gap-3 px-4 py-2 min-w-[90px] cursor-pointer">
                  <span className="underline decoration-dotted">{count}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(true);
                    }}
                    className={
                      count === 0 ? "pointer-events-none opacity-50" : ""
                    }
                    tabIndex={count === 0 ? -1 : 0}
                    aria-disabled={count === 0}
                  >
                    <MessageCircle className="text-green-500 w-5 h-5 hover:scale-110 transition" />
                  </button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <div className="whitespace-pre-line text-xs">
                  {missingList.length
                    ? missingList.join("\n")
                    : "No missing document"}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[600px]">
              <DialogHeader>
                <DialogTitle>Send Missing Document Message</DialogTitle>
              </DialogHeader>
              <textarea
                className="w-full border rounded p-2 text-sm"
                rows={6}
                value={message}
                readOnly
              />
              <DialogFooter className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                    }}
                    disabled={count === 0}
                  >
                    Send to WhatsApp
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCopy}>
                    Copy
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
    },
    sortingFn: "alphanumeric",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }: { row: { original: missingDocCols } }) => (
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
