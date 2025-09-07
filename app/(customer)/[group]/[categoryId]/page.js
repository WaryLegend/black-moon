import { notFound } from "next/navigation";

async function Page({ params }) {
  const { group, categoryId } = await params;

  const validGroup = ["women", "men", "kids"];
  if (!validGroup.includes(group)) {
    notFound();
  }

  return (
    <div>
      we are in /{group}/{categoryId}
    </div>
  );
}

export default Page;
