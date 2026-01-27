import Image from "next/image";
import default_user from "@/public/default-user.jpg";
import Link from "next/link";
import Guest from "./Guest";

// test user
const user = { name: "Wary", avatar: null, isAuth: false };

function User() {
  const { name, avatar, isAuth } = user;

  if (!isAuth) return <Guest />;

  return (
    <Link
      href="/profile"
      className="hover:text-accent-700 flex items-center gap-1 p-1 hover:underline"
    >
      <div className="relative aspect-square size-[25px]">
        <Image
          src={avatar || default_user}
          fill
          alt="User's avatar"
          className="border-primary-800 rounded-full border-2 object-cover"
        />
      </div>

      <span className="hidden text-lg font-semibold sm:text-xl md:block">
        Chào, {name}
      </span>
    </Link>
  );
}

export default User;
