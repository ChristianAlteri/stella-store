import axios from 'axios';
import qs from "query-string"

import { Product } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/top-likes`;

interface Query {
  categoryId?: string;
  designerId?: string;
  sellerId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  isOnSale?: boolean;
  materialId?: string;
  all?: boolean;
}

const getOnSale = async (query: Query): Promise<Product[]> => {
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
      },
    });
    const response = await axios.get(url);

    // console.log("response from get-OnSale", response.data);
    return response.data;
  } catch (error) {

    console.error("Error fetching OnSale:", error);
    throw error;
  }
};

export default getOnSale;