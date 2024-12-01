import axios from "axios";
import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboardByName = async (
  label: string,
  storeId: string
): Promise<Billboard | null> => {
  try {
    const response = await axios.get(`${URL}/${storeId}`, {
      params: { label, storeId },
    });
    return response.data;
  } catch (error) {
    return null; 
  }
};

export default getBillboardByName;
