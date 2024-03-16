import HomeContainer from "@/components/ui/HomeContainer";
import LeftSidebar from "../../components/Home/LeftSidebar";
import RightSidebar from "../../components/Home/RightSidebar";
import ProductGrid from "../../components/Home/ProductGrid";
import Billboard from "@/components/Billboard/Billboard";
import ProductCard from "@/components/ui/product-card";
import ProductList from "@/components/Home/product-list";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import getBillboardByName from "@/actions/get-billboard-by-name";


export const revalidate = 0

const Homepage = async () => {
    const designersData = await getDesigners();
    const categoryData = await getCategories();
    const sellerData = await getSellers();
    const productData = await getProducts({all: true});
    const billboardData = await getBillboardByName("homePage");


    return ( 
        <>
            {/* if logged in re route to 'for-you' page */}
                <div className="flex flex-row w-full h-full gap-4 bg-white">
                    
                    {/* First column */}
                    <LeftSidebar title="Designers" data={designersData} />
                

                    {/* Second column */}
                    <HomeContainer>
                        {/* <Billboard data={billboardData} /> */}
                        <ProductGrid>
                                {productData.map((item) => (
                                    
                                    <ProductCard key={item.id} item={item} />
                                    
                                ))}
                        </ProductGrid>
                    </HomeContainer>

                    {/* Third column */}

                    <RightSidebar title="Sellers" data={sellerData}/>

                </div>
        </>
     );
}
 
export default Homepage;
