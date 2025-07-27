import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/Notfound";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomeContent from "./pages/HomeContent";
import User from "./pages/User";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import PasswordChanged from "./pages/PasswordChanged";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}>
        <Route index element={<HomeContent></HomeContent>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>

        <Route path="/signin/user" element={<User></User>}></Route>
        <Route
          path="/signin/forgotpassword"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>

        <Route
          path="/signin/changepassword"
          element={<ChangePassword></ChangePassword>}
        ></Route>
        <Route
          path="/signin/passwordchanged"
          element={<PasswordChanged></PasswordChanged>}
        ></Route>
      </Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  );
}
