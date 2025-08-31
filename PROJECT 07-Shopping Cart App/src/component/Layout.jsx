import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import ProductDescription from "../pages/productDescription";
export default function Layout() {
  return (
    <main className="grow ">
      <Routes>
        <Route path="/">
          <Route index element={<Home></Home>}></Route>
          <Route path="/wishlist" element={<Wishlist></Wishlist>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route
            path="/productDescription/:id"
            element={<ProductDescription></ProductDescription>}
          ></Route>
        </Route>
      </Routes>
    </main>
  );
}
