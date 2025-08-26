import Image from "next/image";
import default_user from "@/public/default-user.jpg";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";

// test user
const user = { name: "Wary", avatar: null, isAuth: false };

function User() {
  const { name, avatar, isAuth } = user;

  return (
    <Link
      href={isAuth ? "/profile" : "/auth/login"}
      className="flex items-center gap-2 px-1 py-1 hover:underline"
    >
      {isAuth ? (
        <div className="relative aspect-square size-[30px] sm:size-[35px]">
          <Image
            src={avatar || default_user}
            fill
            alt="User's avatar"
            className="border-accent-700 rounded-full border-2 object-cover"
          />
        </div>
      ) : (
        <FaRegUser className="hidden h-5 w-5 sm:block" />
      )}
      <span className="text-lg font-semibold sm:text-xl">
        {isAuth ? `Chào, ${name}` : "Sign\u00A0in"}
      </span>
    </Link>
  );
}

export default User;
