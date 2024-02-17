import axios from 'axios';
import { Designer } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/designers`;

const getDesigners = async (): Promise<Designer[]> => {
  try {
    const response = await axios.get(URL);
    // console.log("response from get-designers", response.data);

    return response.data;
  } catch (error) {

    console.error("Error fetching designers:", error);
    throw error;
  }
};

export default getDesigners;