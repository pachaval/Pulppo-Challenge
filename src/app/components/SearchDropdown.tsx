"use client";

import React, { useEffect, useRef, useState } from "react";

interface SearchableDropdownProps {
  options: string[];
  placeholder?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  placeholder = "Search by city...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [listings, setListings] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option: string) => {
    setSearchTerm(option);
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
    setLoading(true);
    setError("");
    let listings;

    try {
      const res = await fetch(`/api/listings?city=${searchTerm}`, {
        cache: "no-store",
      });
      listings = await res.json();
      if (res.ok) {
        setListings(listings);
      } else {
        setError("An error occurred");
      }
    } catch (err) {
      console.log({ err });
      setError("Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-4">
      <div ref={dropdownRef} className="relative w-64">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          placeholder={placeholder}
        />
        {isOpen && (
          <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
        disabled={searchTerm === "" || loading}
      >
        Go!
      </button>
      <div>
        {listings?.map((listing: any, i: number) => (
          <span key={i}>
            ${listing?.listing?.price?.price} {listing?.type}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchableDropdown;
