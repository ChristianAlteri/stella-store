import axios from 'axios';
import { Seller } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/top-sellers`;

const getTopSellers = async (): Promise<Seller[]> => {
  try {
    const response = await axios.get(URL);
    console.log("response from get-sellers", response.data);

    return response.data;
  } catch (error) {

    console.error("Error fetching sellers:", error);
    throw error;
  }
};

export default getTopSellers;