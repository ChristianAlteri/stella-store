import axios from 'axios';
import { Store } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/stores`;

const getStore = async (): Promise<Store[]> => {
  try {
    const response = await axios.get(URL);
    console.log("response from get-store", response.data);

    return response.data;
  } catch (error) {

    console.error("Error fetching store:", error);
    throw error;
  }
};

export default getStore;