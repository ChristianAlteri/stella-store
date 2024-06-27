"use client";
import * as React from "react";
import axios from "axios";
import { Category, Designer, Seller, Product } from "@/types";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Link from "next/link";

import { CiSliderHorizontal } from "react-icons/ci";
import SearchProductImage from "./components/search-product-image";

export interface MegaSearchInputAndResultsProps {
  label: string;
  children?: React.ReactNode;
  name: string;
}

const MegaSearchInputAndResults: React.FC<MegaSearchInputAndResultsProps> = ({
  label,
  name,
}) => {
  const [filteredData, setFilteredData] = React.useState<
    Seller[] | Category[] | Designer[] | Product[] | undefined
  >([]);
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/mega-search`;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchedData, setSearchedData] = React.useState<
    | {
        sellers: Seller[];
        designers: Designer[];
        categories: Category[];
        products: Product[];
      }
    | undefined
  >(undefined);
  const [debounceTimeout, setDebounceTimeout] = React.useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [showAllProducts, setShowAllProducts] = React.useState(false);

  function isSeller(item: Seller | Category): item is Seller {
    return (item as Seller).instagramHandle !== undefined;
  }

  const filteredDataByPrice = (
    data: Seller[] | Category[] | Designer[] | Product[],
    sortOrder: "low-to-high" | "high-to-low"
  ) => {
    const filteredData = data
      .map((item: any) => {
        let sortedProducts;
        switch (sortOrder) {
          case "low-to-high":
            sortedProducts = item.products.sort(
              (a: any, b: any) =>
                parseFloat(a.ourPrice) - parseFloat(b.ourPrice)
            );
            break;
          case "high-to-low":
            sortedProducts = item.products.sort(
              (a: any, b: any) =>
                parseFloat(b.ourPrice) - parseFloat(a.ourPrice)
            );
            break;
          default:
            throw new Error("Invalid sort order");
        }
        const totalPrice = sortedProducts.reduce(
          (acc: any, product: any) => acc + parseFloat(product.ourPrice),
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
        setSearchedData(undefined);
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
          {searchedData && (
            <div className="grid bg-white rounded-md ">
              <div className="flex flex-row justify-center items-center text-center gap-2 m-1">
                <p className="text-xs p-1">{name}</p>
              </div>

              {/* Display Sellers */}
              {searchedData.sellers.length > 0 && (
                <div>
                  <h3>Sellers</h3>
                  {searchedData.sellers.map((seller) => (
                    <div
                      key={seller.id}
                      className="flex flex-col justify-center gap-1 m-1"
                    >
                      <Link href={`/sellers/${seller.id}`}>
                        <p className="text-xs hover:underline hover:cursor-pointer">
                          {seller.instagramHandle.toUpperCase()}
                        </p>
                      </Link>
                      <div className="w-full flex flex-row justify-between rounded-md p-1 bg-light-background text-light-font text-super-small hover:underline hover:cursor-pointer">
                        <button
                          className="text-xs hover:underline hover:cursor-pointer"
                          onClick={() => setShowAllProducts(!showAllProducts)}
                        >
                          {showAllProducts ? "Hide All" : "Show All"}
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
                                      searchedData.sellers,
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
                                      searchedData.sellers,
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
                          ? seller.products.map((item) => (
                              <div key={item.id} className="w-full h-full p-1">
                                <SearchProductImage product={item} />
                              </div>
                            ))
                          : seller.products.slice(0, 3).map((item) => (
                              <div key={item.id} className="w-full h-full p-1">
                                <SearchProductImage product={item} />
                              </div>
                            ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Display Designers */}
              {searchedData.designers.length > 0 && (
                <div>
                  <h3>Designers</h3>
                  {searchedData.designers.map((designer) => (
                    <div
                      key={designer.id}
                      className="flex flex-col justify-center gap-1 m-1"
                    >
                      <Link href={`/designers/${designer.id}`}>
                        <p className="text-xs hover:underline hover:cursor-pointer">
                          {designer.name.toUpperCase()}
                        </p>
                      </Link>
                      <div className="w-full flex flex-row justify-between rounded-md p-1 bg-light-background text-light-font text-super-small hover:underline hover:cursor-pointer">
                        <button
                          className="text-xs hover:underline hover:cursor-pointer"
                          onClick={() => setShowAllProducts(!showAllProducts)}
                        >
                          {showAllProducts ? "Hide All" : "Show All"}
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
                                      searchedData.designers,
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
                                      searchedData.designers,
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
                          ? designer.products.map((item) => (
                              <div key={item.id} className="w-full h-full p-1">
                                <SearchProductImage product={item} />
                              </div>
                            ))
                          : designer.products.slice(0, 3).map((item) => (
                              <div key={item.id} className="w-full h-full p-1">
                                <SearchProductImage product={item} />
                              </div>
                            ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Display Categories */}
              {searchedData.categories.length > 0 && (
                <div>
                  <h3>Categories</h3>
                  {searchedData.categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex flex-col justify-center gap-1 m-1"
                    >
                      <Link href={`/categories/${category.id}`}>
                        <p className="text-xs hover:underline hover:cursor-pointer">
                          {category.name.toUpperCase()}
                        </p>
                      </Link>
                      <div className="w-full flex flex-row justify-between rounded-md p-1 bg-light-background text-light-font text-super-small hover:underline hover:cursor-pointer">
                        <button
                          className="text-xs hover:underline hover:cursor-pointer"
                          onClick={() => setShowAllProducts(!showAllProducts)}
                        >
                          {showAllProducts ? "Hide All" : "Show All"}
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
                                      searchedData.categories,
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
                                      searchedData.categories,
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
                          ? category.products.map((item) => (
                              <div key={item.id} className="w-full h-full p-1">
                                <SearchProductImage product={item} />
                              </div>
                            ))
                          : category.products.slice(0, 3).map((item) => (
                              <div key={item.id} className="w-full h-full p-1">
                                <SearchProductImage product={item} />
                              </div>
                            ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MegaSearchInputAndResults;
