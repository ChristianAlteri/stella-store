import * as React from "react";
import axios from "axios"; // Make sure to import axios
import { Category, Designer, Seller } from "@/types";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";

import { CiSliderHorizontal } from "react-icons/ci";
import SearchProductImage from "./components/search-product-image";
import NavbarScrollingBanner from "../NavBar/navbar-scrolling-banner";

export interface SearchInputAndResultsSellersProps {
  label: string;
  children?: React.ReactNode;
}

const SearchInputAndResultsSellers: React.FC<
  SearchInputAndResultsSellersProps
> = ({ label, children }) => {
  const [showAllProducts, setShowAllProducts] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [filteredData, setFilteredData] = React.useState<Seller[] | Category[] | Designer[] | undefined>([]);
  const SELLER_URL = `${process.env.NEXT_PUBLIC_API_URL}/sellers`;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchedSellers, setSearchedSellers] = React.useState<Seller[] | undefined>([]);
  const [debounceTimeout, setDebounceTimeout] = React.useState<ReturnType<typeof setTimeout> | null>(null);


  //try to filter sellers by the price of their products
  const filteredDataByPrice = (data: Seller[] | Category[] | Designer[]) => {
    const filteredData = data
      .map((item) => {
        // Sort products by ourPrice
        const sortedProducts = item.products.sort(
          (a, b) => parseFloat(a.ourPrice) - parseFloat(b.ourPrice)
        );
        // Calculate total price
        const totalPrice = sortedProducts.reduce(
          (acc, product) => acc + parseFloat(product.ourPrice),
          0
        );
        // Calculate average price (totalPrice divided by the number of products)
        const averagePrice =
          sortedProducts.length > 0 ? totalPrice / sortedProducts.length : 0;
        // Log average price for each seller
        alert(`Average price for ${item.name}: ${averagePrice.toFixed(2)}`);  
        console.log(
          `Average price for ${item.name}: ${averagePrice.toFixed(2)}`
        );
        return {
          ...item,
          products: sortedProducts,
          averagePrice, // Store the average price with each seller
        };
      })
      .sort((a, b) => b.averagePrice - a.averagePrice); // Sort sellers by average price in descending order

    setFilteredData(filteredData); // Update the state to re-render the UI
    return filteredData; // You may not need to return this for React, but kept for consistency
  };

  const handleSearch = React.useCallback(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(async () => {
      try {
        const response = await axios.get(`${SELLER_URL}`, {
          params: { name: inputRef.current?.value || "" },
        });
        setSearchedSellers(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchedSellers([]);
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
          {searchedSellers && searchedSellers.length >= 1 && (
            <div className="grid bg-white rounded-md mt-3">
              <div className=" flex-row justify-between items-center text-center gap-2 m-1">
                <p className="text-xs">SELLERS</p>
              </div>

              {searchedSellers?.map((seller, index) => (
                <>
                  <div
                    key={seller?.id} className="flex-row justify-center gap-3 m-1">
                    <Link href={`/sellers/${seller?.id}`}>
                      {" "}
                      <p className="text-xs hover:underline hover:cursor-pointer">
                        {seller.instagramHandle.toUpperCase()}
                      </p>
                    </Link>
                    <div
                      className="w-full justify-between flex rounded-md p-1 bg-light-background text-light-font text-super-small hover:underline hover:cursor-pointer"
                      onClick={() =>
                        setShowAllProducts({
                          ...showAllProducts,
                          [seller.id]: true,
                        })
                      }
                    >
                      Show all products
                      <div className="text-xs">
                        <Menu autoSelect={true} isLazy>
                          <MenuButton
                            className="flex flex-row justify-between"
                            transition="all 0.2s"
                            flexDirection={"row"}
                          >
                            <CiSliderHorizontal
                              className=" flex flex-row w-4 h-4"
                              size={15}
                            />
                          </MenuButton>
                          <MenuList background={"white"}>
                            <MenuItem className="hover:underline hover:cursor-pointer">
                              High-Low
                            </MenuItem>
                            <MenuItem
                              className="hover:underline hover:cursor-pointer"
                              onClick={() =>
                                setFilteredData(
                                  filteredDataByPrice(searchedSellers)
                                )
                              }
                            >
                              Low-High
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    </div>
                    <div
                      className="grid md:grid-cols-3 grid-cols-2 bg-white rounded-md mt-3"
                      key={seller.id}
                    >
                      {seller.products.map((product, index) => {
                        if (!showAllProducts[seller.id] && index >= 3) {
                          return null;
                        }

                        return (
                          <div key={product.id} className="w-full h-full p-1">
                            <SearchProductImage
                              key={product.id}
                              product={product}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
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

export default SearchInputAndResultsSellers;
