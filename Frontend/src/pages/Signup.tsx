import pickingOrder from "../assets/picking-order.png";
const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full  ">
      <div className="border-black border-4 h-full flex justify-center items-center">
        <div className="border lg:w-1/2 select-none">
          <img
            src={pickingOrder}
            alt="person picking order from local store illustartion"
            className="bg-transparent w-fit"
          />
        </div>

        <div className=" h-full lg:w-1/2  flex flex-col justify-start items-start   gap-2">
          <div className="text-gray-600 text-4xl font-bold flex  flex-col gap-1">
            <div>Ready to order</div>
            <div>Smarter with QuickBite?</div>
          </div>
          <div className="text-gray-600 lg:text-lg max-w-prose">
            Sign up now and start placing pickup orders from your favorite local
            stores — quick, easy, and hassle-free.
          </div>
          <div className="w-full">
            <div className="w-full flex gap-1 flex-col group">
              <label htmlFor="username">
                <div className="lg:text-lg text-foreground group group-focus-within:text-blue-600  ">
                  Username{" "}
                </div>
                <input
                  type="text"
                  id="username"
                  className="border-2 border-black rounded-sm w-full max-w-lg lg:h-8 p-2 group group-focus-within:border-blue-600 focus:outline-none focus-within:text-blue-600"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
