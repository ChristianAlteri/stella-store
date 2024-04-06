
import ProductGrid from "@/components/Home/ProductGrid";
import HomeContainer from "@/components/ui/HomeContainer";
import ProductCard from "@/components/Product/product-card";
import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";

import getSellers from "@/actions/get-sellers";

import getTopLikes from "@/actions/get-top-likes";

const TopLikesPage = async () => {
    const topLikedProducts = await getTopLikes({all: true})
    // const billboardData = await getBillboard("a8d1234e-35d9-4dae-896a-762eb28045c3");

    return ( 
        <>

            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                {/* <LeftSidebar title="Designers" data={designersData} /> */}
               

                {/* Second column */}
                <HomeContainer>
                        {/* <Billboard data={billboardData} /> */}
                        <div>TOP LIKED PRODUCTS</div>
                        <ProductGrid>
                            {topLikedProducts.map((item) => (
                                
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
 
export default TopLikesPage;