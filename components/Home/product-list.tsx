// import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";
import NoResults from "../ui/no-results";
// import NoResults from "@/components/ui/no-results";

interface ProductListProps {
  title: string;
  data: Product[]
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  data
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {data.length === 0 && <NoResults />}

      <div className="flex">
        {data.map((item) => (

        //   <ProductCard key={item.id} data={item} />DO
        <div>{item.name}DOOOO</div>
        ))}
      </div>
    </div>
   );
}
 
export default ProductList;