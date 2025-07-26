import ShopAccount from "../ShopAccount";
import SettingsBar from "./SettingsBar";

const SettingsLayout = () => {
  return (
    <div className="h-full w-full bg-slate-300 flex justify-center items-center 2xl:px-72 ">
      <div className="min-h-full w-1/4 ">
        <SettingsBar />
      </div>
      <div className="bg-blue-200 min-h-full w-3/4">
        <ShopAccount />
      </div>
    </div>
  );
};

export default SettingsLayout;
