import { title } from "process";
import React, { useEffect, useState } from "react";
import CityInfo from "../../interfaces/CityInfo";
import { UnitType, getForecastByCoords } from "../../services/weatherService";

type Props = {
  title: string;
  cityInfo: CityInfo;
  units: UnitType;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Forecast({ title, cityInfo, units }: Props) {
  const unitsMapping = {
    degrees: units === "metric" ? "°C" : "°F",
  };

  const [dailyForecast, setDailyForecast] = useState<any[]>([]);
  useEffect(() => {
    getForecastByCoords(cityInfo.coord.lat, cityInfo.coord.lon, units).then(
      (data) => {
        setDailyForecast(data.daily.slice(0, 5));
      }
    );
  }, []);

  return (
    <div className="mx-32 mt-5 text-white">
      <div className="flex flex-row justify-start">
        <p className="text-2xl font-bold capitalize">{title}</p>
      </div>
      <div className="flex flex-row justify-around mt-2 border-t-2 border-white text-slate p-3">
        {dailyForecast.length > 0
          ? dailyForecast.map((day: any, index: number) => {
              return (
                <div className="grid place-items-center">
                  <p className="text-lg font-bold">
                    {index === 0
                      ? "Today"
                      : days[new Date(day.dt * 1000).getDay()]}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                  ></img>
                  <p className="text-normal font-bold">
                    {parseInt(day.temp.day)}
                    {unitsMapping.degrees}
                  </p>
                  <p className="text-normal capitalize">
                    {day.weather[0].main}
                  </p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Forecast;
