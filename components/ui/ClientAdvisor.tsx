"use client";

import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types";
import { BsPersonRaisedHand } from "react-icons/bs";
import { Dialog } from "@headlessui/react";
import IconButton from "./icon-button";
import { IoCloseOutline } from "react-icons/io5";

interface ClientAdvisorProps {
  products: Product[];
}

const ClientAdvisor: React.FC<ClientAdvisorProps> = ({ products }) => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState<string[]>([]);
  const [isToggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleSearchChange = (e: any) => {
    setUserInput(e.target.value);
  };

  const formattedProducts = products
    .map((product) => {
      return `${product.name} by ${product.designer.name} size ${product.size.name} in ${product.color.name} for $${product.ourPrice}`;
    })
    .join(", ");

  const sendRequest = async () => {
    if (userInput !== "") {
      setLoading(true);
      console.log("Sending API call with input:", userInput);
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            messages: [
              {
                role: "system",
                content: `You are a fashion styling advisor with knowledge of all our stock ${formattedProducts}.`,
              },
              {
                role: "user",
                content: `Generate a friendly JSON response to the ${userInput} advising them on stock we have: ${formattedProducts}.`, //${products.map(product => product.name)}, ${products.map(product => product.designer.name)}
              },
            ],
            model: "gpt-3.5-turbo-1106",
            response_format: { type: "json_object" },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
          }
        );

        const newResponse = response.data.choices[0].message.content;
        console.log("Generated response from OpenAI:", newResponse);
        setGeneratedResponse((prevResponse) => [...prevResponse, newResponse]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-row w-full justify-center items-center gap-2">
      <BsPersonRaisedHand
        size={17}
        className="hover:cursor-pointer"
        onClick={onOpen}
      />
      <Dialog open={open} as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-45" />
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <Dialog.Panel className="rounded-sm flex flex-col h-2/3 w-2/3 overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex flex-row justify-end p-2">
              <IconButton
                icon={<IoCloseOutline size={17} />}
                onClick={onClose}
              />
            </div>
            <div className="flex flex-col items-center justify-center flex-1">
              <input
                type="text"
                name="clientAdvisor"
                id="clientAdvisor"
                placeholder="Client Advisor..."
                className="w-full p-2" 
                onChange={handleSearchChange}
              />
              <button
                onClick={sendRequest}
                disabled={loading}
                className="mt-2 py-2 px-4 bg-blue-500 rounded-md text-white hover:bg-blue-700 disabled:bg-blue-300"
              >
                {loading ? "Loading..." : "Ask Advisor"}
              </button>
              {generatedResponse.map((response, index) => (
                <p key={index} className="mt-2">
                  {response}
                </p>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
export default ClientAdvisor;
