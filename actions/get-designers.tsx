import { Designer } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/designers`;

const getDesigners = async (): Promise<Designer[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getDesigners;