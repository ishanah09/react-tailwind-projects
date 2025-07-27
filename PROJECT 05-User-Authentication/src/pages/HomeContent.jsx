import { Link } from "react-router-dom";
import image from "../assets/image.png";

export default function HomeContent() {
  return (
    <div className="flex flex-col gap-6 pb-10 px-4">
      <figure className="  max-w-[300px] mx-auto">
        <img src={image} alt="image" className="w-full rounded-2xl mt-2" />
      </figure>
      <p className="text-lg font-semibold text-center ">
        Quick. Simple. Secure access.
      </p>
      <div className="flex flex-col items-center justify-center gap-3 px-6">
        <Link
          to={"/signup"}
          className="bg-[#9450E7] text-white w-full flex items-center justify-center py-3 rounded-md cursor-pointer border font-medium hover:opacity-90      "
        >
          Sign Up
        </Link>
        <Link
          to={"/signin"}
          className="bg-white text-black w-full flex items-center justify-center py-3 rounded-md cursor-pointer border font-medium hover:bg-gray-100     "
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
