import ProfileTabNav from "@/app/_components/CProfilePage/ProfileTabNav";

export const metadata = {
  title: "Profile",
};

export default function ProfileLayout({ children }) {
  return (
    <div className="grid grid-rows-[auto_1fr]">
      <ProfileTabNav />

      <main className="bg-primary-0 rounded-b-lg p-6 shadow-md">
        {children}
      </main>
    </div>
  );
}
