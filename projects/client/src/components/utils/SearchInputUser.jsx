import React, { useState } from "react";
import { GrSearch } from "react-icons/gr";
import { useLocation } from "react-router-dom";

function SearchInputUser({ setSearchInput }) {
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleSearch = () => {
    setSearchInput(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="form-control flex flex-row lg:items-center relative gap-3 p-3">
      {/* <div className="hidden sm:block">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-40 sm:w-96 lg:w-[600px] xl:w-[800px]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div> */}
      <div className="self-end hover:cursor-pointer">
        <GrSearch className="text-md" />
      </div>

      {/* {isHomePage ? null : ( // Conditionally render the button
        <div>
          <button
            className="btn btn-primary"
            onClick={handleSearch}
            aria-label="Search"
          >
            Search
          </button>
        </div>
      )} */}
    </div>
  );
}
export default SearchInputUser;
