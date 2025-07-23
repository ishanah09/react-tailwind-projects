import { useContext } from "react";
import { allIcon } from "../utility/data";
import { WeatherContext } from "../context/WeatherContext";

export default function HourlyForecast({ data }) {
  const { state } = useContext(WeatherContext);
  return (
    <li className="flex flex-col items-center justify-between  p-2  bg-white/25 hover:bg-white/50 border-1 border-textPrimary shadow-xl rounded-lg ">
      <p className="text-textSecondary">
        {new Date(data.dt * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          hour12: true,
        })}
      </p>

      <img
        src={allIcon[data.weather[0].icon]}
        alt="weather realted icon"
        draggable={false}
        className="size-12 sm:size-15"
      />
      <p className="text-textPrimary">
        {" "}
        {state.celcius
          ? data.main.temp.toFixed(0)
          : ((data.main.temp * 9) / 5 + 32).toFixed(0)}
        {state.celcius ? <span>°C</span> : <span>°F</span>}
      </p>
    </li>
  );
}
