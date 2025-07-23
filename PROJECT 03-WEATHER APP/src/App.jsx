import Weather from "./component/Weather";
import WeatherContextProvider from "./context/WeatherContext";

export default function App() {
  return (
    <WeatherContextProvider>
      <Weather></Weather>
    </WeatherContextProvider>
  );
}
