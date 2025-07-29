import { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ExpenseContext } from "../context/ExpenseContext";

export default function Expense({ item }) {
  const { state, dispatch } = useContext(ExpenseContext);
  const [expense, setExpense] = useState({ ...item });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <tr className="hover:bg-gray-50 bg-white transition  shadow-lg  ">
      <td className="p-3 border-b border-gray-300  text-gray-500 font-medium whitespace-nowrap ">
        {isEditing ? (
          <input
            type="date"
            id="date"
            className="border rounded-sm outline-0 focus:outline-none focus:ring-1 focus:ring-purple-400 p-2.5 text-sm"
            value={expense.dateInput || ""}
            onChange={(e) => {
              const rawDate = e.target.value;
              const formattedDate = new Date(rawDate).toLocaleDateString(
                "en-us",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              );

              setExpense({
                ...expense,
                date: formattedDate,
                dateInput: rawDate,
              });
            }}
          />
        ) : (
          item.date
        )}
      </td>

      <td className="p-3 border-b border-gray-300 text-gray-950 font-medium whitespace-nowrap ">
        {isEditing ? (
          <input
            type="text"
            className="border rounded-sm outline-0 focus:outline-none focus:ring-1 focus:ring-purple-400 p-2 placeholder:text-sm text-sm"
            value={expense.amount || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9]*$/.test(value)) {
                setExpense({ ...expense, amount: parseFloat(value) });
              }
            }}
          />
        ) : (
          "₹" + item.amount
        )}
      </td>

      <td className="p-3 border-b border-gray-300 text-gray-500 whitespace-nowrap ">
        {isEditing ? (
          <select
            name="category"
            id="category"
            value={expense.category || ""}
            className="border-2 rounded-sm outline-0 focus:outline-none focus:ring-1 focus:ring-purple-400 p-2 text-sm"
            onChange={(e) =>
              setExpense({ ...expense, category: e.target.value })
            }
          >
            <option value="" disabled className="text-sm text-gray-500">
              Select a category
            </option>
            <option value="food" className="text-sm text-black">
              Food
            </option>
            <option value="health" className="text-sm text-black">
              Health
            </option>
            <option value="shopping" className="text-sm text-black">
              Shopping
            </option>
             <option value="entertainment" className="text-sm text-black">
                 Entertainment
                </option>
            <option value="utilities" className="text-sm text-black">
              Utilities
            </option>
            <option value="transport" className="text-sm text-black">
              Transport
            </option>
            <option value="other" className="text-sm text-black">
              Other
            </option>
          </select>
        ) : (
        <span className="font-medium">  {item.category?.charAt(0).toUpperCase() + item.category?.slice(1) }</span>
        )}
      </td>

      <td className="p-3 border-b border-gray-300 text-gray-950 whitespace-nowrap ">
        {isEditing ? (
          <input
            type="text"
            className="border rounded-sm outline-0 focus:outline-none focus:ring-1 focus:ring-purple-400 p-1 placeholder:text-sm text-sm"
            maxLength={30}
            value={expense.description}
            onChange={(e) => {
              setExpense({ ...expense, description: e.target.value });
            }}
          />
        ) : (
          item.description
        )}
      </td>

      <td className="p-3 border-b border-gray-300 whitespace-nowrap   ">
        {isEditing ? (
          <div className="flex gap-2">
            <button
              className="text-white text-[12px] bg-green-500 py-1 px-2 rounded-xl cursor-pointer active:scale-90"
              onClick={() => {
                setIsEditing(false);
                dispatch({ type: "Update_Expense", payload: expense });
              }}
            >
              Save
            </button>

            <button
              className="text-white text-[12px] bg-gray-400 py-1 px-2 rounded-xl cursor-pointer active:scale-90"
              onClick={() => {
                setExpense({ ...item });
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="">
            <button>
              <MdEdit
                className="size-5 text-yellow-500 mr-3 sm:mr-6 cursor-pointer"
                onClick={() => setIsEditing(true)}
              />
            </button>

            <button>
              <MdDelete
                className="size-5 text-red-500 cursor-pointer"
                onClick={(e) => {
                  dispatch({
                    type: "Delete_Expense",
                    payload: item.id,
                  });
                }}
              />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
