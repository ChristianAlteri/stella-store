import axios from "axios";
import { Store } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/stores-public`;

const getStore = async (storeIdFromOnlineStore: string): Promise<Store> => {
  try {
    const response = await axios.get(`${URL}`, {
      params: { storeIdFromOnlineStore },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching store:", error);
    throw error;
  }
};

export default getStore;
