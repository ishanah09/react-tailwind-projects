import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";
import ExpenseList from "./components/ExpenseList"
import  ExpenseAnalytics  from "./components/ExpenseAnalytics";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index></Index>}>
          <Route element={<Dashboard></Dashboard>}>
            <Route index element={<ExpenseList></ExpenseList>}></Route>
            <Route
              path="/expenseAnalytics"
              element={<ExpenseAnalytics></ExpenseAnalytics>}
            ></Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
