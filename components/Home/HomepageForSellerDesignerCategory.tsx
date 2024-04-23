"use client";

import { useState } from "react";
import CategoryCard from "../ui/category-card";
import { Category, Designer, Seller } from "@/types";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

interface HomepageForSellerDesignerCategoryProps {
  data: Category[] | Seller[] | Designer[];
  route: string;
  routeOne: string;
  routeTwo: string;
}

const HomepageForSellerDesignerCategory: React.FC<
  HomepageForSellerDesignerCategoryProps
> = ({ data, route, routeOne, routeTwo }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState("");

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      // If search is empty, reset to the original data
      setFilteredData(data);
    } else {
      // Otherwise, filter categories based on the search term
      const localFiltered = data.filter((category) =>
        category.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(localFiltered);
    }
  };
  

  const sortMostPopular = () => {
    const localFiltered = [...filteredData].sort((a, b) => {
      const totalLikesA = a.products.reduce(
        //@ts-ignore
        (acc, product) => acc + product.likes,
        0
      );
      const totalLikesB = b.products.reduce(
        //@ts-ignore
        (acc, product) => acc + product.likes,
        0
      );
      return totalLikesB - totalLikesA;
    });
    setFilteredData(localFiltered);
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
        className="flex flex-col items-center justify-center text-center w-full p-1 min-h-screen"
        style={{
          backgroundImage: filteredData && filteredData.length > 0 && filteredData[0].billboard && filteredData[0].billboard.imageUrl
          ? `url(${filteredData[0].billboard.imageUrl})`
          : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="flex flex-row text-xl w-2/3 justify-center items-center text-center mt-8 border p-3 text-light-font bg-light-background rounded-md">
            {route.toUpperCase()}
          </h1>
          <div className="w-1/2 flex flex-row justify-between items-center text-sm mt-3 text-light-font">
            <Link
                href={`${routeOne}`}
                className="p-1 hover:underline hover:cursor-pointer bg-light-background"
              >{routeOne.toUpperCase()}
            </Link>
            <Link
                href={`${routeTwo}`}
                className="p-1 hover:underline hover:cursor-pointer bg-light-background"
              >{routeTwo.toUpperCase()}
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center w-full p-1">
          <div className="grid row-span-4">
            <div className="flex justify-center items-center text-center flex-col row-span-1 gap-2 p-5">
              <div className="flex flex-row gap-1 justify-center items-center">
                <CiSearch />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-2/3"
                  onChange={handleSearch}
                />
              </div>
              <div className="flex flex-row text-xs justify-center items-center text-center gap-3 mt-4">
                <h1 className="flex flex-row justify-center hover:underline hover:cursor-pointer bg-light-background">
                  Sort by:{" "}
                </h1>
                <div
                  className="flex flex-row justify-center hover:underline hover:cursor-pointer bg-light-background"
                  onClick={sortMostPopular}
                >
                  Most Popular
                </div>
                <div
                  className="flex flex-row justify-center hover:underline hover:cursor-pointer bg-light-background"
                  onClick={sortAverageLowestPrice}
                >
                  Lowest Prices
                </div>
                <div
                  className="flex flex-row justify-center hover:underline hover:cursor-pointer bg-light-background"
                  onClick={sortAverageHighestPrice}
                >
                  Highest Prices
                </div>
              </div>
            </div>

            <div className="row-span-3">
              <div className="md:grid-cols-2 w-full gap-4 grid items-center text-center justify-center">
                {filteredData.map((data) => (
                  <CategoryCard
                    route={route}
                    key={data.name}
                    id={data.id}
                    data={data}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageForSellerDesignerCategory;
