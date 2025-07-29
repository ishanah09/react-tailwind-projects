import { CiWallet } from "react-icons/ci";
import { IoIosTrendingUp } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import ExpenseViewLayout from "../layout/ExpensesViewLayout";
import { ExpenseContext } from "../context/ExpenseContext";
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";

export default function Dashboard() {
  const { state, dispatch } = useContext(ExpenseContext);

  const [expense, setExpense] = useState({});

  function getTotalExpenseAmount(data) {
    return data.reduce((total, item) => total + item.amount, 0);
  }

  function getExpneseBycategory(data) {
    const category = {
      food: 0,
      transport: 0,
      shopping: 0,
      entertainment: 0,
      utilities: 0,
      health: 0,
      other: 0,
    };

    let highestCategory = "";
    let max = 0;

    data.map((expense) => {
      category[expense.category] += expense.amount;
    });
    for (let i in category) {
      if (category[i] > max) {
        max = category[i];
        highestCategory = i;
      }
    }
    return `${
      highestCategory.charAt(0).toUpperCase() + highestCategory.slice(1)
    } (₹${max})`;
  }

  return (
    <section className="max-w-7xl mx-auto  py-12 pb-16  flex flex-col gap-8 ">
      <div className=" flex items-center justify-evenly flex-wrap gap-6  sm:gap-8  ">
        <div className=" bg-white shadow-xl  p-6 rounded-lg w-full max-w-[350px] ">
          <h2 className="text-purple-500 text-[22px] sm:text-2xl font-semibold text-center mb-4">
            Add New Expenses
          </h2>

          <form
            className="   flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (
                expense.description &&
                expense.amount &&
                expense.category &&
                expense.date
              ) {
                const newExpense = { ...expense, id: crypto.randomUUID() };
                dispatch({ type: "Add_Expense", payload: newExpense });
                setExpense({});
              }
            }}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="">
                Description
              </label>
              <input
                type="text"
                id="description"
                placeholder="Money Spend on?"
                className="border rounded-sm outline-0 focus:outline-none focus:ring-1 focus:ring-purple-400 p-2 placeholder:text-sm text-sm"
                maxLength={30}
                value={expense.description || ""}
                onChange={(e) => {
                  setExpense({ ...expense, description: e.target.value });
                }}
              />
            </div>

            <div className="flex flex-col ">
              <label htmlFor="amount" className="">
                Amount (₹)
              </label>
              <input
                type="text"
                id="amount"
                placeholder="0.00"
                className="border rounded-sm outline-0 focus:outline-none focus:ring-1 focus:ring-purple-400 p-2 placeholder:text-sm text-sm"
                value={expense.amount || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[0-9]*$/.test(value)) {
                    setExpense({ ...expense, amount: parseFloat(value) });
                  }
                }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={expense.category || ""}
                className="border rounded-sm outline-0 focus:outline-none focus:ring-1 focus:ring-purple-400 p-2.5 text-sm"
                onChange={(e) =>
                  setExpense({ ...expense, category: e.target.value })
                }
              >
                <option value="" disabled className="text-sm text-gray-500">
                  Select a category
                </option>
                <option value="food" className="text-sm">
                  Food
                </option>
                <option value="health" className="text-sm">
                  Health
                </option>
                <option value="shopping" className="text-sm">
                  Shopping
                </option>
                <option value="entertainment" className="text-sm">
                  Entertainment
                </option>
                <option value="utilities" className="text-sm">
                  Utilities
                </option>
                <option value="transport" className="text-sm">
                  Transport
                </option>
                <option value="other" className="text-sm">
                  Other
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="date">Date</label>
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
            </div>

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 active:scale-95 transition-normal text-white py-2 rounded-lg tracking-wide cursor-pointer mt-3"
            >
              Add Expenses
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-[300px]">
          <div className="bg-white shadow-xl pl-6 py-6 pr-2  flex items-center  gap-3 rounded-md hover:bg-gray-50 transition-colors">
            <CiWallet className="size-11 bg-red-600 rounded-full p-2 text-gray-600" />
            <div>
              <p className="text-gray-500 text-lg ">Total Expenses</p>
              <p className="font-medium text-md ">
                {" "}
                {state.expenseList && state.expenseList.length > 0
                  ? getTotalExpenseAmount(state.expenseList)
                  : "0"}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-xl pl-6 py-6 pr-2 flex items-center gap-3 rounded-md hover:bg-gray-50 transition-colors">
            <IoIosTrendingUp className="size-11 bg-red-400 rounded-full p-2 text-gray-800" />
            <div>
              <p className="text-gray-500 text-lg ">Highest Category</p>
              <p className="font-medium text-md  ">
                {state.expenseList && state.expenseList.length > 0
                  ? getExpneseBycategory(state.expenseList)
                  : "0"}
              </p>
            </div>
          </div>

          <div className="bg-white shadow-xl pl-6 py-6 pr-2 flex items-center gap-3 rounded-md hover:bg-gray-50 transition-colors">
            <CiViewList className="size-11 bg-yellow-300 rounded-full p-2 text-gray-700" />
            <div>
              <p className="text-gray-500 text-lg ">Total Entries</p>
              <p className="font-medium text-md  ">
                {state.expenseList && state.expenseList.length > 0
                  ? state.expenseList.length
                  : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white ">
        <ExpenseViewLayout></ExpenseViewLayout>
        <Outlet></Outlet>
      </div>
    </section>
  );
}
