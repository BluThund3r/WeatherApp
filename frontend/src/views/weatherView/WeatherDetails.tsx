import React from "react";
import { UnitType } from "../../services/weatherService";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
  UilCloud,
} from "@iconscout/react-unicons";

type Props = { weatherInfo: any; units: UnitType };

function WeatherDetails({ weatherInfo, units }: Props) {
  console.log("weatherInfo", weatherInfo);
  const unitsMapping = {
    degrees: units === "metric" ? "C" : "F",
    speed: units === "metric" ? "km/h" : "mph",
  };

  const displayWeatherDetails = [
    {
      icon: <UilCloud style={{ display: "inline" }} className="mr-1" />,
      title: "Clouds",
      value: `${parseInt(weatherInfo.clouds.all)}%`,
    },
    {
      icon: <UilTemperature style={{ display: "inline" }} className="mr-1" />,
      title: "Feels Like",
      value: `${parseInt(weatherInfo.main.feels_like)}°${unitsMapping.degrees}`,
    },
    {
      icon: <UilTear style={{ display: "inline" }} className="mr-1" />,
      title: "Humidity",
      value: `${weatherInfo.main.humidity}%`,
    },
    {
      icon: <UilWind style={{ display: "inline" }} className="mr-1" />,
      title: "Wind",
      value: `${parseInt(weatherInfo.wind.speed)}${unitsMapping.speed}`,
    },
  ];

  const otherDetails = [
    {
      icon: <UilSun style={{ display: "inline" }} className="mr-1" />,
      title: "Sunrise",
      value: new Date(weatherInfo.sys.sunrise * 1000)
        .toLocaleTimeString()
        .slice(0, 5),
    },
    {
      icon: <UilSunset style={{ display: "inline" }} className="mr-1" />,
      title: "Sunset",
      value: new Date(weatherInfo.sys.sunset * 1000)
        .toLocaleTimeString()
        .slice(0, 5),
    },
    {
      icon: <UilArrowUp style={{ display: "inline" }} className="mr-1" />,
      title: "High",
      value: `${parseInt(weatherInfo.main.temp_max)}°${unitsMapping.degrees}`,
    },
    {
      icon: <UilArrowDown style={{ display: "inline" }} className="mr-1" />,
      title: "Low",
      value: `${parseInt(weatherInfo.main.temp_min)}°${unitsMapping.degrees}`,
    },
  ];

  return (
    <div className="w-full grid place-items-center text-white mt-5">
      <h1 className="text-3xl font-bold text-cyan-900">
        {weatherInfo.weather[0].main}
      </h1>
      <div
        style={{ gridTemplateColumns: "1fr 1fr" }}
        className="grid place-items-center mt-2"
      >
        <div className="flex justify-around">
          <img
            className="w-20 aspect-square"
            src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`}
            alt="weather_icon"
          />
          <span className="text-6xl font-bold text-slate-600 inline-block mt-2">
            {parseInt(weatherInfo.main.temp)}°{unitsMapping.degrees}
          </span>
        </div>
        <div className="detailed-weather grid w-fit h-fit place-items-center text-slate-600">
          {displayWeatherDetails.map((detail, index) => {
            return (
              <p key={index}>
                {detail.icon}
                {detail.title}:{" "}
                <span className="font-bold">{detail.value}</span>
              </p>
            );
          })}
        </div>
      </div>
      <div className="w-full mt-2 flex flex-row items-center justify-center space-x-2  text-slate-700 p-1">
        {otherDetails.map((detail, index) => {
          return (
            <span key={index} style={{ display: "inline-block" }}>
              {detail.icon}
              {detail.title}: {detail.value}
              {index !== otherDetails.length - 1 ? (
                <span>&nbsp;&nbsp;|&nbsp;</span>
              ) : (
                ""
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherDetails;
