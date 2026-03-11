import AdProfile from "@/components/admin/profile/AdProfile";

export const metadata = {
  title: "Profile",
};

export default function AdProfilePage() {
  return (
    <>
      <h1 className="text-3xl font-semibold">My profile</h1>
      <AdProfile />
    </>
  );
}
