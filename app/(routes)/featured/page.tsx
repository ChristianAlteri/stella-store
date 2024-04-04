// import LeftSidebar from "@/components/Home/LeftSidebar";
import ProductGrid from "@/components/Home/ProductGrid";
// import RightSidebar from "@/components/Home/RightSidebar";
import HomeContainer from "@/components/ui/HomeContainer";
import ProductCard from "@/components/Product/product-card";
import Billboard from "@/components/Billboard/Billboard";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import CategoryCard from "@/components/ui/category-card";
import CategoryCardGrid from "@/components/Home/CategoryCardGridTest";
import getTopLikes from "@/actions/get-top-likes";

const FeaturedPage = async () => {
    const featuredProducts = await getProducts({isFeatured: true})


    return ( 
        <>

            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                {/* <LeftSidebar title="Designers" data={designersData} /> */}
               

                {/* Second column */}
                <HomeContainer>
                        {/* <Billboard data={billboardData} /> */}
                        <div>Featured Products</div>
                        <ProductGrid>
                            {featuredProducts.map((item) => (
                                
                                <ProductCard key={item.id} item={item} />
                                
                             ))}
                    </ProductGrid>
                </HomeContainer>

                {/* Third column */}

                {/* <RightSidebar title="Sellers" data={sellerData}/> */}

            </div>
        </>
     );
}
 
export default FeaturedPage;