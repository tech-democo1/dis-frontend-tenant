import type { Payment } from "./printTableColumns";
import { Progress } from "~/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

function PrintStatusProgressBar({
  status,
}: {
  status: Payment["printStatus"];
}) {
  // Map each status to a progress percentage and color
  const statusMap: Record<
    Payment["printStatus"],
    { value: number; color: string; tooltip: string }
  > = {
    "missing mandatory data": {
      value: 33,
      color: "bg-red-500",
      tooltip: "Missing mandatory data",
    },
    "proofs document missing": {
      value: 66,
      color: "bg-yellow-500",
      tooltip: "Proofs document missing",
    },
    "all collected": {
      value: 100,
      color: "bg-green-500",
      tooltip: "All documents collected",
    },
  };
  const { value, color, tooltip } = statusMap[status] ?? {
    value: 0,
    color: "bg-gray-300",
    tooltip: "Unknown status",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 w-32 cursor-pointer">
            <Progress value={value} className="w-full" barClassName={color} />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span className="text-xs">{tooltip}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { PrintStatusProgressBar };
