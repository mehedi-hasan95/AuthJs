"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/signin");
  };
  if (mode === "modal") {
    return <span>Here will be a modal</span>;
  }
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};
