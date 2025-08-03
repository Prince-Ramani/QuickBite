import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface CustomTooltipInterface {
  children: React.ReactNode;
  title: string;
  side?: "top" | "bottom" | "right" | "left";
}

const CustomTooltip = ({
  title,
  children,
  side = "bottom",
}: CustomTooltipInterface) => {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent
            side={side}
            className="bg-black text-white text-xs font-normal rounded-sm px-2 p-1 opacity-90"
          >
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CustomTooltip;
