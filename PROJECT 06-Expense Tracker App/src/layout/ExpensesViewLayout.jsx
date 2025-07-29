import { NavLink } from "react-router-dom";

export default function ExpenseViewLayout() {
  return (
    <nav className="flex gap-4 bg-white shadow-lg p-4 rounded-xl ">
      <NavLink
        to="/"
        className={({ isActive }) =>
          ` text-sm sm:text-base font-semibold p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
            isActive
              ? "bg-blue-400 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        Expense List
      </NavLink>
      <NavLink
        to="/expenseAnalytics"
        className={({ isActive }) =>
          `text-sm  sm:text-base font-semibold p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
            isActive
              ? "bg-blue-400 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        Expenses Analytics
      </NavLink>
    </nav>
  );
}
