import axios from 'axios';
import qs from "query-string"

import { Product } from "@/types";



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

const getTopTen = async (query: Query, route: string): Promise<Product[]> => {
    const URL=`${process.env.NEXT_PUBLIC_API_URL}/${route}`;
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
    const topTen = response.data.slice(0, 20);

    // console.log("response from get-TopTen", response.data);
    return topTen;
  } catch (error) {

    console.error("Error fetching TopTen:", error);
    throw error;
  }
};

export default getTopTen;