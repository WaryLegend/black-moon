import Link from "next/link";

const messages = [
  "Sorry, we couldn’t find the page you’re looking for.",
  "Whoops! This page seems to have vanished.",
  "Looks like you’ve hit a dead end.",
  "This page is lost in cyberspace!",
  "Seems you’ve taken a wrong turn.",
];

// Function to get a random message (runs on server)
const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export default function NotFound() {
  const message = getRandomMessage();

  return (
    <div className="bg-primary-100 flex min-h-full flex-col items-center justify-center p-6 text-center">
      <h1 className="text-primary-800 mb-8 text-5xl font-bold text-shadow-2xs">
        404 <span className="text-primary-400">-</span>{" "}
        <span className="text-accent-600">Page Not Found</span>
      </h1>
      <p className="text-primary-600 mb-8 max-w-md text-lg">{message}</p>
      <Link
        href="/"
        className="border-accent-500 text-accent-500 hover:bg-accent-100 rounded-lg border px-6 py-3 text-lg transition-colors duration-200"
        replace={true}
      >
        Back to Homepage
      </Link>
    </div>
  );
}
