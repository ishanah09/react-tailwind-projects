import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <main className="w-screen min-h-screen flex items-center justify-center">
      <div className="w-full min-h-screen  bg-white rounded-none sm:rounded-3xl   sm:max-w-[350px] sm:min-h-[500px] flex flex-col  ">
        <Link to={"/"} className="text-3xl font-bold text-center  text-[#9450E7] tracking-wider px-4 mt-6 ">
          AccessNow
        </Link>
        <div className=" flex items-center justify-center">
          <div className="bg-[#9450E7] w-[190px] h-0.5 mt-1"></div>
        </div>
        <Outlet></Outlet>
      </div>
    </main>
  );
}
