"use client";

import { CiBadgeDollar } from "react-icons/ci";

const FAQ = () => {
  return (
    <div className="mt-4">
      <h2 className="md:text-2xl font-bold text-black mt-2 text-sm text-center">
        Frequently Asked Questions
      </h2>
      <div className="md:text-sm font-cursive text-light-font w-full justify-center items-center text-xs mt-2">
        <h3 className="font-bold">Q: What is anondrobe?</h3>
        <p>
          A: anondrobe is a platform for sustainable fashion, promoting circular
          fashion through a family business model.
        </p>

        <h3 className="font-bold mt-4">
          Q: How do I donate proceeds to charity?
        </h3>
        <p>
          A: Sellers can choose to donate all their proceeds to a charity. These
          sellers are marked with a special icon -{" "}
          <CiBadgeDollar size={21} className="text-green-500 inline" />.
        </p>

        <h3 className="font-bold mt-4">Q: How can I contact anondrobe?</h3>
        <p>
          A: You can contact us through our email info@anondrobe.com. We
          are here to help with any questions or concerns.
        </p>

        <h3 className="font-bold mt-4">Q: Tell me more about the charities?</h3>
        <p>
          A: More explained
        </p>
      </div>
    </div>
  );
};

export default FAQ;
