import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addWishlistitem, removeWishlistitem } from "../features/wishlistSlice";
import {
  addToCart,
  removeFromCart,
  incrementInCart,
  decrementInCart,
} from "../features/cartSlice";
import { Link } from "react-router";
export default function Product({ product }) {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector((state) => state.wishlist);
  const cartProducts = useSelector((state) => state.cart);
  return (
    <div className=" flex flex-col items-center justify-between gap-2  bg-white rounded-lg p-4 hover:shadow-2xl  hover:scale-105 transition-all duration-400 max-w-[300px] min-w-[200px] flex-1">
      <div className="max-w-[150px] flex items-center justify-center  grow">
       <Link to={`/productDescription/${product.id}`}>   <img src={product.image} alt="" className="" />   </Link>
      </div>

      <div className="flex flex-col gap-2  w-full">
        <p className="font-medium text-lg">{product.title}</p>
        <p className="font-medium text-xl">${product.price}</p>

        <div className="flex items-center justify-center gap-6">
          <div className="w-[150px]  flex flex-col gap-2">
            {cartProducts.some((item) => item.id === product.id) ? (
              <div className="px-4 py-2 bg-gray-400 rounded-md  text-white font-medium w-full flex items-center justify-between">
              {cartProducts.filter((item)=>item.id===product.id)[0].quantity>1 ? 
              
            
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
    </div>
  );
}
