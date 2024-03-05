import { CiSearch } from "react-icons/ci";
import * as React from "react";
import axios from "axios"; // Make sure to import axios
import { Category, Color, Designer, Seller, Size } from "@/types";
import { cn } from "@/lib/utils";
import clsx from "clsx";

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
    const [modalOpen, setModalOpen] = React.useState(true);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<SearchResultItem[]>([]); 
    const URL=`${process.env.NEXT_PUBLIC_API_URL}/products`;
    
    const handleSearch = () => {
      setSearchQuery(inputRef.current?.value || "");
    }

    // TODO: Add category, designer, and seller search front end
    
  //   const filteredUsers = items.filter((item) => 
  //    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  //    );

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (searchQuery) {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${URL}`, {
              params: {
                productName: searchQuery, // Adjust these parameters based on your API
                // Add other parameters as needed
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
    }, [searchQuery]);

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
                  <div className="p-1.5 mt-1 h-full top-0" key={product.id}>
                    <div>{product.name}</div> {/* Make sure item structure corresponds to your data */}
                  </div>
                ))}
              </div>
            )}
          </div>
      </>
    )
}

export default SearchInput;
