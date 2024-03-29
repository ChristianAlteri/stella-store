interface ProductGridProps {
    children: React.ReactNode;
  }

const ProductGrid: React.FC<ProductGridProps> = (
    {children}
) => {
    return ( 
        <div className="w-full grid grid-cols-1 md:grid-cols-4 items-center text-center justify-center">
            {children}
        </div>
     );
}
 
export default ProductGrid;