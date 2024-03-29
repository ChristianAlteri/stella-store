"use client";

import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "next-share";
import ProductCardButton from "./ProductCardButton";
import { CiCircleChevLeft, CiLink, CiShare2 } from "react-icons/ci";
import { SiFacebook, SiMessenger, SiWhatsapp } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { BsTwitterX } from "react-icons/bs";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import { TbFaceId } from "react-icons/tb";

interface ShareButtonProps {
  url: string;
}
const ShareButton: React.FC<ShareButtonProps> = ({ url }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Custom Toast Success
  const toastSuccess = (message: string) => {
    toast.error(message, {
      style: {
        background: "white",
        color: "green",
      },
      icon: <TbFaceId size={30} />,
    });
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toastSuccess("Link copied to clipboard.");
  };
  return (
    <>
      <ProductCardButton icon={<CiShare2 />} onClick={onOpen} />
      <Dialog open={open} as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-45"></div>
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <Dialog.Panel className="items-center justify-between rounded-sm flex flex-col h-1/8 w-2/6 overflow-y-auto bg-white p-1 shadow-xl">
            <div
              className="hidden md:flex w-full justify-start items-start top-0 left-0 hover:cursor-pointer"
              onClick={onClose}
            >
              <CiCircleChevLeft size={25} />
              
            </div>
            <h1 className="text-sm mb-3">Share this product</h1>
            <div className="flex flex-row gap-4 mb-2 p-1 m-2">
              <FacebookShareButton url={url}>
                <SiFacebook size={25} />
              </FacebookShareButton>
              <WhatsappShareButton url={url}>
                <SiWhatsapp size={25} />
              </WhatsappShareButton>
              <TwitterShareButton url={url}>
                <BsTwitterX size={25} />
              </TwitterShareButton>
              <FacebookMessengerShareButton appId={url} url={url}>
                <SiMessenger size={25} />
              </FacebookMessengerShareButton>
              <EmailShareButton url={url}>
                <HiOutlineMail size={30} />
              </EmailShareButton>
              <div className="hover:cursor-pointer" onClick={() => onCopy(url)}>
                <CiLink size={35} />
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default ShareButton;
