import { Outlet, useLocation } from "react-router-dom";
import SettingsBar from "./SettingsBar";
import { useEffect, useState } from "react";

const SettingsLayout = () => {
  const location = useLocation();
  const [isParentPage, setIsParentPage] = useState<boolean>(false);
  useEffect(() => {
    setIsParentPage(location.pathname === "/settings/");
  }, [location.pathname]);

  return (
    <div className="h-full w-full bg-slate-300 flex justify-center items-center 2xl:px-72 ">
      <div
        className={`min-h-full w-full bg-white ${isParentPage ? "block" : "hidden"}  lg:block lg:border-r lg:w-1/4 `}
      >
        <SettingsBar />
      </div>
      <div className="min-h-full bg-white w-full lg:w-3/4">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
