import Image from "next/image";
import default_user from "@/public/default-user.jpg";
import Link from "next/link";

// test admin
const admin = { name: "Wary", avatar: null, isAuth: true, role: "admin" };

function Admin() {
  const { name, avatar, isAuth, role } = admin;

  return (
    <Link
      href="/admin/profile"
      className="flex items-center gap-2 px-1 py-1 hover:underline"
      title="Go to profile"
    >
      <div className="relative aspect-square size-[30px] sm:size-[35px]">
        <Image
          src={avatar || default_user}
          fill
          alt={`${name}'s avatar`}
          className="border-accent-700 rounded-full border-2 object-cover"
        />
      </div>

      <span className="text-lg font-semibold sm:text-xl">{name}</span>
    </Link>
  );
}

export default Admin;
