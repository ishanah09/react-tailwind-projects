import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";


import {
  addToCart,
  removeFromCart,
  incrementInCart,
  decrementInCart,
} from "../features/cartSlice";
import { Link } from "react-router";
export default function CartProduct({ product }) {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector((state) => state.wishlist);
  const cartProducts = useSelector((state) => state.cart);
  return (
    <div className="w-full p-4 bg-white   rounded-md flex sm:items-center items-start justify-between flex-col sm:flex-row gap-8 sm:gap-4 shadow-xl ">
      <div className="flex items-center justify-between gap-4 ">
        <div className="min-w-[30px] max-w-[50px] flex items-center justify-center ">
          <Link to={`/productDescription/${product.id}`}  >
            {" "}
            <img src={product.image} alt="product-image" />
          </Link>
        </div>
        <p className="font-medium text-base sm:text-lg ">{product.title}</p>
      </div>

      <div className="flex items-end justify-between   gap-6 w-full sm:w-fit  ">
        <p className="font-medium text-xl">
          $
          {Math.round(
            cartProducts.reduce(
              (total, item) => (total = total + item.quantity),
              0
            ) * product.price
          )}
        </p>

        <div className="flex items-center justify-center gap-2 ">
          <button className="cursor-pointer border-b text-gray-600 " onClick={()=>dispatch(removeFromCart(product.id))}>Delele</button>
          <div className="w-[125px]  flex flex-col gap-2 ">
            <div className="px-4 py-2 bg-gray-400 rounded-md  text-white font-medium w-full flex items-center justify-between">
              {cartProducts.filter((item) => item.id === product.id)[0]
                .quantity > 1 ? (
                <FaMinus
                  onClick={() => dispatch(decrementInCart(product.id))}
                  className="cursor-pointer "
                />
              ) : (
                <MdDelete
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="cursor-pointer text-red-500 size-5"
                />
              )}

              {
                cartProducts.filter((item) => item.id === product.id)[0]
                  .quantity
              }

              <FaPlus
                onClick={() => dispatch(incrementInCart(product.id))}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
