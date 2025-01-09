import SignInForm from "@/components/sign-in/SignInForm";
import Logo from "@/components/sign-in/Logo";
import React from "react";

export default function page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 py-12">
      <Logo />
      <SignInForm />
    </div>
  );
}
