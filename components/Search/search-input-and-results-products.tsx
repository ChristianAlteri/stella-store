import * as React from "react";
import axios from "axios"; // Make sure to import axios
import SearchProductImage from "./components/search-product-image";
import { Product } from "@/types";
import NavbarScrollingBanner from "../NavBar/navbar-scrolling-banner";

export interface SearchInputAndResultsProductsProps {
  label: string;
  children?: React.ReactNode;
}

const SearchInputAndResultsProducts: React.FC<
  SearchInputAndResultsProductsProps
> = ({ label }) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = React.useState<Product[]>([]);
  const [debounceTimeout, setDebounceTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);
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
          className="w-full h-7 border text-xs focus:outline-none focus:ring-2 focus:ring-light-font focus:border-transparent rounded-md p-3"
        />
        <div className="flex flex-col flex-grow">
          {searchResults && searchResults.length > 0 && (
            <div className="grid md:grid-cols-3 grid-cols-2 bg-white rounded-md mt-3">
              {searchResults.map((product, index) => (
                <div key={product.id} className="w-full h-full p-1">
                  <SearchProductImage key={product.id} product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bottom-0 w-full p-1 bg-white">
        <NavbarScrollingBanner
          text="Enjoy a 20% off your first purchase by"
          underlinedText="creating an account."
          link="/register"
        />
      </div>
    </>
  );
};

export default SearchInputAndResultsProducts;