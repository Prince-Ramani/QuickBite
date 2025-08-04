import { useAuthUser } from "@/Context/use-auth-user";

const Profile = () => {
  const { authUser } = useAuthUser();
  if (authUser === null) return;

  return (
    <div className="min-h-screen flex  flex-col ">
      <div className="w-full flex items-center justify-start  gap-2 font-semibold xl:text-xl p-2 h-12  border-b-2 bg-slate-100">
        <div>Profile</div>
      </div>
    </div>
  );
};

export default Profile;
