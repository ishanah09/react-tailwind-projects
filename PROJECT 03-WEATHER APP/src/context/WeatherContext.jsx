import { createContext, useEffect, useReducer } from "react";
import { allIcon } from "../utility/data";
export const WeatherContext = createContext();

const initialState = {
  weatherData: {},
  error: false,
  celcius: true,
  theme: "light",
  input: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setWeatherData": {
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          name: action.payload.data.name,
          date: new Date(action.payload.data.dt * 1000).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
              day: "2-digit",
              month: "short",
            }
          ),

          icon: allIcon[action.payload.data.weather[0].icon],

          temp_celcius: action.payload.data.main.temp.toFixed(0),
          temp_farhenheit: (
            (action.payload.data.main.temp * 9) / 5 +
            32
          ).toFixed(0),

          main: action.payload.data.weather[0].main,
          description: action.payload.data.weather[0].description,

          feels_celcius: action.payload.data.main.feels_like.toFixed(0),
          feels_farhenheit: (
            (action.payload.data.main.temp * 9) / 5 +
            32
          ).toFixed(0),

          humidity: action.payload.data.main.humidity,
          wind: (action.payload.data.wind.speed * 3.6).toFixed(0) + " Km/h",

          visibility: (action.payload.data.visibility / 1000).toFixed(0),
          min_celsius: (action.payload.data.main.temp_min - 6).toFixed(0),
          min_fahrenheit: (
            ((action.payload.data.main.temp_min - 6) * 9) / 5 +
            32
          ).toFixed(0),

          max_celsius: (action.payload.data.main.temp_max + 4).toFixed(0),
          max_fahrenheit: (
            ((action.payload.data.main.temp_max + 4) * 9) / 5 +
            32
          ).toFixed(0),

          hourly: action.payload.data2.list.slice(0, 3),
          daily: action.payload.data2.list
            .filter((_, index) => (index - 7) % 8 === 0)
            .slice(0, 5),
        },
      };
    }

    case "setError": {
      return { ...state, error: action.payload };
    }
    case "setCelcius": {
      return { ...state, celcius: action.payload };
    }
    case "setTheme": {
      return { ...state, theme: action.payload };
    }

    case "setInput": {
      return { ...state, input: action.payload };
    }

    default:
      return state;
  }
}

export default function WeatherContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (state.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.theme]);

  useEffect(() => {
    fetchWeatherdata("delhi");
  }, []);

  async function fetchWeatherdata(cityName) {
    const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
      import.meta.env.VITE_APP_ID
    }&units=metric`;

    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${
      import.meta.env.VITE_APP_ID
    }&units=metric`;

    try {
      dispatch({ type: "setError", payload: false });

      let response1 = await fetch(url1);
      let data = await response1.json();
      const icon = allIcon[data.weather[0].icon];

      let response2 = await fetch(url2);
      let data2 = await response2.json();

      dispatch({ type: "setWeatherData", payload: { data, data2 } });
    } catch (error) {
      dispatch({ type: "setError", payload: true });
    }
  }
  return (
    <WeatherContext.Provider value={{ state, dispatch, fetchWeatherdata }}>
      {children}
    </WeatherContext.Provider>
  );
}
