import getProducts from "@/actions/get-products";
import ThankYouOrderDetails from "./components/thankyou-order-details";
import SuggestedContainer from "@/components/Suggested/SuggestedContainer";

export const revalidate = 0;

interface ThankYouForYourPurchasePageProps {
  params: {
    storeId: string;
  },
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
> = async ({ searchParams, params }) => {

  return (
    <>
      <div className="grid grid-rows-2 gap-4 h-full">
        <div className="flex overflow-auto w-full justify-center">
          <ThankYouOrderDetails />
        </div>
      </div>
    </>
  );
};

export default ThankYouForYourPurchasePage;
