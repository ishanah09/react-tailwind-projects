import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router";
export default function Header() {
  const cartProducts = useSelector(state => state.cart)
  return (
    <header className=" p-2 shadow-3xl sticky top-0 z-100 bg-transparent backdrop-blur-xl border-b ">
      <nav className="max-w-7xl mx-auto flex items-center justify-between ">
        <div className="text-2xl font-semibold w-full">
          <Link to={"/"} className="text-4xl font-semibold tracking-wider cursor-pointer text-gray-900">Cartify</Link>
        </div>



        <div className="flex items-center justify-center gap-6 ">
          <Link to="/wishlist" className="cursor-pointer">

            <div className="text-2xl text-gray-900 font-semibold tracking-wider ">Wishlist</div>
          </Link>
          <div className="flex items-center justify-center flex-col cursor-pointer text-gray-900">
            <div className="font-semibold -mb-1" >{cartProducts?.reduce((total, item) => (total = total + item.quantity), 0)}</div>
            <Link to={"/cart"}><FaShoppingCart className="size-7 " /></Link>
          </div>
        </div>


      </nav>
    </header>
  )
}
