import React from "react";
import CityInfo from "../../interfaces/CityInfo";

type Props = { searchResults: CityInfo[] };

function SearchResults({ searchResults }: Props) {
  const handleClick = (city: CityInfo) => {
    console.log("clicked", city.name);
  };

  return (
    <div className="mt-1 max-h-52 overflow-y-scroll w-full flex flex-col bg-white absolute">
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
  );
}

export default SearchResults;
