import React, { useEffect, useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import SearchResults from "./SearchResults";
import { apiDomainName } from "../../configConsts";
import CityInfo from "../../interfaces/CityInfo";

type Props = {};

function SearchBar({}: Props) {
  const [city, setCity] = useState("");
  const [searchResults, setSearchResults] = useState<CityInfo[]>([]);

  const handleSearchClick = () => {
    console.log("search clicked");
  };

  const handleLocationClick = () => {
    console.log("location clicked");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (city.length < 3) return setSearchResults([]);
      try {
        const response = await fetch(
          `${apiDomainName}/cities/getCitiesStartingWith/${city}`
        );
        const data = await response.json();

        if (response.ok) setSearchResults(data as CityInfo[]);
        else console.error("Error fetching search results", response, data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResults();
  }, [city]);

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-1/2 items-start justify-center space-x-4">
        <div className="w-full relative">
          <input
            value={city}
            onChange={handleChange}
            type="text"
            placeholder="Type in a city name..."
            className="text-xl font-light text-black p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          />
          <SearchResults searchResults={searchResults} />
        </div>
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125 mt-2"
          onClick={handleLocationClick}
        />
      </div>
    </div>
  );
}

export default SearchBar;
