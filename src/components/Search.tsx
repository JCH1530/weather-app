import React from "react";
import Suggestions from "./Suggestions";
import { locationType } from "../types";
import Header from "./Header";

type searchProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  locationData: locationType[] | null;
  locationClick: (location: locationType) => void;
  searchTerm: string;
};

const Search = ({
  handleSubmit,
  handleChange,
  searchTerm,
  locationClick,
  locationData,
}: searchProps) => {
  return (
    <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700 py-10 my-10">
      <Header />
      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search for a city"
          onChange={handleChange}
          value={searchTerm}
          className="w-full border-2 border-gray-300 rounded-l-lg p-2 text-gray-600 focus:outline-none focus:border-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-400 text-white px-4 py-2 rounded-r-lg hover:bg-blue-500"
        >
          Go
        </button>
      </form>
      <Suggestions locationData={locationData} locationClick={locationClick} />
    </section>
  );
};

export default Search;
