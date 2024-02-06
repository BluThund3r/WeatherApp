import React, { useEffect, useState } from "react";
import { UilLocationPoint } from "@iconscout/react-unicons";
import SearchResults from "./SearchResults";
import { apiDomainName } from "../../configConsts";
import CityInfo from "../../interfaces/CityInfo";
import { getCityByCurrentLocation } from "../../services/weatherService";
import { useDispatch } from "react-redux";
import { setCity } from "../../state/cities/citiesSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {};

function SearchBar({}: Props) {
  const [cityLocal, setCityLocal] = useState("");
  const [searchResults, setSearchResults] = useState<CityInfo[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLocationClick = () => {
    toast.info(
      "Getting weather info by current location (this may take a while)..."
    );
    getCityByCurrentLocation()
      .then((cityLocal: CityInfo) => {
        toast.success("Successfully got city by current location");
        navigate(`/weather/${cityLocal.id}`);
      })
      .catch((error) => {
        toast.error("Error getting city by current location" + error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityLocal(e.currentTarget.value);
  };

  const clearSearchBar = () => {
    setCityLocal("");
    setSearchResults([]);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (cityLocal.length < 3) return setSearchResults([]);
      try {
        const response = await fetch(
          `${apiDomainName}/cities/getCitiesStartingWith/${cityLocal}`
        );
        const data = await response.json();

        if (response.ok) setSearchResults(data as CityInfo[]);
        else console.error("Error fetching search results", response, data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResults();
  }, [cityLocal]);

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-1/2 items-start justify-center space-x-4">
        <div className="w-full relative">
          <input
            value={cityLocal}
            onChange={handleChange}
            type="text"
            placeholder="Type in a cityLocal name..."
            className="text-xl font-light text-black p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          />
          <SearchResults
            searchResults={searchResults}
            clearSearchBar={clearSearchBar}
          />
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
