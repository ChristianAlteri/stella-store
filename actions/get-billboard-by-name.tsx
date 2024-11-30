import axios from 'axios';
import { Billboard } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboardByName = async (label: string, storeId: string): Promise<Billboard> => {
  try {
    const response = await axios.get(`${URL}/${storeId}`, {
      params: { label, storeId },
    });


    return response.data;
  } catch (error) {
    console.error("Error fetching Billboard by name:", error);
    throw error;
  }
};

export default getBillboardByName;
