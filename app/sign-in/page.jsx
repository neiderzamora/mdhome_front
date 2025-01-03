import Logo from "@/components/sign-in/Logo";
import SignInForm from "@/components/sign-in/SignInForm";

export default function Home() {
    return (
      <div className="flex h-screen flex-col items-center justify-center px-4 py-12">
        <Logo />
        <SignInForm />
      </div>
    );
  }
  