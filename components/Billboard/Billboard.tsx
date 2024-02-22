import { Billboard } from "@/types";

interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({
  data
}) => {
  console
  return ( 
    <div className="p-3 sm:p-4 lg:p-6 rounded-xl overflow-hidden ">
      <div style={{ width: '80vw', height: '60vh', backgroundSize: "fill", backgroundImage: `url(${data?.imageUrl})` }} 
        className="rounded-xl relative aspect-square overflow-hidden bg-cover">
      </div>
    </div>
   );
};

export default Billboard;