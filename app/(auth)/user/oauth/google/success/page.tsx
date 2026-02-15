"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useGoogleCallback } from "@/components/auth/useGoogleCallback";
import { useUserStore } from "@/contexts/UserStore";
import { tokenManager } from "@/lib/auth/tokenManager";

import toast from "react-hot-toast";
import Spinner from "@/components/ui/Spinner";
import AnimatedCheck from "@/components/ui/AnimatedCheck";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const setAuthenticated = useUserStore((s) => s.setAuthenticated);

  const { data, isPending, isError } = useGoogleCallback();

  useEffect(() => {
    if (!data) return;

    const user = data?.data?.user;
    const accessToken = data?.data?.access_token;

    if (!user || !accessToken) {
      toast.error("Đăng nhập Google thất bại");
      router.replace("/user/login");
      return;
    }

    tokenManager.setAccessToken(accessToken);
    setAuthenticated(user);

    toast.success(
      user.firstName
        ? `Chào mừng, ${user.lastName || ""} ${user.firstName}!`
        : "Đăng nhập thành công",
    );

    const timer = setTimeout(() => {
      router.replace("/");
    }, 800);

    return () => clearTimeout(timer);
  }, [data, router, setAuthenticated]);

  useEffect(() => {
    if (isError) {
      toast.error("Đăng nhập Google thất bại");
      router.replace("/user/login");
    }
  }, [isError, router]);

  return (
    <div className="flex h-full items-center justify-center p-5">
      <div className="bg-primary-50 flex max-w-lg flex-col rounded-lg p-8 shadow-lg">
        {isPending ? (
          <>
            <Spinner
              type="bar"
              color="var(--color-accent-600)"
              className="self-center"
            />
            <span className="text-primary-600 mt-4">
              Đang xử lý đăng nhập{" "}
              <FcGoogle className="inline-block align-middle" />
              oogle...
            </span>
          </>
        ) : (
          <AnimatedCheck />
        )}
      </div>
    </div>
  );
}
