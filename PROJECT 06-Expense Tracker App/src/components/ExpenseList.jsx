import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import Expense from "./Expense";
export default function ExpenseList() {
  const { state, dispatch } = useContext(ExpenseContext);
  const [selectedCategory, setSelectedcategory] = useState("All Categories");

  return (
    <div className=" ">
      <div className=" flex items-center justify-between py-5 px-4 ">
        <h2 className="text-purple-500 text-md sm:text-[22px] font-semibold  ">
          Expense List
        </h2>

        {state.expenseList.length !== 0 && (
          <select
            name="category"
            id="category"
            value={selectedCategory}
            className="border rounded-sm outline-0 focus:outline-none focus:ring-1 focus:ring-purple-500 py-2 px-3 text-sm sm:text-md  font-medium"
            onChange={(e) => setSelectedcategory(e.target.value)}
          >
            <option value="All Categories" className="text-sm sm:text-md  ">
              All Categories
            </option>
            <option value="food" className="text-sm sm:text-md  ">
              Food
            </option>
            <option value="health" className="text-sm sm:text-md ">
              Health
            </option>
            <option value="shopping" className="text-sm sm:text-md ">
              Shopping
            </option>
             <option value="entertainment" className="text-sm">
                 Entertainment
                </option>
            <option value="utilities" className="text-sm sm:text-md  ">
              Utilities
            </option>
            <option value="transport" className="text-sm sm:text-md  ">
              Transport
            </option>
            <option value="other" className="text-sm sm:text-md  ">
              Other
            </option>
          </select>
        )}
      </div>
      

      {state.expenseList.length === 0 || state.expenseList
                ?.filter((item) =>
                  selectedCategory === "All Categories"
                    ? true
                    : item.category === selectedCategory
                ).length===0 ? (
        <div className="text-center text-gray-600 px-4 pt-10 pb-15 ">


       {state.expenseList.length !== 0 && state.expenseList
                ?.filter((item) =>
                  selectedCategory === "All Categories"
                    ? true
                    : item.category === selectedCategory
                ).length===0 ?<p className="text-lg font-semibold">{`No ${selectedCategory} category expenses added yet.`}</p>  :<p className="text-lg font-semibold">No expenses added yet.</p>  }



          <p className="text-sm mt-1">
            Start by adding a new expense to see it here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto md:overflow-x-hidden">
          <table className="min-w-full   overflow-hidden ">
            <thead className="bg-gray-100 text-gray-600 sm:text-base text-sm">
              <tr>
                <th className="p-3 text-left border-b-2 border-gray-400  ">
                  Date
                </th>
                <th className="p-3 text-left border-b-2 border-gray-400  ">
                  Amount
                </th>
                <th className="p-3 text-left border-b-2 border-gray-400 ">
                  Category
                </th>
                <th className="p-3 text-left  border-b-2 border-gray-400">
                  Description
                </th>
                <th className="p-3 text-left border-b-2 border-gray-400 ">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="sm:text-base text-sm  ">
              {state.expenseList
                ?.filter((item) =>
                  selectedCategory === "All Categories"
                    ? true
                    : item.category === selectedCategory
                )
                .map((item) => (
                  <Expense key={item.id} item={item} />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
