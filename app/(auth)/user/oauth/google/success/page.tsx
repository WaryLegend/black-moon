"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { FcGoogle } from "react-icons/fc";
import { useGoogleCallback } from "@/components/auth/useGoogleCallback";

import toast from "react-hot-toast";
import Spinner from "@/components/ui/Spinner";
import AnimatedCheck from "@/components/ui/AnimatedCheck";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending, isError, isSuccess } = useGoogleCallback();

  useEffect(() => {
    if (!isSuccess) return;

    toast.success("Đăng nhập Google thành công");
    queryClient.invalidateQueries({ queryKey: ["user", "me"] });

    const timer = setTimeout(() => {
      router.replace("/");
    }, 800);

    return () => clearTimeout(timer);
  }, [isSuccess, queryClient, router]);

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
