import React from "react";
import { SearchResultType } from "./SearchBar";

type Props = { searchResults: SearchResultType[] };

function SearchResults({ searchResults }: Props) {
  const handleClick = (id: number) => {
    console.log("clicked", id);
  };

  return (
    <div className="mt-1 max-h-52 overflow-y-scroll w-full flex flex-col bg-white absolute">
      {searchResults.map((result, index) => (
        <p
          key={index}
          className="p-1 text-black hover:cursor-pointer hover:bg-slate-300"
          onClick={() => handleClick(result.id)}
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
