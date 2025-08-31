import Spinner from "@/app/_components/Spinner";

function loading() {
  return (
    <div className="bg-primary-400/30 flex min-h-screen items-center justify-center">
      <Spinner type="bar" color="var(--color-accent-900)" size={60} />
    </div>
  );
}

export default loading;
