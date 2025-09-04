import Spinner from "@/app/_components/Spinner";

function loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner type="bar" color="var(--color-accent-900)" size={60} />
    </div>
  );
}

export default loading;
