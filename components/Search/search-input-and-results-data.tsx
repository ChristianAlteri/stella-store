import * as React from "react";
import axios from "axios"; // Make sure to import axios
import { Category, Designer, Seller } from "@/types";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Link from "next/link";

import { CiSliderHorizontal } from "react-icons/ci";
import SearchProductImage from "./components/search-product-image";
import NavbarScrollingBanner from "../NavBar/navbar-scrolling-banner";

export interface SearchInputAndResultsDataProps {
  label: string;
  children?: React.ReactNode;
  route: string;
  flag: string;
  name: string;
}

const SearchInputAndResultsData: React.FC<SearchInputAndResultsDataProps> = ({
  label,
  children,
  route,
  flag,
  name,
}) => {
  const [filteredData, setFilteredData] = React.useState<
    Seller[] | Category[] | Designer[] | undefined
  >([]);
  const URL = `${process.env.NEXT_PUBLIC_API_URL}${route}`;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchedData, setSearchedData] = React.useState<
    Seller[] | Category[] | Designer[] | undefined
  >([]);
  const [debounceTimeout, setDebounceTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [showAllProducts, setShowAllProducts] = React.useState(false);


  function isSeller(item: Seller | Category): item is Seller {
    return (item as Seller).instagramHandle !== undefined;
  }

  const filteredDataByPrice = (
    data: Seller[] | Category[] | Designer[],
    sortOrder: "low-to-high" | "high-to-low"
  ) => {
    const filteredData = data
      .map((item) => {
        let sortedProducts;
        switch (sortOrder) {
          case "low-to-high":
            sortedProducts = item.products.sort(
              (a, b) => parseFloat(a.ourPrice) - parseFloat(b.ourPrice)
            );
            break;
          case "high-to-low":
            sortedProducts = item.products.sort(
              (a, b) => parseFloat(b.ourPrice) - parseFloat(a.ourPrice)
            );
            break;
          default:
            throw new Error("Invalid sort order");
        }
        const totalPrice = sortedProducts.reduce(
          (acc, product) => acc + parseFloat(product.ourPrice),
          0
        );
        const averagePrice =
          sortedProducts.length > 0 ? totalPrice / sortedProducts.length : 0;
        console.log(
          `Average price for ${item.name}: ${averagePrice.toFixed(2)}`
        );
        return { ...item, products: sortedProducts, averagePrice };
      })
      .sort((a, b) => b.averagePrice - a.averagePrice);
    setFilteredData(filteredData);
    return filteredData;
  };

  const handleSearch = React.useCallback(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(async () => {
      try {
        const response = await axios.get(`${URL}`, {
          params: { name: inputRef.current?.value || "" },
        });
        setSearchedData(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchedData([]);
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
          {searchedData && searchedData.length > 0 && (
            <div className="grid bg-white rounded-md ">
              <div className="flex flex-row justify-center items-center text-center gap-2 m-1">
                <p className="text-xs p-1">{name}</p>
              </div>

              {searchedData.map((parentData, index) => (
                <React.Fragment key={parentData.id}>
                  <div className="flex flex-col justify-center gap-1 m-1">
                    <div>
                      <Link href={`${route}/${parentData.id}`}>
                        <p className="text-xs hover:underline hover:cursor-pointer">
                          {isSeller(parentData)
                            ? flag === "seller"
                              ? parentData.instagramHandle.toUpperCase()
                              : parentData.name.toUpperCase()
                            : parentData.name.toUpperCase()}
                        </p>
                      </Link>
                      
                    </div>
                    <div className="w-full flex flex-row justify-between rounded-md p-1 bg-light-background text-light-font text-super-small hover:underline hover:cursor-pointer">
                      <button
                        className="text-xs hover:underline hover:cursor-pointer"
                        onClick={() => setShowAllProducts(!showAllProducts)}
                      >
                        {showAllProducts
                          ? "Hide All Products"
                          : "Show All Products"}
                      </button>
                      <div className="text-xs">
                        <Menu autoSelect={true} isLazy>
                          <MenuButton
                            as="div"
                            className="flex flex-row justify-between"
                            transition="all 0.2s"
                          >
                            <CiSliderHorizontal size={15} />
                          </MenuButton>
                          <MenuList background="white">
                            <MenuItem
                              className="hover:underline hover:cursor-pointer"
                              onClick={() =>
                                setFilteredData(
                                  filteredDataByPrice(
                                    searchedData,
                                    "high-to-low"
                                  )
                                )
                              }
                            >
                              High-Low
                            </MenuItem>
                            <MenuItem
                              className="hover:underline hover:cursor-pointer"
                              onClick={() =>
                                setFilteredData(
                                  filteredDataByPrice(
                                    searchedData,
                                    "low-to-high"
                                  )
                                )
                              }
                            >
                              Low-High
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-2 bg-white rounded-md">
                      {showAllProducts
                        ? parentData.products.map((item, index) => (
                            <div key={item.id} className="w-full h-full p-1">
                              <SearchProductImage product={item} />
                            </div>
                          ))
                        : parentData.products.slice(0, 3).map((item, index) => (
                            <div key={item.id} className="w-full h-full p-1">
                              <SearchProductImage product={item} />
                            </div>
                          ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
      {!showAllProducts ?
      <div className="bottom-0 w-full p-1 bg-white">
        <NavbarScrollingBanner
          text="Enjoy a 20% off your first purchase by"
          underlinedText="creating an account."
          link="/for-you"
        />
      </div>
      : null}
    </>
  );
};

export default SearchInputAndResultsData;
