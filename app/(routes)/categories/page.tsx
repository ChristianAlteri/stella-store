import LeftSidebar from "@/components/Home/LeftSidebar";
import ProductGrid from "@/components/Home/ProductGrid";
import RightSidebar from "@/components/Home/RightSidebar";
import HomeContainer from "@/components/ui/HomeContainer";
import ProductCard from "@/components/ui/product-card";
import Billboard from "@/components/Billboard/Billboard";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import CategoryCard from "@/components/ui/category-card";
import CategoryCardGrid from "@/components/Home/CategoryCardGrid";

const CategoryPage = async () => {
    const designersData = await getDesigners();
    const categoryData = await getCategories();
    const sellerData = await getSellers();
    const productData = await getProducts({all: true});
    const billboardData = await getBillboard("a8d1234e-35d9-4dae-896a-762eb28045c3");

    return ( 
        <>


            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                <LeftSidebar title="Designers" data={designersData} />
               

                {/* Second column */}
                <HomeContainer>
                        <Billboard data={billboardData} />
                    <CategoryCardGrid>
                        {categoryData.map((category) => (
                        <CategoryCard route="categories" key={category.name} id={category.id} data={category} />
                        ))}
                    </CategoryCardGrid>
                </HomeContainer>

                {/* Third column */}

                <RightSidebar title="Sellers" data={sellerData}/>

            </div>
        </>
     );
}
 
export default CategoryPage;