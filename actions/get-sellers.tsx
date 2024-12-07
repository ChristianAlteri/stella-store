import axios from 'axios';
import { Seller } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sellers`;

const getSellers = async (storeId: string): Promise<Seller[]> => {
  try {
    const response = await axios.get(URL, {
      params: {
        storeId, 
        isArchived: false, 
        // name,    
      },
    });
    // console.log("response from get-sellers", response.data);
    return response.data;
  } catch (error) {

    console.error("Error fetching sellers:", error);
    throw error;
  }
};

export default getSellers;