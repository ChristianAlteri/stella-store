import ProductGrid from "@/components/Home/ProductGrid";
import HomeContainer from "@/components/ui/HomeContainer";
import ProductCard from "@/components/Product/product-card";
import getProducts from "@/actions/get-products";
import FullscreenProductFiltersFooter from "@/components/Home/full-screen-product-filters-footer";



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
                    <div className="fixed bottom-0 p-7 w-1/3 z-50">
            {/* <FullscreenProductFiltersFooter 
              productData={productData}
              genders={genders}
            /> */}
          </div>
                </HomeContainer>

                {/* Third column */}

                {/* <RightSidebar title="Sellers" data={sellerData}/> */}

            </div>
        </>
     );
}
 
export default FeaturedPage;