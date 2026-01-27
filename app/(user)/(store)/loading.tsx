import Spinner from "@/components/ui/Spinner";

function loading() {
  return (
    <div className="flex min-h-full items-center justify-center">
      <Spinner type="bar" color="var(--color-accent-900)" size={60} />
    </div>
  );
}

export default loading;
