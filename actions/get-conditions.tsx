import axios from 'axios';
import { Condition } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/conditions`;

const getConditions = async (): Promise<Condition[]> => {
  try {
    const response = await axios.get(URL);
    // console.log("response from get-categories", response.data);

    return response.data;
  } catch (error) {

    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default getConditions;