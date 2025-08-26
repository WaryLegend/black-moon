import { redirect } from "next/navigation";

// just for testing (will be remove after)
export default function Page() {
  redirect("/admin/dashboard");
  // redirect("/admin/login");
}
