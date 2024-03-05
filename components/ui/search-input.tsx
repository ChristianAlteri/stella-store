
import * as React from "react";
import axios from "axios"; // Make sure to import axios
import { Category, Color, Designer, Seller, Size } from "@/types";

import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactPlayer from "react-player";


interface SearchResultItem {
  id: number | string;  // Use the correct type for your id
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
  const URL=`${process.env.NEXT_PUBLIC_API_URL}/products`;
    const [modalOpen, setModalOpen] = React.useState(true);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = React.useState("");

    const [searchResults, setSearchResults] = React.useState<SearchResultItem[]>([]); 
    const [filteredSellers, setFilteredSellers] = React.useState<Seller[] | undefined>([]);

    const router = useRouter();
    
    const handleSearch = () => {
      setSearchQuery(inputRef.current?.value || "");
    }

    // TODO: Add category, designer, and seller search front end


    const handleProductClick = (product: any) => {
      router.push(`/product/${product?.category?.id}/${product?.designer?.name}/${product?.id}/${product?.seller?.instagramHandle}`);
    }

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (searchQuery) {
      setFilteredSellers(sellers?.filter((seller) => seller.instagramHandle.includes(searchQuery)))
      console.log("filteredSellers", filteredSellers);

        const fetchData = async () => {
          try {
            const response = await axios.get(`${URL}`, {
              params: {
                productName: searchQuery,
              }
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
                  <p className="text-xs" onClick={() => handleProductClick(product)}>
                    {product.name}
                  </p> 
                  {/* TODO: style */}
                </div>
              ))}
            </div>
          )}
        </div>

          {filteredSellers && (
            <div className="bg-white rounded-md flex flex-col w-full">
              {filteredSellers?.map((seller) => (
                <>
                  <div className="flex flex-row justify-between border-b gap-3">
                    <p className="text-xs">SELLERS</p>
                    <p className="text-xs">{seller.instagramHandle.toUpperCase()}</p>
                  </div>
                <div className="grid grid-flow-col w-full overflow-x-auto border" key={seller.id}>
                  {seller.products.map((product) => (
                    <div key={product.id} className="flex rounded-md flex-col items-start justify-start leading-normal" style={{ width: '100px', height: '100px' }}>
                      <div className="flex flex-col w-full leading-normal">
                        <p className="text-xs hover:underline" onClick={() => handleProductClick(product)}>
                          {product.name}
                        </p>
                          <Image
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
  }

export default SearchInput;
