import CustomTooltip from "@/Custom_Components/icon";
import { ArrowLeft, Settings } from "lucide-react";
const SettingsBar = () => {
  return (
    <div className="bg-white min-h-full flex justify-center items-center flex-col ">
      <div className="w-full flex items-center justify-start  gap-2 font-bold xl:text-xl p-2">
        <CustomTooltip title="Go Back">
          <ArrowLeft className="size-7" />
        </CustomTooltip>
        <div>Settings</div>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <div>
          <Settings />
        </div>
        <div>Account Settings</div>
      </div>
    </div>
  );
};

export default SettingsBar;
