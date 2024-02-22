interface CategoryCardGridProps {
    children: React.ReactNode;
  }

const CategoryCardGrid: React.FC<CategoryCardGridProps> = (
    {children}
) => {
    return ( 
        <div className="w-full gap-4 grid grid-cols-3 items-center text-center justify-center">
            {children}
        </div>
     );
}
 
export default CategoryCardGrid;