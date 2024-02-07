import React, { useEffect, useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import CityInfo from "../../interfaces/CityInfo";
import Forecast from "../../components/forecast/Forecast";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);

  const basicCities: CityInfo[] = [
    {
      id: 5128638,
      country: "US",
      state: "NY",
      name: "New York",
      coord: {
        lat: 43.000351,
        lon: -75.499901,
      },
    },
    {
      id: 2643743,
      name: "London",
      state: "",
      country: "GB",
      coord: {
        lon: -0.12574,
        lat: 51.50853,
      },
    },
    {
      id: 2968815,
      name: "Paris",
      state: "",
      country: "FR",
      coord: {
        lon: 2.3486,
        lat: 48.853401,
      },
    },
    {
      id: 3169070,
      name: "Rome",
      state: "",
      country: "IT",
      coord: {
        lon: 12.4839,
        lat: 41.894741,
      },
    },
    {
      id: 5368361,
      name: "Los Angeles",
      state: "CA",
      country: "US",
      coord: {
        lon: -118.243683,
        lat: 34.052231,
      },
    },
    {
      id: 1850147,
      name: "Tokyo",
      state: "",
      country: "JP",
      coord: {
        lon: 139.691711,
        lat: 35.689499,
      },
    },
    {
      id: 1261481,
      name: "New Delhi",
      state: "",
      country: "IN",
      coord: {
        lon: 77.23114,
        lat: 28.61282,
      },
    },
    {
      id: 3369157,
      name: "Cape Town",
      state: "",
      country: "ZA",
      coord: {
        lon: 18.42322,
        lat: -33.925838,
      },
    },
    {
      id: 4104031,
      name: "Cairo",
      state: "AR",
      country: "US",
      coord: {
        lon: -92.869881,
        lat: 33.220131,
      },
    },
    {
      id: 6160752,
      name: "Sydney",
      state: "",
      country: "CA",
      coord: {
        lon: -60.181751,
        lat: 46.150139,
      },
    },
    {
      id: 6559994,
      name: "Buenos Aires",
      state: "",
      country: "PE",
      coord: {
        lon: -78.497498,
        lat: -9.12417,
      },
    },
  ];

  const [cities, setCities] = useState(basicCities);

  useEffect(() => {
    if (user.loggedIn) {
      setCities(user.favoriteCities);
    }
  }, []);

  return (
    <>
      <SearchBar />
      <h1 className="w-full font-extrabold text-center text-4xl z-10 text-white block">
        Welcome to my weather app!
      </h1>
      <h2 className="font-bold text-center w-full text-2xl text-white z-10 block">
        Search for a city and log in to save it in your favorites
      </h2>
      <div className="h-fit mt-5 grid place-items-center">
        <div
          style={{
            width: "80%",
            backgroundColor: "rgba(128, 128, 128, 0.4)",
            maxHeight: "70vh",
          }}
          className="p-5 rounded-lg overflow-y-scroll"
        >
          {cities.map((city) => {
            return (
              <Forecast
                cityInfo={city}
                title={
                  city.name +
                  (city.state !== "" ? `, ${city.state}` : "") +
                  `, ${city.country}`
                }
                units="metric"
              />
            );
          })}
          {cities.length === 0 ? (
            <h2
              style={{
                marginTop: "25vh",
                marginBottom: "25vh",
              }}
              className="text-red-500 text-center text-4xl font-bold"
            >
              You don't have favorite cities yet. <br /> Search for one and
              click on the heart to add it to favorites.
            </h2>
          ) : null}
        </div>
      </div>
    </>
  );
}
