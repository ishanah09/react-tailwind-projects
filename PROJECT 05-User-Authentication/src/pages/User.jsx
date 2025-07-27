import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function User() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();



  function handleLogout(e) {
    dispatch({ type: "logout" });
    navigate("/signin", { replace: true });
  }

  const name = (state.user?.name || "")
    .split(" ")[0]
    .split("")
    .map((item, index) => (index === 0 ? item.toUpperCase() : item))
    .join("");


  useEffect(() => {
    if (!state.user || !state.user.email) {
      navigate("/signin", { replace: true });
    }
  }, [state.user]);

  if (!state.user || !state.user.email) return null;

  
  return (
    <div className="w-full min-h-full flex flex-col justify-start grow gap-16 p-8">
      <h1 className="text-xl font-semibold align-top">
        Hello, <span className="text-red-500">{name}</span>
      </h1>
      <p className="text-center text-xl font-medium">Log In Successfully</p>

      <button
        onClick={() => handleLogout()}
        className="bg-red-400 text-white w-full flex items-center justify-center py-3 rounded-md cursor-pointer border font-medium hover:opacity-90 self-center"
      >
        Logout
      </button>
    </div>
  );
}
