import { createContext, useMemo, useReducer } from "react";

export const ListContext = createContext();

const initialState = {
  cart: [],
  order: [],
  orderPlaced: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "setCart": {
      return { ...state, cart: [...state.cart, action.payload] };
    }

    case "setCartEmpty": {
      return { ...state, cart: action.payload };
    }

    case "cartDecrement": {
      return {
        ...state,
        cart: state.cart
          .map((item) => {
            if (item.id === action.payload) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          })
          .filter((item) => item.quantity !== 0),
      };
    }

    case "cartIncrement": {
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        }),
      };
    }

    case "cartFilter": {
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.payload),
      };
    }
    case "setOrder": {
      return { ...state, order: action.payload };
    }
    case "setOrderPlaced": {
      return { ...state, orderPlaced: action.payload };
    }

    default: {
      return state;
    }
  }
}

export default function ListProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const confirmTotal = useMemo(() => {
    return state.order.reduce(
      (tot, item) => tot + item.quantity * item.price,
      0
    );
  }, [state.order]);

  const total = useMemo(() => {
    return state.cart.reduce((tot, item) => tot + item.quantity, 0);
  }, [state.cart]);

  const orderTotal = useMemo(() => {
    return state.cart.reduce(
      (tot, item) => tot + item.quantity * item.price,
      0
    );
  }, [state.cart]);

  return (
    <ListContext.Provider
      value={{ state, dispatch, confirmTotal, total, orderTotal }}
    >
      {children}
    </ListContext.Provider>
  );
}
