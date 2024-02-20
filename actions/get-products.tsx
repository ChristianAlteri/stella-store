import axios from 'axios';
import qs from "query-string"

import { Product } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  designerId?: string;
  sellerId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  all?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: { 
        colorId: query.colorId,
        sizeId: query.sizeId,
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
        designerId: query.designerId,
        sellerId: query.sellerId,
        all: query.all,
      },
    });
    const response = await axios.get(url);

    // console.log("response from get-products", response.data);
    return response.data;
  } catch (error) {

    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getProducts;