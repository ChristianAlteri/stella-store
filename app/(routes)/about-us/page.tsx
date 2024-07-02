import EmailForm from "@/components/ui/email-form";
import FAQ from "@/components/ui/frequently-asked-questions";
import { CiBadgeDollar } from "react-icons/ci";

export const revalidate = 0;

interface AboutPageProps {

}

const AboutPage: React.FC<AboutPageProps> = async ({}) => {

  return (
    <>
        {/* Large screen Billboard */}

        <div className="flex flex-row w-full justify-center items-center text-center  h-1/2">
          <div className="flex flex-col w-full justify-center text-center items-center">
            <h2 className="md:text-2xl font-bold text-black mt-2 text-sm">
              ABOUT US
            </h2>
            <p className="md:text-sm font-cursive text-light-font w-1/2 justify-center items-center text-xs">
                @Nondrobe is a platform for sustainable fashion. We are a family business that believe in circular fashion.
            </p>
          </div>
          <div className="flex flex-col w-full justify-center text-center items-center">
            <h2 className="md:text-2xl font-bold text-black mt-2  text-sm">
              ABOUT THE CHARITIES
            </h2>
            <p className="md:text-sm font-cursive text-light-font w-1/2 justify-center items-center text-xs">
                Some sellers choose to donate all their proceeds to a charity and are marked with a special icon - <CiBadgeDollar size={21} className="text-green-500"/>
            </p>
          </div>
        </div>

      <div className="justify-center items-center md:grid flex grid-cols-8 gap-1 bg-white ">

        {/* First column */}
        <div className="col-span-1 justify-start items-start w-full hidden sticky z-50 h-full md:grid ml-4">
        </div>

        {/* Second column */}
        <div className="col-span-6 flex flex-col justify-center items-center w-full h-full p-2">
              <EmailForm />
              <FAQ />
        </div>


        {/* Third column */}
        <div className="col-span-1 justify-end items-end w-full hidden sticky z-50 h-full md:grid">

        </div>
      </div>
    </>
  );
};

export default AboutPage;
