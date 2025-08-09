import { useAuthUser } from "@/Context/use-auth-user";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [info, setInfo] = useState(() => authUser ?? { username: "" });
  const [selectedFile, setSelectedFile] = useState<File | null | "remove">(
    null,
  );
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/settings/updateProfile", {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      if ("error" in data) {
        toast.error(data.error);
        return;
      }
      toast.success(data.message);
      setSelectedFile(null);
      setPreview(null);

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  useEffect(() => {
    return () => {
      if (preview !== null) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (authUser === null) {
    navigate("/singin");
    return null;
  }
  const isChanged =
    info.username !== authUser.username ||
    preview !== null ||
    selectedFile === "remove";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    if (preview !== null) {
      setSelectedFile(null);
      setPreview(null);
      return;
    } else {
      setSelectedFile("remove");
    }
  };

  const handleUpdate = () => {
    const username = info.username.trim();
    if (username.trim() === "" && username === authUser.username) {
      toast.error("Please enter new username to update.");
      return;
    }
    if (username.trim().length <= 3 || username.trim().length > 13) {
      toast.error("Username must be between 3 to 12 charcters.");
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    if (selectedFile && selectedFile !== "remove") {
      formData.append("profilePicture", selectedFile);
    } else if (selectedFile === "remove") {
      formData.append("removeProfilePicture", "true");
    }
    if (!isLoading) updateProfile(formData);
  };

  return (
    <div className="min-h-screen flex  flex-col ">
      <div className="w-full flex items-center justify-start  gap-2 font-semibold xl:text-xl p-2 h-12  border-b-2 bg-slate-100">
        <div>Profile</div>
      </div>
      {/* Profile Picture */}
      <div className=" p-2 lg:p-10 lg:pb-0 w-full">
        <div className="text-lg text-gray-600">Profile picture</div>
        <div className="flex justify-start gap-10 sm:gap-14 md:gap-20 items-center pt-4">
          <img
            className="bg-blue-300 rounded-full size-32 object-cover "
            alt="profile-picture"
            src={
              selectedFile === "remove"
                ? ""
                : preview || authUser.profilePicture
            }
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col lg:flex-row gap-4">
            <button
              className="bg-blue-300 rounded-sm p-2 px-3 font-semibold text-white text-sm sm:text-base focus:outline-red-600"
              disabled={isLoading}
              onClick={() => fileInputRef.current?.click()}
            >
              Change picture
            </button>
            <button
              className="bg-gray-300 rounded-sm p-2 px-3 font-semibold text-black/60 text-sm sm:text-base focus:outline-red-600"
              disabled={isLoading}
              onClick={handleDelete}
            >
              {preview === null ? "Delete picture" : "Delete Preview"}
            </button>
          </div>
        </div>
        <section className="pt-8 flex flex-col gap-4 lg:gap-7">
          {/* Username */}
          <div className="flex flex-col gap-1.5 group">
            <label htmlFor="username">
              <div className="text-gray-700 font-medium group group-focus-within:text-blue-500">
                Username
              </div>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={info.username}
              onChange={(e) =>
                setInfo((prev) => ({ ...prev, username: e.target.value }))
              }
              className="p-2 border-2 border-gray-200 lg:text-lg rounded-sm focus:outline-blue-300 w-full group md:hover:border-gray-300"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1.5 group">
            <label htmlFor="email">
              <div className="text-gray-700 font-medium group group-focus-within:text-blue-500">
                Email
              </div>
            </label>
            <input
              id="email"
              name="email"
              type="text"
              readOnly
              value={authUser.email}
              className="p-2 border-2 border-gray-200 lg:text-lg rounded-sm focus:outline-blue-300 w-full group md:hover:border-gray-300"
            />
          </div>
        </section>
        <div className="flex justify-end mt-4">
          <button
            className={`${
              isChanged ? "bg-blue-400" : "bg-gray-300"
            } disabled:bg-gray-300 rounded-sm p-2 px-3 font-semibold text-white text-sm sm:text-base focus:outline-red-600`}
            onClick={handleUpdate}
            disabled={!isChanged || isLoading}
          >
            {isLoading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
