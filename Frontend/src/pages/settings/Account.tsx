import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CustomTooltip from "@/Custom_Components/CustomTooltip";
const Account = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex  flex-col ">
      <div className="w-full flex items-center justify-start  gap-4 font-semibold xl:text-xl p-2 h-12  border-b-2 bg-slate-100">
        <div className="md:hidden size-5" onClick={() => navigate("/settings")}>
          <CustomTooltip title="Back" side="bottom">
            <ArrowLeft />
          </CustomTooltip>
        </div>
        <div className="text-xl">Account</div>
      </div>
    </div>
  );
};

export default Account;
