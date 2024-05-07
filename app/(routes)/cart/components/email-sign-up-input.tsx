"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

const EmailSignUpInput = () => {
    const [email, setEmail] = useState("");
  
    const handleEmailChange = (e: any) => {
      setEmail(e.target.value);
      console.log("Entered email:", e.target.value);
    };
  return (
    <>
      <h2 className="text-super-small text-stone-700">
        Enter your email or continue as a guest
      </h2>
      <Input
        placeholder="Email"
        className="mt-1"
        value={email}
        onChange={handleEmailChange}
      />
    </>
  );
};

export default EmailSignUpInput;
