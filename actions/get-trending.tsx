import axios from 'axios';
import qs from "query-string"

import { Product } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/trending`;

interface Query {
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
  isFeatured: boolean;
  isOnSale: boolean;
  isCharity: boolean;
  isHidden: boolean;
  all?: boolean;
  minPrice?: number;
  maxPrice?: number;
  storeIdFromOnlineStore: string;
  isOnline: boolean;
}

const getTrending = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: { 
        colorId: query.colorId,
        sizeId: query.sizeId,
        categoryName: query.categoryId,
        materialId: query.materialId,
        isFeatured: query.isFeatured,
        isOnSale: query.isOnSale,
        designerId: query.designerId,
        sellerId: query.sellerId,
        all: query.all,
        categoryId: query.categoryId,
        sort: query.sort,
        conditionId: query.conditionId,
        genderId: query.genderId,
        subcategoryId: query.subcategoryId,
        isCharity: query.isCharity,
        isHidden: query.isHidden,
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
        storeIdFromOnlineStore: query.storeIdFromOnlineStore,
        isOnline: query.isOnline,
      },
    });
    const response = await axios.get(url);

    // console.log("response from get-Trending", response.data);
    return response.data;
  } catch (error) {

    console.error("Error fetching Trending:", error);
    throw error;
  }
};

export default getTrending;