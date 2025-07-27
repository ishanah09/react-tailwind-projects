import { useContext, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function ForgotPassword() {
  const { state, dispatch,forgetPasswordFormSubmit,regenerateOtp,checkOtp } = useContext(AuthContext);

  useEffect(() => {
    return () => {
      dispatch({
        type: "setClearInput",
        payload: {},
      });
      dispatch({ type: "setError", payload: {} });
      dispatch({ type: "setOtp", payload: {} });
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 grow">
      <Link to={"/signin"}>
        <IoArrowBackSharp className="ml-6 size-6 cursor-pointer mt-4" />
      </Link>

      <div className="bg-gray-200 flex flex-col rounded-b-3xl rounded-t-[40px] px-8 pt-8 pb-10 grow">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        <form
          className="flex flex-col w-full"
          onSubmit={(e) => forgetPasswordFormSubmit(e)}
        >
          <div className="flex flex-col h-[80px] mb-4">
            <label htmlFor="email" className="text-gray-500 text-sm mb-1">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              disabled={state.otp.generated}
              value={state.input.email || ""}
              onChange={(e) =>
                dispatch({ type: "setInput", payload: e.target })
              }
              placeholder="Enter your registered email"
              className="bg-white text-black rounded-md pl-3 p-2 outline-none focus:ring-2 focus:ring-purple-400 text-[15px] mb-0.5 w-full"
            />
            <span className="text-red-500 font-semibold pl-2 text-[15px] ">
              {state.error.email}
            </span>

            {state.otp.generated && (
              <span
                className="text-purple-500 hover:text-purple-400 font-semibold pl-2 text-[15px] text-right cursor-pointer "
                onClick={() => regenerateOtp()}
              >
                Regenerate OTP
              </span>
            )}
          </div>

          {state.otp.generated && (
            <div className="flex flex-col h-[80px] mb-4">
              <label htmlFor="otp" className="text-gray-500 text-sm mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={state.otp.user || ""}
                onChange={(e) =>
                  dispatch({ type: "setUserOtp", payload: e.target.value })
                }
                placeholder="Enter OTP"
                className="bg-white text-black rounded-md pl-3 p-2 outline-none focus:ring-2 focus:ring-purple-400 text-[15px] mb-0.5 w-full"
              />
              <span className="text-red-500 font-semibold pl-2 text-[15px] ">
                {state.error.otp}
              </span>
            </div>
          )}

          {!state.otp.generated ? (
            <button
              type="submit"
              className="bg-[#9450E7] text-white w-full flex items-center justify-center py-3 rounded-md cursor-pointer font-medium hover:opacity-90 mt-4 mb-2"
            >
              Generate OTP
            </button>
          ) : (
            <button
              type="button"
              className="bg-[#9450E7] text-white w-full flex items-center justify-center py-3 rounded-md cursor-pointer font-medium hover:opacity-90 mt-4 mb-2"
              onClick={() => checkOtp()}
            >
              Enter
            </button>
          )}
        </form>

        <p className="text-center text-sm mt-4">
          Remember your password?{" "}
          <Link to="/signin" className="text-[#9450E7] font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
