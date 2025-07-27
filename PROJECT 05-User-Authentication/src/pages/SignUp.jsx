import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
export default function SignUp() {
   const [showPassword,setShowPassword]=useState(false);
  const { state, dispatch, signUpformSubmit } = useContext(AuthContext);
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
    <div className="flex flex-col gap-4 ">
      <Link to={"/"}>
        <IoArrowBackSharp className="ml-6 size-6  cursor-pointer mt-2" />
      </Link>

      <div className="bg-gray-200 flex flex-col  rounded-b-none sm:rounded-b-3xl rounded-t-[40px] px-8 py-6  ">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
        <form
          className="flex flex-col  w-full"
          onSubmit={(e) => signUpformSubmit(e)}
        >
          <div className="flex flex-col  h-[80px] mb-1.5 ">
            <label htmlFor="name" className="text-sm text-gray-500 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              id="name"
              name="name"
              value={state.input.name || ""}
              onChange={(e) => {
                dispatch({ type: "setError", payload: {} });
                dispatch({ type: "setInput", payload: e.target });
              }}
              className="bg-white text-black rounded-md pl-3 p-2 outline-none focus:ring-1 focus:ring-purple-400 text-sm  "
            />
            <span className="text-red-500 font-semibold pl-1 text-sm">
              {state.error.name}
            </span>
          </div>
          <div className="flex flex-col  h-[80px] mb-1.5 ">
            <label htmlFor="number" className="text-sm mb-1 text-gray-500">
              Phone Number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              placeholder="Enter your phone number"
              value={state.input.number || ""}
              onChange={(e) => {
                dispatch({ type: "setError", payload: {} });
                dispatch({ type: "setInput", payload: e.target });
              }}
              className="bg-white text-black rounded-md pl-3 p-2 outline-none focus:ring-1 focus:ring-purple-400 text-sm  "
            />
            <span className="text-red-500 font-semibold pl-1 text-sm">
              {state.error.number}
            </span>
          </div>
          <div className="flex flex-col  h-[80px] mb-1.5 ">
            <label htmlFor="email" className="text-sm mb-1 text-gray-500">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={state.input.email || ""}
              onChange={(e) => {
                dispatch({ type: "setError", payload: {} });
                dispatch({ type: "setInput", payload: e.target });
              }}
              className="bg-white text-black rounded-md pl-3 p-2 outline-none focus:ring-1 focus:ring-purple-400 text-sm  "
            />
            <span className="text-red-500 font-semibold pl-1 text-sm">
              {state.error.email}
            </span>
          </div>
          <div className="flex flex-col  h-[80px] mb-5 ">
            <label htmlFor="password" className="text-sm mb-1 text-gray-500">
              Password
            </label>

            <div className=" relative ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={state.input.password || ""}
                onChange={(e) => {
                  dispatch({ type: "setError", payload: {} });
                  dispatch({ type: "setInput", payload: e.target });
                }}
                className="bg-white text-black rounded-sm pl-3 pr-10 p-2 outline-none focus:ring-2 focus:ring-purple-400 text-[15px] w-full  "
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
            </div>

            <span className="text-red-500 font-semibold pl-1 text-sm">
              {state.error.password}
            </span>
          </div>

          <button
            type="submit"
            className="bg-[#9450E7] text-white w-full flex items-center justify-center py-3 rounded-md cursor-pointer border font-medium hover:opacity-90"
          >
            Sign Up
          </button>
        </form>

        <div>
          <p className="text-center font-medium text-sm mt-4">
            I'm already a member.{" "}
            <Link to={"/signin"} className="text-[#9450E7] font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
