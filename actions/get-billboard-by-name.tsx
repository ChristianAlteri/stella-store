import axios from 'axios';
import { Billboard } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboardByName = async (label: string): Promise<Billboard> => {
  try {
    const response = await axios.get(`${URL}/${label}`);
    // console.log("response from get-categories", response.data);

    return response.data;
  } catch (error) {

    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default getBillboardByName;
