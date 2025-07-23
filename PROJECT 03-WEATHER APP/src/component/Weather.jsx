import { IoSearchSharp, IoLocation } from "react-icons/io5";
import { FaTemperatureHigh, FaWind, FaEye } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";
import { MdDarkMode, MdInbox } from "react-icons/md";

import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForescast";
import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export default function Weather() {
  const { state, dispatch, fetchWeatherdata } = useContext(WeatherContext);

  function handleClick() {
    fetchWeatherdata(state.input);
  }

  return (
    <div
      className={`${
        state.theme === "dark"
          ? "bg-black"
          : " bg-[url('/background.jpg')]"
      } min-h-screen bg-center bg-cover flex items-center justify-center sm:p-8 sm:py-10`}
    >
      <main
        className={`${
          state.theme === "dark" ? "bg-[#6a7282] md:bg-black" : "bg-none"
        } w-full  sm:max-w-[448px] md:max-w-full   backdrop-blur-sm sm:backdrop-blur-2xl md:backdrop-blur-none flex flex-col md:flex-row md:justify-center gap-8   p-6 sm:p-10 md:p-0  sm:rounded-4xl`}
      >
        <section
          className={`${
            state.theme === "dark" ? " md:bg-[#6a7282]" : "bg-none"
          } flex flex-col gap-6 md:backdrop-blur-2xl md:p-8  md:rounded-4xl `}
        >
          <div className="flex items-center justify-between gap-2 -mb-3 ">
            <div className="">
              {state.theme === "light" ? (
                <MdDarkMode
                  size={32}
                  className="text-black cursor-pointer"
                  onClick={() =>
                    dispatch({ type: "setTheme", payload: "dark" })
                  }
                />
              ) : (
                <IoIosSunny
                  size={35}
                  className="text-white cursor-pointer"
                  onClick={() =>
                    dispatch({ type: "setTheme", payload: "light" })
                  }
                />
              )}
            </div>

            <div className="flex items-center gap-2 ">
              <div
                onClick={() => dispatch({ type: "setCelcius", payload: true })}
                className={`${
                  state.celcius && "bg-white"
                } w-10 h-10 flex items-center justify-center  text-sm font-bold bg-gray-400 p-4 rounded-full cursor-pointer tracking-widest `}
              >
                °C
              </div>
              <div
                onClick={() => dispatch({ type: "setCelcius", payload: false })}
                className={`${
                  !state.celcius && "bg-white"
                } w-10 h-10 flex items-center justify-center  text-sm font-bold bg-gray-400 p-4 rounded-full cursor-pointer tracking-widest `}
              >
                °F
              </div>
            </div>
          </div>

          <div
            className={`${
              state.error ? "mb-0" : "mb-7"
            } flex  items-start justify-between gap-2 sm:gap-4 `}
          >
            <div className="w-full flex flex-col gap-1">
              <input
                onKeyUp={(e) => {
                  if (e.key === "Enter") handleClick();
                }}
                onChange={(e) => {
                  dispatch({ type: "setError", payload: false });

                  dispatch({ type: "setInput", payload: e.target.value });
                }}
                type="text"
                placeholder="Search"
                className="w-full px-4 p-2.5   rounded-full text-black bg-white outline-0 border-0 text-[15px] "
              />

              {state.error && (
                <span className="text-red-500  ml-2 font-medium">
                  Invalid city name
                </span>
              )}
            </div>

            <button className="bg-white p-2 cursor-pointer rounded-full flex items-center justify-center w-10 h-10  ">
              <IoSearchSharp
                className=" text-black hover:text-gray-500 size-6"
                onClick={handleClick}
              />
            </button>
          </div>

          <div className="w-full flex items-center justify-between gap-4 flex-wrap ">
            <div className="flex items-center justify-between gap-1">
              <IoLocation size={25} className="text-red-400" />{" "}
              <p className="text-textPrimary font-medium text-2xl  ">
                {state.weatherData.name}
              </p>
            </div>

            <p className="text-lg text-textSecondary">
              {state.weatherData.date}
            </p>
          </div>

          <div className="w-full flex justify-between -mt-2">
            <div className="flex flex-col gap-1 items-center justify-center  text-white ">
              <figure>
                <img
                  src={state.weatherData.icon}
                  draggable={false}
                  alt="weather realted icon"
                  className="size-30"
                />
              </figure>

              <p className="text-lg text-textSecondary">
                {state.weatherData.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 items-center justify-center  text-white">
              <p className="text-5xl font-semibold tracking-wide">
                {state.celcius
                  ? state.weatherData.temp_celcius
                  : state.weatherData.temp_farhenheit}
                {state.celcius ? (
                  <sup className="text-2xl ">°C</sup>
                ) : (
                  <sup className="text-2xl">°F</sup>
                )}{" "}
              </p>

              <p className="text-xl">{state.weatherData.main}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-[rgba(255,255,255,.8)] p-4 shadow-xl rounded-lg">
            <div className="flex items-center justify-between flex-col gap-1 ">
              <FaTemperatureHigh size={20} className="text-blue-500" />
              <p className="text-gray-500">fells like </p>
              <p className="font-medium  ">
                {state.celcius
                  ? state.weatherData.feels_celcius
                  : state.weatherData.feels_farhenheit}
                {state.celcius ? <span>°C</span> : <span>°F</span>}
              </p>
            </div>

            <div className="flex items-center justify-between  flex-col  ">
              <WiHumidity size={30} className="text-blue-500" />
              <p className="text-gray-500 -mt-1">Humidity </p>
              <p className="font-medium">{state.weatherData.humidity}%</p>
            </div>

            <div className="flex items-center justify-between flex-col gap-1">
              <FaWind size={22.5} className="text-blue-500" />
              <p className="text-gray-500">speed </p>
              <p className="font-medium">{state.weatherData.wind}</p>
            </div>

            <div className="flex items-center justify-between flex-col gap-1">
              <FaEye size={20} className="text-blue-500" />
              <p className="text-gray-500">visibility </p>
              <p className="font-medium">{state.weatherData.visibility} km</p>
            </div>

            <div className="flex items-center justify-between flex-col gap-1">
              <FaTemperatureArrowDown size={20} className="text-blue-500" />
              <p className="text-gray-500">Min</p>
              <p className="font-medium">
                {state.celcius
                  ? state.weatherData.min_celsius
                  : state.weatherData.min_fahrenheit}
                {state.celcius ? <span>°C</span> : <span>°F</span>}
              </p>
            </div>

            <div className="flex items-center justify-between flex-col gap-1">
              <FaTemperatureArrowUp size={20} className="text-blue-500" />
              <p className="text-gray-500">Max</p>
              <p className="font-medium ">
                {state.celcius
                  ? state.weatherData.max_celsius
                  : state.weatherData.max_fahrenheit}
                {state.celcius ? <span>°C</span> : <span>°F</span>}
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8 md:justify-between  ">
          <div
            className={`${
              state.theme === "dark" ? " bg-[#6a7282]" : "bg-none"
            }  flex flex-col gap-3 md:backdrop-blur-2xl md:p-6 w-full md:rounded-4xl `}
          >
            <p className=" text-textPrimary text-2xl font-medium">
              Hourly Forecast
            </p>

            <ul className="w-full flex gap-4  justify-between  ">
              {state.weatherData.hourly?.map((item, index) => (
                <HourlyForecast
                  key={index}
                  data={item}
                  celcius={state.celcius}
                ></HourlyForecast>
              ))}
            </ul>
          </div>

          <div
            className={`${
              state.theme === "dark" ? " bg-[#6a7282]" : "bg-none"
            } flex flex-col gap-4 md:backdrop-blur-2xl md:p-6 md:rounded-4xl`}
          >
            <p className=" text-textPrimary text-2xl font-medium ">
              5 Day Forecast
            </p>

            <ul className="w-full flex flex-col gap-3  ">
              {state.weatherData.daily?.map((item, index) => (
                <DailyForecast
                  key={index}
                  data={item}
                  celcius={state.celcius}
                  weatherData={state.weatherData}
                ></DailyForecast>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
