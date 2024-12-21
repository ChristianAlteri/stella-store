import SuggestedContainer from "@/components/Suggested/SuggestedContainer";
import LikesPage from "./components/likes-page";

interface TopLikesPageProps {
  params: {
    storeId: string;
  };
}

const LikesPageServer: React.FC<TopLikesPageProps> = async ({ params }) => {
  return (
    <div className="flex flex-col bg-white w-full justify-center items-center">
      <div className="flex w-full justify-center items-center">
        <LikesPage />
      </div>
      <SuggestedContainer
        route={`/trending`}
        title="SHOP OUR TOP PICKS"
        isFeatured={true}
        isOnSale={undefined}
      />
    </div>
  );
};

export default LikesPageServer;
