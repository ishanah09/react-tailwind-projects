import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import cartImage from "../assets/images/icon-add-to-cart.svg";
import { useContext } from "react";
import { ListContext } from "../context/ListProvider";

export default function Product({ product, index }) {
  const { state, dispatch } = useContext(ListContext);
  const foodItem = state.cart.find((item) => item.id === index) || {
    quantity: 0,
  };

  return (
    <div className="flex flex-col gap-8">
      <div
        className={`relative rounded-lg ${
          foodItem.quantity !== 0 && "border-3 border-[#c73a0f]"
        }`}
      >
        <figure className="">
          <img
            src={product.image.desktop}
           alt={`Image of ${product.name}`}
            className="w-full rounded-lg"
          />
        </figure>

        {foodItem.quantity === 0 ? (
          <button
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-3  rounded-full border-2 border-[#c73a0f] w-[160px] sm:w-[130px] hover:text-[#c73a0f]    cursor-pointer        "
            onClick={() => {
              dispatch({
                type: "setCart",
                payload: {
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  id: index,
                },
              });
            }}
            disabled={state.orderPlaced}
          >
            <div
              className="flex items-center justify-center
             gap-2 text-md text-nowrap font-semibold cursor-pointer mx-auto  "
            >
              {" "}
              <img src={cartImage} alt="Add to cart icon"  />{" "}
              <span className="text-sm ">Add to Cart</span>
            </div>
          </button>
        ) : (
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2  py-3  rounded-full border-2 border-[#c73a0f]  bg-[#c73a0f] flex  justify-evenly items-center w-[160px] sm:w-[130px] ">
            <button
              onClick={() => {
                dispatch({ type: "cartDecrement", payload: index });
              }}
              className="text-white border-2 border-white hover:bg-white rounded-full hover:text-[#c73a0f]"
            >
              <FaMinus className="size-4  cursor-pointer" />
            </button>

            <span className=" font-medium text-white ">
              {" "}
              {foodItem.quantity}
            </span>
            <button
              onClick={() => {
                dispatch({ type: "cartIncrement", payload: index });
              }}
              className="text-white border-2 border-white hover:bg-white rounded-full hover:text-[#c73a0f]"
            >
              <FaPlus className="size-4  cursor-pointer" />
            </button>
          </div>
        )}
      </div>

      <div>
        <p className="text-md text-[#ad8985]">{product.category}</p>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-lg font-semibold text-[#c73a05]">${product.price}</p>
      </div>
    </div>
  );
}
