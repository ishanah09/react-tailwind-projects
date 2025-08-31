import Product from "../component/Product";
import { useSelector } from "react-redux";
export default function Wishlist() {
  const wishlistProducts=useSelector(state=>state.wishlist);
  return (
    <section className="px-4 py-8 max-w-7xl mx-auto  sm:px-8  ">
      <p className="text-4xl font-semibold text-blue-600 mb-4 sm:mb-8 border-b-2 w-fit">Wishlist items</p>
{ wishlistProducts.length===0 && <div className="w-full text-2xl font-semibold text-gray-500 text-center ">Wishist Is Empty</div>}


      <div className=" flex flex-wrap lg:grid lg:grid-cols-4 gap-8  ">
         { (wishlistProducts?.map((product) => <Product product={product} ></Product>) )} 
      </div>


    </section>

  )
}