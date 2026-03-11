"use client";

import { FcGoogle } from "react-icons/fc";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import Button from "./Button";

function GoogleLoginBtn() {
  const router = useRouter();
  const handleGoogleLogin = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`);
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="secondary"
      aria-label="Login with Google"
      className={cn(
        "border-accent-300 hover:bg-accent-50 flex w-full items-center justify-center gap-2 rounded-lg border border-solid py-2 transition-colors",
      )}
    >
      <FcGoogle className="text-xl" />
      Đăng nhập với Google
    </Button>
  );
}

export default GoogleLoginBtn;
