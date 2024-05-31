"use client";

import { useState } from "react";
import { Seller } from "@/types";
import { CiSearch } from "react-icons/ci";
import SellerCard from "./single-seller-card";

interface SellerContainerProps {
  sellerData: Seller[];
}

const SellerContainer: React.FC<SellerContainerProps> = ({ sellerData }) => {
  const [filteredData, setFilteredData] = useState(sellerData);
  const [search, setSearch] = useState("");

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
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center text-center col-span-4 w-full"
        // style={{
        //   backgroundImage:
        //     filteredData &&
        //     filteredData.length > 0 &&
        //     filteredData[0].billboard &&
        //     filteredData[0].billboard.imageUrl
        //       ? `url(${filteredData[0].billboard.imageUrl})`
        //       : "none",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
      >


            {/* search and filter */}
            <div className="flex justify-center items-center text-center flex-col row-span-1 gap-2 ">
              <div className="flex flex-row gap-1 justify-center items-center border rounded-md mt-1">
                <CiSearch />
                <input
                  type="text"
                  placeholder="Search sellers..."
                  className="w-2/3"
                  onChange={handleSearch}
                />
              </div>
              <div className="flex flex-row text-xs justify-center items-center text-center gap-3 mt-1">
                <h1 className="flex flex-row justify-center">
                  Sort by:{" "}
                </h1>
                {/* <div
                  className="flex flex-row justify-center hover:underline hover:cursor-pointer"
                  onClick={sortMostPopular}
                >
                  Most Popular
                </div> */}
                <div
                  className="flex flex-row justify-center hover:underline hover:cursor-pointer"
                  onClick={sortAverageLowestPrice}
                >
                  Lowest Prices
                </div>
                <div
                  className="flex flex-row justify-center hover:underline hover:cursor-pointer"
                  onClick={sortAverageHighestPrice}
                >
                  Highest Prices
                </div>
              </div>
            </div>


                <div className="md:grid-cols-2 w-full gap-2 grid items-center text-center justify-center mt-4">
                {filteredData.map((data) => (
                    <SellerCard
                    key={data.name}
                    id={data.id}
                    data={data}
                    />
                ))}
            </div>
          </div>

    </>
  );
};

export default SellerContainer;
