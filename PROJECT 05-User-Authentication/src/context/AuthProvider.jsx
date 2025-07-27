import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const AuthContext = createContext();
const initialState = {
  formData: [],
  input: {},
  user: {},
  error: {},
  otp: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "setFormData": {
      return {
        ...state,
        formData: [
          ...state.formData,
          { id: crypto.randomUUID(), ...action.payload },
        ],
      };
    }

    case "changepassword": {
      return {
        ...state,
        formData: state.formData.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, password: action.payload.password };
          }
          return item;
        }),
      };
    }

    case "setInput": {
      const { name, value } = action.payload;
      return { ...state, input: { ...state.input, [name]: value } };
    }

    case "setClearInput": {
      return { ...state, input: action.payload };
    }

    case "setUserOtp": {
      return { ...state, otp: { ...state.otp, user: Number(action.payload) } };
    }

    case "setGeneratedOtp": {
      return {
        ...state,
        otp: { ...state.otp, generated: Number(action.payload) },
      };
    }
    case "setOtp": {
      return { ...state, otp: action.payload };
    }

    case "loginSuccess": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "setUser": {
      return { ...state, user: action.payload };
    }

    case "logout": {
      return {
        ...state,
        user: null,
        input: {},
        otp: {},
        error: {},
      };
    }

    case "setError": {
      return { ...state, error: action.payload };
    }

    default:
      return state;
  }
}

export default function Authprovider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  function signUpformSubmit(e) {
    e.preventDefault();
    const validate = signUpFormValidate(state);
    if (Object.keys(validate).length === 0) {
      dispatch({ type: "setFormData", payload: state.input });

      navigate("/signin");
    }

    dispatch({ type: "setError", payload: validate });
  }

  function signUpFormValidate(state) {
    const error = {};
    const regexName = /^[A-Za-z]+(\s[A-Za-z]+)+$/;
    const regexnumber = /^[0-9]{10}$/;
    const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9._]+\.[A-Za-z]{2,}$/;
    const regexPassword = /^[^A-Z]*[A-Z]{1,}[^A-Z]*$/;
    const isEmailExist = state.formData.some(
      (item) => item.email === state.input.email
    );

    if (!state.input.name) {
      error.name = "Name is required";
    } else if (!regexName.test(state.input.name)) {
      error.name = "Full Name is required";
    }

    if (!state.input.email) {
      error.email = "Email is required";
    } else if (!regexEmail.test(state.input.email)) {
      error.email = "Please write valid email";
    } else if (isEmailExist) {
      error.email = "Email already exists";
    }

    if (!state.input.number) {
      error.number = "Phone Number is required";
    } else if (!regexnumber.test(state.input.number)) {
      error.number = "Please enter valid phone number";
    }
    if (!state.input.password) {
      error.password = "Password is required";
    } else if (state.input.password.length < 8) {
      error.password = "Atleast 8 character required";
    } else if (!regexPassword.test(state.input.password)) {
      error.password = "Atleast 1 uppercase required";
    }
    return error;
  }

  function logInFormSubmit(e) {
    e.preventDefault();
    const user = state.formData.find(
      (item) => item.email === state.input.email
    );
    const validate = logInFormValidate(state, user);

    if (Object.keys(validate).length === 0) {
      dispatch({ type: "loginSuccess", payload: user });
      navigate("/signin/user");
    }
    dispatch({ type: "setError", payload: validate });
  }

  function logInFormValidate(state, user) {
    const error = {};

    if (!state.input.email) {
      error.error = "Please enter your email";
      return error;
    }
    if (!user) {
      error.error = "No account found with this email";
      return error;
    }
    if (!state.input.password) {
      error.error = "Please enter your password";
      return error;
    }
    if (user.password !== state.input.password) {
      error.error = "Incorrect password";
      return error;
    }
    return error;
  }

  function forgetPasswordFormSubmit(e) {
    e.preventDefault();
    const validate = forgetPasswordFormValidate(state);
    if (Object.keys(validate).length === 0) {
      let generatedOtp = Math.floor(1000 + Math.random() * 9000);
      dispatch({ type: "setGeneratedOtp", payload: generatedOtp });

      toast(`Your OTP is ${generatedOtp}`, {
        duration: 3000,
        position: "top-center",

        style: {
          background: "#1E293B",

          color: "#F8FAFC",
          padding: "16px 20px",
          borderRadius: "12px",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
          fontSize: "18px",
          fontWeight: "600",
          letterSpacing: "2px",
        },
      });
    }

    dispatch({ type: "setError", payload: validate });
  }

  function forgetPasswordFormValidate(state) {
    let error = {};
    const isEmailExist = state.formData.some(
      (item) => item.email === state.input.email
    );

    if (!isEmailExist) {
      error.email = "No account found with this email";
    }
    if (!state.input.email) {
      error.email = "Email is required";
    }
    return error;
  }

  function regenerateOtp() {
    let generatedOtp = Math.floor(1000 + Math.random() * 9000);
    dispatch({ type: "setGeneratedOtp", payload: generatedOtp });

    toast(`Your OTP is ${generatedOtp}`, {
      duration: 3000,
      position: "top-center",

      style: {
        background: "#1E293B",

        color: "#F8FAFC",
        padding: "16px 20px",
        borderRadius: "12px",
        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
        fontSize: "18px",
        fontWeight: "600",
        letterSpacing: "2px",
      },
    });
  }

  function checkOtp() {
    const validate = OtpValidate(state);
    if (Object.keys(validate).length === 0) {
      let user = state.formData.find(
        (item) => item.email === state.input.email
      );
      dispatch({ type: "setUser", payload: user });
      navigate("/signin/changepassword");
    }
    dispatch({ type: "setError", payload: validate });
  }

  function OtpValidate(state) {
    let error = {};
    if (state.otp.user !== state.otp.generated) {
      error.otp = "Invalid OTP";
    }
    return error;
  }

  function changePasswordFormSubmit(e, id) {
    e.preventDefault();
    const validate = changePasswordFormValidate(state);
    if (Object.keys(validate).length === 0) {
      dispatch({
        type: "changepassword",
        payload: {
          id,
          password: state.input.password,
        },
      });

      navigate("/signin/passwordchanged", { replace: true });
    }
    dispatch({ type: "setError", payload: validate });
  }

  function changePasswordFormValidate(state) {
    let error = {};

    const regexPassword = /^[^A-Z]*[A-Z]{1,}[^A-Z]*$/;
    if (!state.input.password) {
      error.password = "Password is required";
    } else if (state.input.password.length < 8) {
      error.password = "Atleast 8 character required";
    } else if (!regexPassword.test(state.input.password)) {
      error.password = "Atleast 1 uppercase required";
    }
    return error;
  }
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        signUpformSubmit,
        logInFormSubmit,
        forgetPasswordFormSubmit,
        regenerateOtp,
        checkOtp,
        changePasswordFormSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
