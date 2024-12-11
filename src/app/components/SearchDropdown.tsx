"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSetAtom } from "jotai";

import { listingsAtom } from "../atoms/listingsAtom";
import { cityAtom } from "../atoms/cityAtom";
import { searchBarAtom } from "../atoms/searchBarAtom";

interface SearchableDropdownProps {
  options: string[];
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options }) => {
  const [city, setCity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const setListingsAtom = useSetAtom(listingsAtom);
  const setCityAtom = useSetAtom(cityAtom);
  const setSearchBarAtom = useSetAtom(searchBarAtom);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(city.toLowerCase())
  );

  const handleOptionClick = (option: string) => {
    setCity(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchListings = async () => {
    setSearchBarAtom({ loading: true, error: "" });
    let data;

    try {
      const res = await fetch(`/api/listings?city=${city}`, {
        cache: "no-store",
      });
      data = await res.json();
      console.log({ data });

      if (res.ok) {
        setListingsAtom(data.listings);
        setCityAtom(data.avgPerType);
      } else {
        setError("An error occurred");
      }
    } catch (err) {
      setError("Failed to fetch listings");
    } finally {
      setSearchBarAtom((atom) => ({ ...atom, loading: false }));
    }
  };

  return (
    <div className="flex space-x-4 place-content-center mb-10">
      <div ref={dropdownRef} className="relative w-64">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Buscar ciudad..."
        />
        {isOpen && (
          <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found</li>
            )}
          </ul>
        )}
      </div>
      <button
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={() => fetchListings()}
        disabled={city === "" || loading}
      >
        Buscar!
      </button>
    </div>
  );
};

export default SearchableDropdown;
