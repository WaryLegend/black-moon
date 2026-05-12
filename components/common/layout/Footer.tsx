import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-0">
      <div className="text-primary-700 mx-auto flex max-w-[1750px] flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:flex-row sm:px-10 md:px-20 lg:px-30">
        <p>© {year} Black & Moon. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-xl text-pink-500 hover:text-pink-600" />
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-xl text-blue-600 hover:text-blue-700" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
