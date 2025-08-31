import Link from "next/link";

const messages = [
  "The admin page you’re trying to access doesn’t exist.",
  "Oops! This admin page is lost in the void.",
  "Looks like this admin route doesn’t exist.",
  "This admin page is nowhere to be found!",
  "Seems you’ve wandered into uncharted admin territory.",
];

// Function to get a random message (runs on server)
const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

export default function NotFound() {
  const message = getRandomMessage();
  return (
    <div className="flex min-h-full flex-col items-center justify-center p-6 text-center">
      <h1 className="text-primary-800 mb-8 text-5xl font-bold text-shadow-2xs">
        404 <span className="text-primary-400">-</span>{" "}
        <span className="text-accent-600">Page Not Found</span>
      </h1>
      <p className="text-primary-600 mb-8 max-w-md text-lg">{message}</p>
      <Link
        href="/admin/dashboard"
        className="border-accent-500 text-accent-500 hover:bg-accent-100 rounded-lg border px-6 py-3 text-lg transition-colors duration-200"
        replace={true}
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
