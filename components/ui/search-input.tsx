import * as React from "react";
import axios from "axios"; // Make sure to import axios
import { Category, Color, Designer, Seller, Size } from "@/types";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactPlayer from "react-player";
import Link from "next/link";

import { CiSliderHorizontal } from "react-icons/ci";
import ProductList from "../Home/product-list";

interface SearchResultItem {
  id: number | string; // Use the correct type for your id
  name: string;
  images: { url: string }[];
}

export interface SearchInputProps {
  sizes?: Size[];
  colors?: Color[];
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
  label: string;
  children?: React.ReactNode;
}

const SearchInput: React.FC<SearchInputProps> = ({
  sizes,
  colors,
  designers,
  categories,
  sellers,
  label,
  children,
}) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
  const [modalOpen, setModalOpen] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const router = useRouter();

  const [searchResults, setSearchResults] = React.useState<SearchResultItem[]>(
    []
  );
  const [filteredSellers, setFilteredSellers] = React.useState<
    Seller[] | undefined
  >([]);
  console.log("filteredSellers", filteredSellers);
  //try to filter sellers by the price of their products
  const filteredSellersByPrice = (sellers: Seller[]) => {
    const filteredSellers = sellers.map((seller) => {
      // Sort products by ourPrice
      const sortedProducts = seller.products.sort(
        (a, b) => parseFloat(a.ourPrice) - parseFloat(b.ourPrice)
      );
      // Calculate total price
      const totalPrice = sortedProducts.reduce(
        (acc, product) => acc + parseFloat(product.ourPrice),
        0
      );
      // Calculate average price (totalPrice divided by the number of products)
      const averagePrice = sortedProducts.length > 0 ? totalPrice / sortedProducts.length : 0;
      // Log average price for each seller
      console.log(`Average price for seller ${seller.name}: ${averagePrice.toFixed(2)}`);
      return {
        ...seller,
        products: sortedProducts,
        averagePrice // Store the average price with each seller
      };
    }).sort((a, b) => b.averagePrice - a.averagePrice); // Sort sellers by average price in descending order
  
    console.log("filteredSellersByAveragePrice", filteredSellers);
    setFilteredSellers(filteredSellers); // Update the state to re-render the UI
    return filteredSellers; // You may not need to return this for React, but kept for consistency
  };

  const handleSearch = () => {
    setSearchQuery(inputRef.current?.value || "");
  };

  // TODO: Add category, designer, and seller search front end

  const handleProductClick = (product: any) => {
    router.push(
      `/product/${product?.category?.id}/${product?.designer?.name}/${product?.id}/${product?.seller?.instagramHandle}`
    );
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (searchQuery) {
      // Filter sellers
      setFilteredSellers(
        sellers?.filter((seller) =>
          seller.instagramHandle.includes(searchQuery)
        )
      );


      const fetchData = async () => {
        try {
          const response = await axios.get(`${URL}`, {
            params: {
              productName: searchQuery,
            },
          });
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        }
      };
      fetchData();
    }
  }, [searchQuery, sellers, URL]);

  return (
    <>
      <input
        ref={inputRef}
        placeholder={label}
        onChange={handleSearch}
        className="flex text-xs flex-row w-full justify-between items-center h-6 border-b gap-1"
      />
      <div>
        {searchResults && searchResults.length > 0 && (
          <div className="bg-white rounded-md">
            {searchResults.map((product, index) => (
              <div className="" key={`${product.id}-${index}`}>
                <p
                  className="text-xs p-10"
                  onClick={() => handleProductClick(product)}
                >
                  {product.name}
                </p>
                  <img height={20} width={20} src={product.images[0].url} alt="image" />
                {/* TODO: style */}
              </div>
            ))}
          </div>
        )}
      </div>

      {filteredSellers && filteredSellers.length >= 1 && (
        // title and refine filter
        <div className="bg-white rounded-md flex flex-col overflow-hidden w-full mt-5">
          <div className="flex flex-row justify-between items-center text-center gap-2 m-1">
            <p className="text-xs ">SELLERS</p>
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
                  <MenuItem className="hover:underline hover:cursor-pointer"
                  onClick={() => setFilteredSellers(filteredSellersByPrice(filteredSellers))}
                  >
                    High-Low
                  </MenuItem>
                  <MenuItem className="hover:underline hover:cursor-pointer"
                  
                  >
                    Low-High
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
          {filteredSellers?.map((seller, index) => (
            <>
              <div className="flex flex-row justify-center gap-3 m-1" >
                <Link href={`/sellers/${seller?.id}`}>
                  {" "}
                  <p className="text-xs hover:underline hover:cursor-pointer">
                    {seller.instagramHandle.toUpperCase()}
                  </p>
                </Link>
              </div>
              <div
                className="grid grid-flow-col w-full overflow-x-auto m-1"
                key={seller.id}
              >
                {seller.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex rounded-md flex-col items-start justify-start leading-normal p-2"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <div className="flex flex-col w-full leading-normal">
                      <p
                        className="text-xs hover:underline"
                        onClick={() => handleProductClick(product)}
                      >
                        {product.name}
                      </p>
                      <Image
                        className="hover:cursor-pointer"
                        onClick={() => handleProductClick(product)}
                        height={50}
                        width={50}
                        src={product.images[0].url}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchInput;
