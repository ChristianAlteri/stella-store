import HomeContainer from "@/components/ui/HomeContainer";
import LeftCategorySidebar from "../../../components/Home/LeftCategorySidebarTest";
import ProductGrid from "../../../components/Home/ProductGrid";
import Billboard from "@/components/Billboard/Billboard";
import ProductCard from "@/components/ui/product-card";
import ProductList from "@/components/Home/product-list";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import CategoryCardGrid from "@/components/Home/CategoryCardGridTest";
import CategoryCard from "@/components/ui/category-card";


export const revalidate = 0

const DesignerPage = async () => {
    const designersData = await getDesigners();
    const categoryData = await getCategories();
    const sellerData = await getSellers();
    const productData = await getProducts({all: true});
    const billboardData = await getBillboard("a8d1234e-35d9-4dae-896a-762eb28045c3");


    // const billboardId = designersData.map((designer) => {designer.billboard})
    // console.log("billy this should be billboardID", billboardId);

    return ( 
        <>

            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                {/* <LeftCategorySidebar title="Categories" data={categoryData} /> */}
               

                {/* Second column */}
                <HomeContainer>
                    <Billboard data={billboardData} />
                    <CategoryCardGrid>
                        {designersData.map((designer) => (
                        <CategoryCard route="designers" id={designer.id} key={designer.name} data={designer} />
                        ))}
                    </CategoryCardGrid>
                </HomeContainer>

                {/* Third column */}

                {/* <RightSidebar title="Sellers" data={sellerData}/> */}

            </div>
        </>
     );
}
 
export default DesignerPage;
