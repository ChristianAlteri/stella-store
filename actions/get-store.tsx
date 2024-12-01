import axios from "axios";
import { Store } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/stores-public`;

const getStore = async (storeIdFromOnlineStore: string): Promise<Store> => {
  // console.log(`STORE URL ${URL}?storeId=${storeId}`);
  // const response = await axios.get(`${URL}?storeId=${storeId}`);
  try {
    const response = await axios.get(`${URL}`, {
      params: { storeIdFromOnlineStore },
    });
    // console.log(`STORE URL ${URL}`);
    // console.log(`PARAMS `, { params: { storeIdFromOnlineStore } });
    // console.log(`response `, response);
    return response.data;
  } catch (error) {
    console.error("Error fetching store:", error);
    throw error;
  }
};

export default getStore;
