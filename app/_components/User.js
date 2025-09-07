import Image from "next/image";
import default_user from "@/public/default-user.jpg";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

// test user
const user = { name: "Wary", avatar: null, isAuth: false };

function User() {
  const { name, avatar, isAuth } = user;

  return (
    <Link
      href={isAuth ? "/profile" : "/auth/login"}
      className="flex items-center gap-1 px-1 py-1 hover:underline"
    >
      {isAuth ? (
        <div className="relative aspect-square size-[25px]">
          <Image
            src={avatar || default_user}
            fill
            alt="User's avatar"
            className="border-primary-800 rounded-full border-2 object-cover"
          />
        </div>
      ) : (
        <FaRegUserCircle className="h-5 w-5" />
      )}
      <span className="hidden text-lg font-semibold sm:text-xl md:block">
        {isAuth ? `Chào, ${name}` : "Sign\u00A0in"}
      </span>
    </Link>
  );
}

export default User;
