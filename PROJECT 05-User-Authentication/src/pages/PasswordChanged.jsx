import { Link } from "react-router-dom";

export default function PasswordChanged() {
  return (
    <div className="w-full min-h-full flex flex-col  items-center justify-center grow gap-8 p-8">
      <p className="text-center text-lg font-semibold">
        Password changed Sucessfully
      </p>
      <Link
          to={"/signin"}
          className="bg-[#9450E7] text-white w-full flex items-center justify-center py-3 rounded-md cursor-pointer border font-medium hover:opacity-90      "
        >
          Sign In
        </Link>
    </div>
  );
}
