"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { operationRadioAtom } from "../atoms/operationRadioAtom";
import { searchBarAtom } from "../atoms/searchBarAtom";
import { listingsAtom } from "../atoms/listingsAtom";
import { cityAtom } from "../atoms/cityAtom";
import OperationRadio from "./OperationRadio";

interface SearchableDropdownProps {
  options: string[];
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options }) => {
  const [{ loading }, setSearchBarAtom] = useAtom(searchBarAtom);
  const { operation } = useAtomValue(operationRadioAtom);
  const setListingsAtom = useSetAtom(listingsAtom);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const setCityAtom = useSetAtom(cityAtom);
  const [city, setCity] = useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(city.toLowerCase())
  );

  const handleOptionClick = (option: string) => {
    setIsOpen(false);
    setCity(option);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Paco! Aca justo tuve que aplicar la cleanup function que hablamos el otro día
  // que hace las veces del willUnmount
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
      const res = await fetch(
        `/api/listings?city=${city}&operation=${operation}`,
        {
          cache: "no-store",
        }
      );
      data = await res.json();

      if (res.ok) {
        setListingsAtom(data.listings);
        setCityAtom(data.avgPerType);
      } else {
        setSearchBarAtom((atom) => ({
          ...atom,
          error: "An error occurred",
        }));
      }
    } catch (err) {
      setSearchBarAtom((atom) => ({
        ...atom,
        error: "Failed to fetch listings",
      }));
    } finally {
      setSearchBarAtom((atom) => ({ ...atom, loading: false }));
    }
  };

  return (
    <div className="flex space-x-4 place-content-center mb-10">
      <div ref={dropdownRef} className="relative w-64">
        <div className="relative">
          <input
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setCity(e.target.value)}
            disabled={options.length === 0}
            onFocus={() => setIsOpen(true)}
            placeholder="Buscar ciudad..."
            value={city}
            type="text"
          />
          <div
            className="absolute inset-y-0 left-0 pl-3 
                    flex items-center 
                    pointer-events-none"
          >
            <p className="mr-5 text-xl">🇲🇽</p>
          </div>
        </div>
        {isOpen && (
          <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                  key={index}
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
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        disabled={city === "" || loading}
        onClick={() => fetchListings()}
        type="button"
      >
        Buscar!
      </button>
      <OperationRadio />
    </div>
  );
};

export default SearchableDropdown;
