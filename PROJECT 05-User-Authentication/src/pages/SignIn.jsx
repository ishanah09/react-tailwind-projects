import { IoArrowBackSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { state, dispatch, logInFormSubmit } = useContext(AuthContext);
  useEffect(() => {
    return () => {
      dispatch({
        type: "setClearInput",
        payload: {},
      });
      dispatch({ type: "setError", payload: {} });
    };
  }, []);
  return (
    <div className="flex flex-col gap-6 grow">
      <Link to={"/"}>
        {" "}
        <IoArrowBackSharp className="ml-6 size-6  cursor-pointer mt-4" />
      </Link>

      <div className="bg-gray-200 flex flex-col  sm:rounded-b-3xl rounded-t-[40px] px-8 pt-8 pb-10  grow">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <form
          className="flex flex-col justify-evenly w-full "
          onSubmit={(e) => {
            logInFormSubmit(e);
          }}
        >
          <div className="flex flex-col   h-[80px] mb-4 ">
            <label htmlFor="email" className=" text-gray-500 text-sm mb-1">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={state.input.email || ""}
              placeholder="Enter your email"
              className="bg-white text-black rounded-md pl-3 p-2 outline-none focus:ring-2 focus:ring-purple-400 text-[15px] mb-0.5 w-full "
              onChange={(e) => {
                dispatch({ type: "setError", payload: "" });
                dispatch({ type: "setInput", payload: e.target });
              }}
            />

            <span className="text-red-500 font-semibold pl-2 text-[15px] ">
              {state.error.error}
            </span>
          </div>

          <div className="flex flex-col gap-1 h-[80px] ">
            <label htmlFor="password" className=" text-gray-500 text-[15px] ">
              Password
            </label>

            <div className=" relative ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={state.input.password || ""}
                className="bg-white text-black rounded-md pl-3 pr-10 p-2 outline-none focus:ring-2 focus:ring-purple-400 text-[15px] w-full  "
                onChange={(e) => {
                  dispatch({ type: "setError", payload: "" });
                  dispatch({ type: "setInput", payload: e.target });
                }}
              />

              {showPassword ? (
                <FaEye
                  className=" size-5 cursor-pointer absolute top-0 right-0 transform translate-y-1/2 -translate-x-1/2 text-purple-400"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  className=" size-5 cursor-pointer absolute top-0 right-0 transform translate-y-1/2 -translate-x-1/2 text-purple-400"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            <Link
              to={"forgotpassword"}
              className="text-right text-sm font-medium cursor-pointer hover:text-purple-400"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-[#9450E7] text-white w-full flex items-center justify-center py-3 rounded-md cursor-pointer font-medium hover:opacity-90  mt-8 mb-4   "
          >
            Sign In
          </button>
        </form>

        <div>
          <p className="text-center font-medium text-sm mt-2">
            I'm a new user.{" "}
            <Link to={"/signup"} className="text-[#9450E7] font-semibold">
              {" "}
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
