export async function setAccessTokenCookie(token: string | null | undefined) {
  if (!token) {
    return;
  }

  try {
    const res = await fetch("/api/auth/set-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken: token }),
    });

    if (!res.ok) {
      console.warn(
        "Failed to persist access token cookie:",
        `${res.status} ${res.statusText}`,
      );
    }
  } catch (error) {
    console.warn(
      "Failed to persist access token cookie:",
      error instanceof Error ? error.message : error,
    );
  }
}

export async function clearAccessTokenCookie() {
  try {
    await fetch("/api/auth/clear-token", { method: "POST" });
  } catch (error) {
    console.warn(
      "Failed to clear access token cookie:",
      error instanceof Error ? error.message : error,
    );
  }
}
