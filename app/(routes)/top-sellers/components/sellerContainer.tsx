"use client";

import { useState } from "react";
import { Seller } from "@/types";
import { CiHeart, CiSearch } from "react-icons/ci";
import SellerCard from "./single-seller-card";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SellerContainerProps {
  sellerData: Seller[];
}

const SellerContainer: React.FC<SellerContainerProps> = ({ sellerData }) => {
  const [filteredData, setFilteredData] = useState(sellerData);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("mostPopular");

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setFilteredData(sellerData);
    } else {
      const localFiltered = sellerData.filter((data) =>
        data.instagramHandle.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(localFiltered);
    }
  };

  const sortAverageLowestPrice = () => {
    const localFiltered = [...filteredData].sort((a, b) => {
      const avgLowestPriceA =
        a.products.reduce((acc, product) => {
          const price = parseFloat(product.ourPrice) || 0;
          return acc + price;
        }, 0) / (a.products.length || 1);

      const avgLowestPriceB =
        b.products.reduce((acc, product) => {
          const price = parseFloat(product.ourPrice) || 0;
          return acc + price;
        }, 0) / (b.products.length || 1);

      return avgLowestPriceA - avgLowestPriceB;
    });
    setFilteredData(localFiltered);
    setSelectedFilter("lowestPrice");
  };

  const sortAverageHighestPrice = () => {
    const localFiltered = [...filteredData].sort((a, b) => {
      const avgHighestPriceA =
        a.products.reduce((acc, product) => {
          const price = parseFloat(product.ourPrice) || 0;
          return acc + price;
        }, 0) / (a.products.length || 1);

      const avgHighestPriceB =
        b.products.reduce((acc, product) => {
          const price = parseFloat(product.ourPrice) || 0;
          return acc + price;
        }, 0) / (b.products.length || 1);

      return avgHighestPriceB - avgHighestPriceA;
    });
    setFilteredData(localFiltered);
    setSelectedFilter("highestPrice");
  };
  const sortHighestSellerCount = () => {
    const localFiltered = [...filteredData].sort(
      (a, b) => b.soldCount - a.soldCount
    );
    setFilteredData(localFiltered);
    setSelectedFilter("mostPopular");
  };

  // Auto sorts to most popular
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center col-span-4 w-full">
        {/* search and filter */}
        <div className="flex justify-center items-center text-center flex-col row-span-1 gap-2 w-full">
          <div className="flex flex-row items-center justify-center w-full gap-2 p-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`text-xs flex flex-row justify-center hover:cursor-pointer w-full ${
                      selectedFilter === "lowestPrice"
                        ? "underline"
                        : "hover:underline"
                    }`}
                    onClick={sortAverageLowestPrice}
                  >
                    <div className="flex flex-row justify-center items-center gap-1">
                      LOWEST PRICES
                      <p>
                        <FiArrowDown size={17} />
                      </p>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Seller who on average has the lowest prices</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`text-xs flex flex-row justify-center hover:cursor-pointer w-full ${
                      selectedFilter === "mostPopular"
                        ? "underline"
                        : "hover:underline"
                    }`}
                    onClick={sortHighestSellerCount}
                  >
                    <div className="flex flex-row justify-center items-center gap-1">
                      MOST POPULAR
                      <CiHeart size={17} />
                      {/* <p><FiArrowUp size={17}/></p> */}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Seller with the most sales</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`text-xs flex flex-row justify-center hover:cursor-pointer w-full ${
                      selectedFilter === "highestPrice"
                        ? "underline"
                        : "hover:underline"
                    }`}
                    onClick={sortAverageHighestPrice}
                  >
                    <div className="flex flex-row justify-center items-center gap-1">
                      HIGHEST PRICES
                      <p>
                        <FiArrowUp size={17} />
                      </p>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Seller who on average has the highest prices</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-row gap-1 justify-center items-center border rounded-md mt-1">
            <CiSearch />
            <input
              type="text"
              placeholder="Search sellers..."
              className="w-2/3"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="md:grid-cols-3 w-full gap-2 grid items-center text-center justify-center mt-4">
          {filteredData.map((data) => (
            <SellerCard key={data.id} id={data.id} data={data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SellerContainer;
