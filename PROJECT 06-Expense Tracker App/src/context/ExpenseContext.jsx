import { createContext, useContext, useEffect, useReducer } from "react";

export const ExpenseContext = createContext();

let initialState = {
  expenseList: [],
  error: null,
};

function expenseReducer(state, action) {
  switch (action.type) {
    case "Add_Expense": {
      return { ...state, expenseList: [...state.expenseList, action.payload] };
    }

    case "Delete_Expense": {
      return {
        ...state,
        expenseList: state.expenseList.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    }

    case "Update_Expense": {
      return {
        ...state,

        expenseList: state.expenseList.map((expense) => {
          if (expense.id === action.payload.id) {
            return action.payload;
           
          } else {
            return expense;
          }
        }),
      };
    }

    case "Set_ExpenseList": {
      return {
        ...state,
        expenseList: [...action.payload],
      };
    }

  case "Set_Error": {
  return { ...state, error: action.payload };
}
    default:
      return { state };
  }
}

export default function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

useEffect(() => {
  try {
    const list = JSON.parse(localStorage.getItem("list"));
    if (Array.isArray(list) && list.length > 0) {
      dispatch({ type: "Set_ExpenseList", payload: list });
    }
  } catch (error) {
    console.log(error);
    
    dispatch({ type: "Set_Error", payload: "Failed to load from localStorage" });
  }
}, []);


  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(state.expenseList));
  }, [state.expenseList]);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
}
