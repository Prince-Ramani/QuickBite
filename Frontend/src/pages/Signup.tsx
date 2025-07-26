import { useState } from "react";
import pickingOrder from "../assets/picking-order.png";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { validatePasswordStrength } from "@/services/password";
import { validateEmail } from "@/services/email";
import Loading from "@/Custom_Components/Loading";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const { mutate: signUpFn, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(info),
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
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleClick = () => {
    if (
      !info.username ||
      info.username.trim().length <= 3 ||
      info.username.trim().length > 13
    ) {
      toast.error("Username must be between 3 to 12 charcters.");
      return;
    }

    if (!info.email || info.email.trim() === "") {
      toast.error("Email :required.");
      return;
    }

    if (!info.password || info.password.trim() === "") {
      toast.error("Password required.");
      return;
    }

    const phoneRegex = /^\d{10}$/;

    if (!info.phoneNumber || !phoneRegex.test(info.phoneNumber)) {
      toast.error("A phone number must containe only 10 digits.");
      return;
    }

    const isValidEmail = validateEmail(info.email);

    if (!isValidEmail) {
      toast.error("Invalid Email format.");
      return;
    }

    const passStrenght = validatePasswordStrength(info.password);

    if (!passStrenght.valid) {
      toast.error(passStrenght.message);
      return;
    }

    signUpFn();
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full  ">
      {isLoading ? (
        <div className="absolute   z-10 flex justify-center items-center bg-gray-700/20 select-none  w-full h-full">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <div className="h-full flex justify-center items-center">
        <div className="lg:w-1/2 select-none hidden md:block w-1/2">
          <img
            src={pickingOrder}
            alt="person picking order from local store illustartion"
            className="bg-transparent w-fit"
          />
        </div>

        <div className=" h-full md:w-1/2  lg:w-1/2  p-3 flex flex-col justify-start items-start   md:gap-2">
          <div className="text-gray-600 text-3xl  lg:text-4xl 2xl:text-5xl  font-bold flex  flex-col md:gap-1 ">
            <div>Ready to order</div>
            <div>Smarter with QuickBite?</div>
          </div>
          <div className="text-gray-600 text-sm sm:text-base md:text-lg  max-w-prose py-1">
            Sign up now and start placing pickup orders from your favorite local
            stores — quick, easy, and hassle-free.
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex flex-col group">
              <label htmlFor="username" className="flex gap-1 flex-col">
                <div className=" lg:text-lg 2xl:text-xl text-gray-700  select-none  group group-focus-within:text-blue-600 cursor-pointer ">
                  Username{" "}
                </div>
                <input
                  type="text"
                  id="username"
                  value={info.username}
                  onChange={(e) =>
                    setInfo((p) => ({ ...p, username: e.target.value }))
                  }
                  className="border border-gray-700 rounded-sm w-full  2xl:text-xl text-lg max-w-lg lg:h-8 2xl:h-10 p-2 group group-focus-within:border-blue-600 focus:outline-none focus-within:text-blue-600"
                />
              </label>
            </div>
            <div className="w-full flex  flex-col group">
              <label htmlFor="email" className="flex gap-1 flex-col">
                <div className="lg:text-lg 2xl:text-xl  text-gray-700     select-none  group group-focus-within:text-blue-600 cursor-pointer ">
                  Email{" "}
                </div>
                <input
                  type="email"
                  id="email"
                  value={info.email}
                  onChange={(e) =>
                    setInfo((p) => ({ ...p, email: e.target.value }))
                  }
                  className="border border-gray-700 rounded-sm w-full 2xl:text-xl   max-w-lg lg:h-8 p-2  2xl:h-10  group group-focus-within:border-blue-600 focus:outline-none focus-within:text-blue-600"
                />
              </label>
            </div>

            <div className="w-full flex  flex-col group">
              <label htmlFor="password" className="flex gap-1 flex-col">
                <div className="lg:text-lg 2xl:text-xl  text-gray-700    select-none  group group-focus-within:text-blue-600 cursor-pointer ">
                  Password{" "}
                </div>
                <input
                  type="password"
                  id="password"
                  value={info.password}
                  onChange={(e) =>
                    setInfo((p) => ({ ...p, password: e.target.value }))
                  }
                  className="border border-gray-700 rounded-sm w-full  2xl:text-xl  2xl:h-10    max-w-lg lg:h-8 p-2 group group-focus-within:border-blue-600 focus:outline-none focus-within:text-blue-600"
                />
              </label>
            </div>

            <div className="w-full flex  flex-col group">
              <label htmlFor="phonenumber" className="flex gap-1 flex-col">
                <div className="lg:text-lg  2xl:text-xl  text-gray-700    select-none  group group-focus-within:text-blue-600 cursor-pointer ">
                  Phonenumber{" "}
                </div>
                <input
                  type="text"
                  id="phonenumber"
                  value={info.phoneNumber}
                  onChange={(e) =>
                    setInfo((p) => ({ ...p, phoneNumber: e.target.value }))
                  }
                  className="border border-gray-700 rounded-sm w-full 2xl:text-xl    2xl:h-10   max-w-lg lg:h-8 p-2 group group-focus-within:border-blue-600 focus:outline-none focus-within:text-blue-600"
                />
              </label>
            </div>

            <div className="flex items-center justify-center max-w-lg  mt-4 ">
              <button
                className="w-full bg-blue-500 rounded-full 2xl:text-lg p-2 text-white md:hover:bg-blue-300  active:bg-green-400 disabled:bg-gray-700 "
                onClick={() => handleClick()}
                disabled={isLoading}
              >
                Sign up
              </button>
            </div>

            <div className="flex gap-0.5 hover:text-gray-600 cursor-pointer 2xl:text-lg ">
              Already have an account?{" "}
              <p
                className="text-blue-500 underline"
                onClick={() => navigate("/sign-in")}
              >
                Sign in
              </p>
            </div>

            <div className="flex items-center justify-center max-w-lg   ">
              <button
                className="w-full bg-blue-500 rounded-full 2xl:text-lg p-2 text-white md:hover:bg-blue-300 active:bg-green-400 disabled:bg-gray-700"
                disabled={isLoading}
                onClick={() => navigate("/sign-in")}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
