"use client";

import { Github, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const socialLogin = () => {
  console.log("Logon");
};
export const SocialButton = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => socialLogin()}
      >
        <Image
          src="/google.svg"
          alt=""
          height={500}
          width={500}
          className="h-7 w-7"
        />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => socialLogin()}
      >
        <Github />
      </Button>
    </div>
  );
};
