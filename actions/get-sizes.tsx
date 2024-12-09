import axios from "axios";
import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (storeId: string): Promise<Size[]> => {
  try {
    const response = await axios.get(`${URL}`, {
      params: { storeId },
    });
    // console.log("response from get-categories", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default getSizes;
