import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header></Header>

      <main className="">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
}
