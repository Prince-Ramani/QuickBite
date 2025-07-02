import { useState } from "react";
import pickingOrder from "../assets/picking-order.png";
const Signup = () => {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    phonenumber: "",
  });

  return (
    <div className="flex justify-center items-center min-h-screen w-full  ">
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
                  value={info.phonenumber}
                  onChange={(e) =>
                    setInfo((p) => ({ ...p, phonenumber: e.target.value }))
                  }
                  className="border border-gray-700 rounded-sm w-full 2xl:text-xl    2xl:h-10   max-w-lg lg:h-8 p-2 group group-focus-within:border-blue-600 focus:outline-none focus-within:text-blue-600"
                />
              </label>
            </div>

            <div className="flex items-center justify-center max-w-lg  mt-4 ">
              <button className="w-full bg-blue-500 rounded-full 2xl:text-lg p-2 text-white md:hover:bg-blue-300  active:bg-green-400 ">
                Sign up
              </button>
            </div>

            <div className="flex gap-0.5 hover:text-gray-600 cursor-pointer 2xl:text-lg ">
              Already have an account?{" "}
              <p className="text-blue-500 underline">Sign in</p>
            </div>

            <div className="flex items-center justify-center max-w-lg   ">
              <button className="w-full bg-blue-500 rounded-full 2xl:text-lg p-2 text-white md:hover:bg-blue-300 active:bg-green-400 ">
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
