import HomeContainer from "@/components/ui/HomeContainer";
import LeftSidebar from "../../../components/Home/LeftSidebar";
import RightCategorySidebar from "../../../components/Home/RightCategorySidebar";
import LeftCategorySidebar from "../../../components/Home/LeftCategorySidebar";
import ProductGrid from "../../../components/Home/ProductGrid";
import Billboard from "@/components/Billboard/Billboard";
import ProductCard from "@/components/ui/product-card";
import ProductList from "@/components/Home/product-list";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import RightSidebar from "@/components/Home/RightSidebar";
import CategoryCardGrid from "@/components/Home/CategoryCardGrid";
import CategoryCard from "@/components/ui/category-card";


export const revalidate = 0

const DesignerPage = async () => {
    const designersData = await getDesigners();
    const categoryData = await getCategories();
    const sellerData = await getSellers();
    const productData = await getProducts({all: true});
    const billboardData = await getBillboard("4f972736-5236-4e1d-b352-bfb301423d71");


    // const billboardId = designersData.map((designer) => {designer.billboard})
    // console.log("billy this should be billboardID", billboardId);

    return ( 
        <>

            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                <LeftCategorySidebar title="Categories" data={categoryData} />
               

                {/* Second column */}
                <HomeContainer>
                    <Billboard data={billboardData} />
                    <CategoryCardGrid>
                        {designersData.map((designer) => (
                        <CategoryCard route="designers" key={designer.name} data={designer} />
                        ))}
                    </CategoryCardGrid>
                </HomeContainer>

                {/* Third column */}

                <RightSidebar title="Sellers" data={sellerData}/>

            </div>
        </>
     );
}
 
export default DesignerPage;
