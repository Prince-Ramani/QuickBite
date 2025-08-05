import { useLocation, useNavigate } from "react-router-dom";
import CustomTooltip from "../../Custom_Components/CustomTooltip";
import { ArrowLeft, Settings, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
const SettingsBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const iconMap: { [key: string]: any } = {
    Settings: Settings,
    UserRound: UserRound,
  };

  useEffect(() => {
    setCurrentPage(location.pathname.split("/")[2]);
  }, [location.pathname]);

  const allSettings = [
    {
      name: "Profile",
      iconName: "UserRound",
      navigateTo: "profile",
    },
    {
      name: "Account",
      iconName: "Settings",
      navigateTo: "account",
    },
  ];

  return (
    <div className="min-h-screen flex  flex-col ">
      <div className="w-full flex items-center justify-start  gap-2  h-12 font-bold xl:text-xl p-2 pb-0 border-b-2 bg-slate-100">
        <CustomTooltip title="Go Back">
          <ArrowLeft className="size-6" />
        </CustomTooltip>
        <div>Settings</div>
      </div>
      <div className="h-full ">
        {allSettings.map((setting, index) => {
          const Iconcmp = iconMap[setting.iconName];
          return (
            <button
              key={index}
              className={`flex justify-start items-center gap-4 text-gray-700 p-2 border-b border-gray-200 hover:bg-gray-100 transition-colors focus:bg-gray-100 focus:outline-none w-full ${currentPage === setting.navigateTo ? "border-r-2 rounded-r-[2px] border-r-blue-500" : ""}`}
              onClick={() => navigate(setting.navigateTo)}
            >
              <div>
                <Iconcmp className="size-6 text-gray-600" />
              </div>
              <div className="pt-0.5">{setting.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsBar;
