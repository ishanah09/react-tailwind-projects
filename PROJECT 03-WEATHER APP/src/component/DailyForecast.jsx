import { useContext } from "react";
import { WiHumidity } from "react-icons/wi";
import { WeatherContext } from "../context/WeatherContext";

export default function DailyForecast({ data }) {
  const { state } = useContext(WeatherContext);
  return (
    <li className="flex item-center justify-between  p-2.5  bg-white/25 hover:bg-white/40 border-1 border-textPrimary  shadow-xl md:gap-5 text-textPrimary rounded-lg ">
      <p>
        {" "}
        {new Date(data.dt * 1000).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        })}
      </p>
      <p className="text-textSecondary hidden sm:block ">
        {new Date(data.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </p>
      <div className="flex items-center justify-center text-blue-800">
        <WiHumidity size={20} />
        <p> {data.main.humidity}%</p>
      </div>
      <p className="text-textPrimary ">
        {state.celcius
          ? data.main.temp.toFixed(0)
          : ((data.main.temp * 9) / 5 + 32).toFixed(0)}
        {state.celcius ? <span>°C</span> : <span>°F</span>}
      </p>
    </li>
  );
}
