import React, { useEffect, useState } from "react";
import { getWeatherByCityId } from "../../services/weatherService";
import SearchBar from "../../components/searchBar/SearchBar";
import CityInfo from "../../interfaces/CityInfo";
import { apiDomainName } from "../../configConsts";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const initialState: CityInfo = {
  id: 0,
  name: "",
  state: "",
  country: "",
  coord: { lon: 0, lat: 0 },
};

function WeatherView() {
  const { id } = useParams();
  const cityId = parseInt(id!, 10);
  const [cityInfo, setCityInfo] = useState<CityInfo>(initialState);
  const [weatherInfo, setWeatherInfo] = useState<any>({});
  useEffect(() => {
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
    <div>
      <SearchBar />
      WeatherView for {cityInfo.name}
      <p>{JSON.stringify(weatherInfo)}</p>
    </div>
  );
}

export default WeatherView;
