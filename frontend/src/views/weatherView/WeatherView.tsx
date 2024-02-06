import React, { useEffect, useState } from "react";
import {
  getLocalTime,
  getWeatherByCityId,
} from "../../services/weatherService";
import SearchBar from "../../components/searchBar/SearchBar";
import CityInfo from "../../interfaces/CityInfo";
import { apiDomainName } from "../../configConsts";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import TimeAndLocation from "./TimeAndLocation";
import loadingSpinner from "../../images/loading_spinner.png";

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

  return (
    <div className="w-full">
      <SearchBar />
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="w-full flex flex-column justify-center">
          <TimeAndLocation
            location={cityInfo}
            localTime={getLocalTime(weatherInfo.timezone)}
          />
          {/* <p>{JSON.stringify(weatherInfo)}</p> */}
        </div>
      )}
    </div>
  );
}

export default WeatherView;
