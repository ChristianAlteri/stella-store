import axios from 'axios';
import qs from "query-string"

import { Product } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/products`;
const storeId = `${process.env.NEXT_PUBLIC_STORE_ID}`;

interface Query {
  categoryId?: string;
  designerId?: string;
  sellerId?: string;
  colorId?: string;
  sizeId?: string;
  conditionId?: string;
  genderId?: string;
  subcategoryId?: string;
  sort?: string;
  materialId?: string;
  isFeatured?: boolean | undefined;
  isOnSale?: boolean | undefined;
  isHidden?: boolean | undefined;
  isCharity?: boolean | undefined;
  isOnline?: boolean | undefined;
  all?: boolean;
  minPrice?: number;
  maxPrice?: number;
  isArchived?: boolean;
  storeIdFromOnlineStore?: string;
  page?: number;
  limit?: number;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        ...query,
        page: query.page || 1, // Default to page 1
        limit: query.limit || 4, // Default to 4 items per page
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