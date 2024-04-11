import { useParams } from 'next/navigation';


const useParamsUtil = () => {
  const { sellerId, designerId, categoryId } = useParams();
  
  const isSellerSelected = (id: string) => sellerId === id;
  const isDesignerSelected = (id: string) => designerId === id;
  const isCategorySelected = (id: string) => categoryId === id;

  return { isSellerSelected, isDesignerSelected, isCategorySelected,  };
};

export default useParamsUtil;