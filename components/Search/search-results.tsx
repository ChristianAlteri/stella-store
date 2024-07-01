"use client";

import * as React from "react";
import axios from "axios"; // Make sure to import axios
import SearchProductImage from "./components/search-product-image";
import { Product } from "@/types";

export interface SearchResultsProps {
  label: string;
  children?: React.ReactNode;
}

const SearchResults: React.FC<SearchResultsProps> = ({ label }) => {
  // const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/mega-search`;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = React.useState<Product[]>([]);
  const [debounceTimeout, setDebounceTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [showAllProducts, setShowAllProducts] = React.useState(false);

  const handleSearch = React.useCallback(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(async () => {
      try {
        const response = await axios.get(`${URL}`, {
          params: { productName: inputRef.current?.value || "" },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    }, 300);

    setDebounceTimeout(timeout);
  }, [URL, debounceTimeout]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="h-[50vh] flex flex-col relative">
        <input
          ref={inputRef}
          placeholder={label}
          onChange={handleSearch}
          className="w-full h-6 border text-xs focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-sm p-3 mb-4"
        />

        <div className="flex flex-col overflow-y-auto max-h-[500px]">
          {searchResults && searchResults.length > 0 && (
            <>
              <div className="grid bg-white rounded-md p-4">
                <div className="grid md:grid-cols-3 grid-cols-2 bg-white rounded-md mt-3">
                  {searchResults.map((product, index) => (
                    <div key={product.id} className="w-full h-full p-1">
                      <SearchProductImage product={product} />
                      <div className="w-full flex flex-row justify-between text-super-small hover:underline hover:cursor-pointer"></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
