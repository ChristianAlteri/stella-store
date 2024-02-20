import HomeContainer from "@/components/ui/HomeContainer";
import LeftSidebar from "../../components/Home/LeftSidebar";
import RightSidebar from "../../components/Home/RightSidebar";
import ProductGrid from "../../components/Home/ProductGrid";
import Billboard from "@/components/Billboard/Billboard";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/Home/product-list";
import ProductCard from "@/components/ui/product-card";
import getSellers from "@/actions/get-sellers";

export const revalidate = 0

const Homepage = async () => {
    const designersData = await getDesigners();
    const categoryData = await getCategories();
    const sellerData = await getSellers();
    const productData = await getProducts({all: true});
    const billboardData = await getBillboard("d391b3a5-91dc-4e9e-b088-fd2e9057e743");

    console.log("this should be productData", productData);

    // const billboardId = designersData.map((designer) => {designer.billboard})
    // console.log("billy this should be billboardID", billboardId);

    return ( 
        <>

            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                <LeftSidebar data={designersData} />
               

                {/* Second column */}
                <HomeContainer>
                    {/* <Billboard data={billboardData} /> */}
                    <ProductGrid>
                            {productData.map((item) => (
                                
                                <ProductCard key={item.id} item={item} />
                                
                             ))}
                        <div className="">
                        </div>
                    </ProductGrid>
                </HomeContainer>

                {/* Third column */}

                <RightSidebar data={sellerData}/>

            </div>
        </>
     );
}
 
export default Homepage;
