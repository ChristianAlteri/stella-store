import getSingleProduct from "@/actions/get-single-product";
import getProducts from "@/actions/get-products";
import ProductCard from "@/components/ui/product-card";
import SuggestedContainer from "@/components/ui/SuggestedContainer";


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
                    <aside className="flex flex-col w-3/6 text-left p-3 justify-center items-start">
                        <p>details ect</p>
                    </aside>
                

                    {/* Second column */}
                    <div className="flex flex-col w-full items-center text-center justify-center">
                        Product photos
                    <div>
                        <h3 className="text-xs">Styled with</h3>
                        <div className="flex p-3 gap-4">
                            <SuggestedContainer data={suggestedProductsBasedOnDesigner}/>
                        </div>
                    </div>
                    </div>

                    {/* Third column */}

                    <aside className="flex flex-col w-3/6 text-right p-3 justify-center items-end">
                        <p>BUY NOW</p>
                    </aside>
                </div>

                {/* Change this first search to proper recommended algorithm */}
               <SuggestedContainer title="BASED ON YOUR RECENT ACTIVITY" data={suggestedProductsBasedOnCategory}/>
               <SuggestedContainer title={designerName.toUpperCase()} data={suggestedProductsBasedOnDesigner}/>
               <SuggestedContainer title={`MORE FROM ${sellerInstagram.toUpperCase()}`} data={suggestedProductsBasedOnSeller}/>
        </>
     );
}
 
export default IndividualProductPage;