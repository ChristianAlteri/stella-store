import axios from "axios";
import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products/checkout-likes`;

const getCheckoutAndLikes = async (
  storeId: string,
  likedProductIds: string[]
): Promise<Product[]> => {
  try {
    const response = await axios.post(URL, {
      storeId,
      productIds: likedProductIds,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching checkout-likes:", error);
    throw error;
  }
};

export default getCheckoutAndLikes;
