import getProducts from "@/actions/get-products";
import ThankYouOrderDetails from "./components/thankyou-order-details";
import SuggestedContainer from "@/components/Suggested/SuggestedContainer";

export const revalidate = 0;

interface ThankYouForYourPurchasePageProps {
  searchParams: {
    sizeId: string;
    colorId: string;
    conditionId: string;
    materialId: string;
    genderId: string;
    subcategoryId: string;
    categoryId: string;
    designerId: string;
    sellerId: string;
    sort: string;
    isFeatured: boolean | undefined;
    isOnSale: boolean | undefined;
    isCharity: boolean | undefined;
    isHidden: boolean | undefined;
    minPrice: number;
    maxPrice: number;
  };
}

const ThankYouForYourPurchasePage: React.FC<
  ThankYouForYourPurchasePageProps
> = async ({ searchParams }) => {
  const featuredProducts = await getProducts({
    categoryId: searchParams.categoryId,
    sort: searchParams.sort,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    conditionId: searchParams.conditionId,
    materialId: searchParams.materialId,
    genderId: searchParams.genderId,
    subcategoryId: searchParams.subcategoryId,
    isOnSale: searchParams.isOnSale,
    isCharity: searchParams.isCharity,
    isHidden: searchParams.isHidden,
    isFeatured: true,
    designerId: searchParams.designerId,
    sellerId: searchParams.sellerId,
  });


  return (
    <>
      <div className="flex flex-col w-full justify-center items-center text-center  h-1/2">
        <ThankYouOrderDetails
        // orderId={orderId}
        />
      </div>

      <div className="justify-center items-center md:grid flex grid-cols-8 gap-1 bg-white ">
        {/* First column */}

        {/* Second column */}
        <div className="col-span-8 flex flex-col justify-center items-center w-full h-full p-2">
          <SuggestedContainer 
            data={featuredProducts} 
            title="CONTINUE SHOPPING OUR LATEST ARRIVALS"
            route="/"

          />
        </div>

        {/* Third column */}
      </div>
    </>
  );
};

export default ThankYouForYourPurchasePage;
