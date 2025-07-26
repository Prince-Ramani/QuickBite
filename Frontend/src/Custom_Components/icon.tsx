import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

interface CustomTooltipInterface {
  children: React.ReactNode;
  title: string;
}

const CustomTooltip = ({ title, children }: CustomTooltipInterface) => {
  return (
    <div>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default CustomTooltip;
