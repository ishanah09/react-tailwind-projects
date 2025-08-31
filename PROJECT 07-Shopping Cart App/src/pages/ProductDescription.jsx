import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { addWishlistitem, removeWishlistitem } from "../features/wishlistSlice";
import {
  addToCart,
  removeFromCart,
  incrementInCart,
  decrementInCart,
} from "../features/cartSlice";
import { fetchData } from "../features/productSlice";
import { useEffect } from "react";

export default function ProductDescription() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const wishlistProducts = useSelector((state) => state.wishlist);
  const cartProducts = useSelector((state) => state.cart);


  useEffect(() => {
    dispatch(fetchData());
  }, []);


  return (
    <section className="px-4 py-8 max-w-7xl mx-auto  sm:px-8   ">
      <div>
        <Link to={"../"}>  <FaArrowLeft className="size-7 cursor-pointer mb-8" /></Link>
      </div>


      {product ? <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col sm:flex-row gap-4">

        <div className="w-full h-48 sm:h-[350px] sm:min-w-[225px] flex items-center justify-center bg-gray-50 rounded-xl">
          <img src={product.image} alt={product.title} className="h-40 sm:h-[200px] object-contain" />
        </div>


        <div className="flex flex-col gap-2 sm:gap-4 sm:pt-4">
          <p className="font-semibold text-gray-800 line-clamp-1 text-lg">{product.title}</p>
          <p className="text-md text-gray-500 line-clamp-2">{product.description}</p>


          <p className="text-lg font-bold text-green-600">${product.price}</p>


          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              i < Math.round(product.rating.rate) ? <FaStar className="w-5 h-5" /> : <CiStar className="w-5 h-5" />
            ))}
            <span className="text-sm text-gray-600 ml-2">({product.rating.count})</span>
          </div>



          <div className="flex items-center  gap-6 mt-4 ">
            <div className="w-[150px]  flex flex-col gap-2">
              {cartProducts.some((item) => item.id === product.id) ? (
                <div className="px-4 py-2 bg-gray-400 rounded-md  text-white font-medium w-full flex items-center justify-between">
                  {cartProducts.filter((item) => item.id === product.id)[0].quantity > 1 ?


                    <FaMinus
                      onClick={() => dispatch(decrementInCart(product.id))}
                      className="cursor-pointer "
                    /> :
                    <MdDelete
                      onClick={() => dispatch(removeFromCart(product.id))}
                      className="cursor-pointer text-red-500 size-5"
                    />
                  }

                  {
                    cartProducts.filter((item) => item.id === product.id)[0]
                      .quantity
                  }

                  <FaPlus
                    onClick={() => dispatch(incrementInCart(product.id))}
                    className="cursor-pointer"
                  />
                </div>
              ) : (
                <button
                  className="px-4 py-2 bg-gray-400 rounded-md cursor-pointer text-white font-medium w-full"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </button>
              )}
            </div>

            <button>
              {wishlistProducts.some((item) => item.id === product.id) ? (
                <FaHeart
                  className="size-9 text-red-500 cursor-pointer"
                  onClick={() => dispatch(removeWishlistitem(product.id))}
                />
              ) : (
                <CiHeart
                  className="size-9 text-black cursor-pointer"
                  onClick={() => dispatch(addWishlistitem(product))}
                />
              )}
            </button>



          </div>



        </div>


      </div> : <div className=" text-3xl text-red-500 font-semibold text-center">Loading... Please Wait</div>}



    </section>
  )
}
