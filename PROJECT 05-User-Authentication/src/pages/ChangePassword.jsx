import { useContext, useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function ChangePassword() {
   const [showPassword,setShowPassword]=useState(false);
  const { state, dispatch, changePasswordFormSubmit } = useContext(AuthContext);
const navigate=useNavigate()

  const user = state.user;


  useEffect(() => {
    return () => {
      dispatch({
        type: "setClearInput",
        payload: {},
      });
      dispatch({ type: "setError", payload: {} });
    };
  }, []);


   useEffect(() => {
    if (!state.user || !state.user.email) {
      navigate("/signin", { replace: true });
    }
  }, [state.user]);

  if (!state.user || !state.user.email) return null;


  return (
    <div className="flex flex-col gap-6 grow">
      <Link to={"/signin"}>
        <IoArrowBackSharp className="ml-6 size-6 cursor-pointer mt-4" />
      </Link>

      <div className="bg-gray-200 flex flex-col rounded-b-3xl rounded-t-[40px] px-8 pt-8 pb-10 grow">
        <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>

        <form
          className="flex flex-col w-full"
          onSubmit={(e) => changePasswordFormSubmit(e, user.id)}
        >
          <div className="flex flex-col h-[80px] mb-4">
            <label htmlFor="email" className="text-gray-500 text-sm mb-1">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              disabled={true}
              value={state.user.email}
              placeholder="Enter your registered email"
              className="bg-white text-black rounded-md pl-3 p-2 outline-none focus:ring-2 focus:ring-purple-400 text-[15px] mb-0.5 w-full"
            />
          </div>

          <div className="flex flex-col gap-1 h-[80px] ">
            <label htmlFor="password" className=" text-gray-500 text-[15px] ">
              New Password
            </label>

            <div className=" relative ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your new password"
                className="bg-white text-black rounded-md pl-3 pr-10 p-2 outline-none focus:ring-2 focus:ring-purple-400 text-[15px] w-full  "
                value={state.input.password || ""}
                onChange={(e) =>
                  dispatch({ type: "setInput", payload: e.target })
                }
              />

              {showPassword ? (
                <FaEye
                  className=" size-5 cursor-pointer absolute top-0 right-0 transform translate-y-1/2 -translate-x-1/2 text-purple-400"
                  onClick={() =>
                  setShowPassword(false)
                  }
                />
              ) : (
                <FaEyeSlash
                  className=" size-5 cursor-pointer absolute top-0 right-0 transform translate-y-1/2 -translate-x-1/2 text-purple-400"
                  onClick={() =>
                     setShowPassword(true)
                  }
                />
              )}
              <span className="text-red-500 font-semibold pl-2 text-[15px] ">
                {state.error.password}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#9450E7] text-white w-full flex items-center justify-center py-3 rounded-md cursor-pointer font-medium hover:opacity-90 mt-4 mb-2"
          >
            Change Password
          </button>
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
