import getSingleProduct from "@/actions/get-single-product";
import getProducts from "@/actions/get-products";
import ProductCard from "@/components/ui/product-card";
import SuggestedContainer from "@/components/ui/SuggestedContainer";
import Gallery from "@/components/Gallery";
import DetailsCard from "@/components/ui/DetailsCard";
import BuyNowCard from "@/components/ui/BuyNowCard";


interface IndividualProductPageProps {
    params: {
        categoryName: string;
        designerName: string;
        productId: string;
        sellerName: string;
    }
}

const IndividualProductPage: React.FC<IndividualProductPageProps> = async ({
    params
}) => {
    const product = await getSingleProduct(params.productId);

    let designerName = product?.designer?.name;
    let sellerInstagram = product?.seller?.instagramHandle.split("@")[1];
    const suggestedProductsBasedOnCategory = await getProducts({categoryId: product?.category?.id});
    const suggestedProductsBasedOnDesigner = await getProducts({ designerId: product?.designer?.id});
    const suggestedProductsBasedOnSeller = await getProducts({ sellerId: product?.seller?.id});
    // console.log("Seller products", suggestedProductsBasedOnSeller);
    return ( 
        <>

                <div className="flex flex-row w-full gap-3 bg-white">
                    
                    {/* First column */}
                    <aside className="flex flex-col w-2/6 text-left p-3 justify-center items-start">
                        <DetailsCard data={product}/>
                    </aside>
                

                    {/* Second column */}
                    <div className="w-full gird grid-cols-1 overflow-auto">
                        <div className="flex flex-col w-full h-full items-center text-center justify-center">
                            <Gallery images={product.images}/>
                            <div>
                        </div>
                        </div>
                    </div>

                    {/* Third column */}

                    <aside className="flex flex-col w-2/6 text-right p-3 justify-center items-end">
                    <BuyNowCard data={product}/>
                    </aside>
                </div>

                {/* Suggestions */}
                <div className="flex justify-center p-3 gap-4">
                    <SuggestedContainer title="Styled with" data={suggestedProductsBasedOnDesigner}/>
                </div>
                {/* Change this first search to proper recommended algorithm */}
               <SuggestedContainer title="BASED ON YOUR RECENT ACTIVITY" data={suggestedProductsBasedOnCategory}/>
               <SuggestedContainer title={designerName.toUpperCase()} data={suggestedProductsBasedOnDesigner}/>
               <SuggestedContainer title={`MORE FROM ${sellerInstagram.toUpperCase()}`} data={suggestedProductsBasedOnSeller}/>
        </>
     );
}
 
export default IndividualProductPage;