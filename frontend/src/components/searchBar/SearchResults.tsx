import React from "react";
import CityInfo from "../../interfaces/CityInfo";
import { useDispatch } from "react-redux";
import { setCity } from "../../state/cities/citiesSlice";
import { useNavigate } from "react-router-dom";

type Props = { searchResults: CityInfo[]; clearSearchBar: () => void };

function SearchResults({ searchResults, clearSearchBar }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (city: CityInfo) => {
    clearSearchBar();
    dispatch(setCity(city));
    navigate(`/weather/${city.id}`);
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="mt-1 max-h-52 overflow-y-scroll w-full flex flex-col bg-white absolute z-10">
        {searchResults.map((result, index) => (
          <p
            key={index}
            className="p-1 text-black hover:cursor-pointer hover:bg-slate-300"
            onClick={() => handleClick(result)}
          >
            {result.name}
            {result.state && `, ${result.state}`}
            {`, ${result.country}`}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
