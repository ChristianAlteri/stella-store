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
} from '@chakra-ui/react'
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactPlayer from "react-player";
import Link from "next/link";

import { CiSliderHorizontal } from "react-icons/ci";

interface SearchResultItem {
  id: number | string; // Use the correct type for your id
  name: string;
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

  const [searchResults, setSearchResults] = React.useState<SearchResultItem[]>(
    []
  );
  const [filteredSellers, setFilteredSellers] = React.useState<
    Seller[] | undefined
  >([]);

  const router = useRouter();

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
      setFilteredSellers(
        sellers?.filter((seller) =>
          seller.instagramHandle.includes(searchQuery)
        )
      );
      console.log("filteredSellers", filteredSellers);

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
  }, [searchQuery, sellers]);

  return (
    <>
      <input
        ref={inputRef}
        placeholder={label}
        onChange={handleSearch}
        className="flex text-xs flex-row lg:w-full w-full justify-between items-center h-6 border-b gap-1"
      />
      <div>
        {searchResults && searchResults.length > 0 && (
          <div className="bg-white rounded-md">
            {searchResults.map((product) => (
              <div className="" key={product.id}>
                <p
                  className="text-xs"
                  onClick={() => handleProductClick(product)}
                >
                  {product.name}
                </p>
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
            <p className="text-xs ">SELLER</p>
            {/* <select className="text-xs" name="Refine:" id="refineFilter">
                  <option value="Price:High-Low">High-Low</option>
                  <option value="Price:Low-High">Low-High</option>
                </select> */}
            <div className="text-xs">
              <Menu
              >
                
                  <MenuButton className="flex flex-row justify-between"
                      transition='all 0.2s'
                      flexDirection={'row'}
                    >
                      Price <CiSliderHorizontal className=" flex flex-row w-4 h-4" size={15}/>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>High-Low</MenuItem>
                    <MenuItem>Low-High</MenuItem>
                  </MenuList>
              </Menu>
            </div>
          </div>
          {filteredSellers?.map((seller) => (
            <>
              <div className="flex flex-row justify-center gap-3 m-1">
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
