import axios from 'axios';
import qs from "query-string"

import { OrderItem } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/order-details`;

interface Query {
  orderId?: string;
}

const getOrderDetails = async (query: Query): Promise<OrderItem[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: { 
        orderId: query.orderId,
      },
    });
    const response = await axios.get(url);

    return response.data;
  } catch (error) {

    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getOrderDetails;