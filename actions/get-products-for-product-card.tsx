import axios from "axios";
import qs from "query-string";

import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products/product-card`;
const storeId = `${process.env.NEXT_PUBLIC_STORE_ID}`;

interface Query {
  isOnline?: boolean | undefined;
  isArchived?: boolean;
  storeIdFromOnlineStore?: string;
  page?: number;
  limit?: number;
  // categoryId?: string;
  // designerId?: string;
  // sellerId?: string;
  // colorId?: string;
  // sizeId?: string;
  // conditionId?: string;
  // genderId?: string;
  // subcategoryId?: string;
  // sort?: string;
  // materialId?: string;
  // isFeatured?: boolean | undefined;
  // isOnSale?: boolean | undefined;
  // isHidden?: boolean | undefined;
  // isCharity?: boolean | undefined;
  // all?: boolean;
  // minPrice?: number;
  // maxPrice?: number;
}
type ProductWithPagination = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
};

const getProductsForProductCard = async (query: Query): Promise<ProductWithPagination> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        ...query,
        page: query.page || 1,
        limit: query.limit || 4,
      },
    });
    const response = await axios.get(url);
    return response.data as ProductWithPagination;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getProductsForProductCard;

