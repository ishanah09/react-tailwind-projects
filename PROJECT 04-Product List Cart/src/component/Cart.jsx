import cartImage from "../assets/images/illustration-empty-cart.svg";
import removeImage from "../assets/images/icon-remove-item.svg";
import carbonNeutral from "../assets/images/icon-carbon-neutral.svg";
import { useContext } from "react";
import { ListContext } from "../context/ListProvider";

export default function Cart({}) {
  const { state, dispatch, total, orderTotal } = useContext(ListContext);

  return (
    <div className="bg-white rounded-lg  p-6 w-full md:max-w-[275px] lg:max-w-[320px] mx-auto    ">
      <h2 className="font-bold text-2xl mb-8 text-[hsl(14,86%,42%)]">
        {" "}
        Your Cart ({total})
      </h2>
      {state.cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={cartImage} alt="image of an empty cart" className="" />

          <p className="text-md font-semibold text-[#87635a]">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div>
          <ul className="">
            {state.cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-4 border-b border-[#ad8985] pb-4 mb-4"
              >
                <div className="flex flex-col gap-1 ">
                  <p className="font-semibold text-md">{item.name}</p>
                  <div className="flex gap-3">
                    <p className="text-base font-semibold text-[hsl(14,86%,42%)]">
                      {item.quantity}x
                    </p>
                    <p className="text-base text-[#ad8985]">@ ${item.price}</p>
                    <p className="text-base text-[#87635a] font-semibold">
                      ${item.quantity * item.price}
                    </p>
                  </div>
                </div>

                <div className="border-2 border-gray-400  rounded-full p-0.5 hover:border-black">
                  <img
                    src={removeImage}
                     alt="Remove item"
                    className="cursor-pointer size-3  "
                    onClick={() => {
                      dispatch({ type: "cartFilter", payload: item.id });
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-6">
            <p className="font-semibold text-[#87635a]">Order Total</p>
            <p className="font-bold text-3xl">${orderTotal}</p>
          </div>

          <div className="flex items-center justify-center gap-1 bg-rose-50 rounded-lg p-2 mt-6  ">
            <img src={carbonNeutral} alt="Carbon neutral delivery icon" />
            <p>
              This is a{" "}
              <span className="font-semibold text-black">Carbon-Neutral </span>
              delivery
            </p>
          </div>

          <button
            onClick={() => {
              dispatch({ type: "setOrder", payload: state.cart });
              dispatch({ type: "setCartEmpty", payload: [] });
              dispatch({ type: "setOrderPlaced", payload: true });
            }}
            className="font-medium text-lg text-center w-full cursor-pointer bg-[#c73a0f] mt-6 p-4 rounded-[50px] text-white hover:bg-[hsl(12,20%,44%)]"
          >
            <a href="#">Confirm Order</a>
          </button>
        </div>
      )}
    </div>
  );
}
