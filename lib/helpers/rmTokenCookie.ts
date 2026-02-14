"use server";

import { cookies } from "next/headers";

export const removeRefreshTokenCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("refresh_token");
};
