import React, { useEffect, useState } from "react";
import {
  getLocalTime,
  getWeatherByCityId,
  UnitType,
} from "../../services/weatherService";
import SearchBar from "../../components/searchBar/SearchBar";
import CityInfo from "../../interfaces/CityInfo";
import { apiDomainName } from "../../configConsts";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import TimeAndLocation from "./TimeAndLocation";
import loadingSpinner from "../../images/loading_spinner.png";
import WeatherDetails from "./WeatherDetails";
import Forecast from "../../components/forecast/Forecast";

const initialState: CityInfo = {
  id: 0,
  name: "",
  state: "",
  country: "",
  coord: { lon: 0, lat: 0 },
};

function LoadingIcon() {
  return (
    <div
      className="w-full h-screen grid place-items-center"
      style={{ height: "" }}
    >
      <img
        className="animate-spin"
        src={loadingSpinner}
        alt="loading_spinner"
      ></img>
    </div>
  );
}

function WeatherView() {
  const { id } = useParams();
  const cityId = parseInt(id!, 10);
  const [cityInfo, setCityInfo] = useState<CityInfo>(initialState);
  const [weatherInfo, setWeatherInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState<UnitType>("metric");

  useEffect(() => {
    setLoading(true);
    const fetchCityInfoAndWeather = async () => {
      console.log("fetchCityInfoAndWeather", cityId);
      try {
        const response = await fetch(
          `${apiDomainName}/cities/getCityById/${cityId}`
        );
        const data = await response.json();
        if (response.ok) {
          setCityInfo(data as CityInfo);
          const weatherData = await getWeatherByCityId(cityId);
          setWeatherInfo(weatherData);
          toast.success("Successfully fetched city info and weather");
          setLoading(false);
        } else {
          toast.error("Error fetching city info");
          console.error("Error fetching city info", response, data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCityInfoAndWeather();
  }, [cityId]);

  useEffect(() => {
    if (cityInfo.id === 0) return;
    setLoading(true);
    const fetchCityWeather = async () => {
      console.log("fetchCityWeather", cityInfo.id);
      try {
        const weatherData = await getWeatherByCityId(cityInfo.id, units);
        setWeatherInfo(weatherData);
        toast.success("Successfully fetched city weather in new units");
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCityWeather();
  }, [units]);

  return (
    <div className="w-full">
      <SearchBar />
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="w-full">
          <TimeAndLocation
            location={cityInfo}
            localTime={getLocalTime(weatherInfo.timezone)}
          />
          <div className="text-xl font-bold w-full flex justify-center text-white mt-2">
            <span
              style={{ display: "inline-block" }}
              className="cursor-pointer transition ease-out hover:scale-125"
              onClick={() => {
                setUnits("metric");
                console.log("metric");
              }}
            >
              °C
            </span>
            <span>&nbsp;&nbsp;|&nbsp;</span>
            <span
              style={{ display: "inline-block" }}
              className="cursor-pointer transition ease-out hover:scale-125"
              onClick={() => {
                setUnits("imperial");
                console.log("imperial");
              }}
            >
              °F
            </span>
          </div>
          <WeatherDetails weatherInfo={weatherInfo} units={units} />
          <br />
          <Forecast title="daily forecast" cityInfo={cityInfo} units={units} />
        </div>
      )}
    </div>
  );
}

export default WeatherView;
