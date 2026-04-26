import type { HomeTargetGroup } from "@/types/homepage";
import Image from "next/image";

type GroupHeroProps = {
  group: HomeTargetGroup;
};

export default function GroupHero({ group }: GroupHeroProps) {
  return (
    <section className="bg-primary-50/75 absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center transition-all">
      {group.imageUrl ? (
        <Image
          src={group.imageUrl}
          alt={`${group.name}-image`}
          fill
          quality={90}
          priority
          className="pointer-events-none absolute inset-0 object-cover opacity-90"
        />
      ) : null}

      <div className="from-primary-200/40 absolute inset-0 bg-gradient-to-tr via-transparent to-transparent" />

      <div className="absolute bottom-15 left-10 max-w-xl md:bottom-16 md:left-15 lg:left-30">
        <h1 className="mb-4 text-4xl font-bold tracking-tight uppercase drop-shadow-2xl sm:text-5xl md:text-[55px]">
          <span className="text-primary-800">Black</span>
          <span className="text-primary-200 text-2xl sm:text-3xl">&</span>
          <span className="text-accent-500">Moon</span>
          <br />
          <span
            className="text-xl font-medium text-blue-600 uppercase sm:text-2xl md:text-3xl"
            style={{
              WebkitTextStroke: "2px",
              WebkitTextFillColor: "transparent",
            }}
          >
            {group.slug}&apos;s Collection
          </span>
        </h1>
        <p className="text-primary-800 text-sm leading-relaxed drop-shadow-lg sm:text-xl">
          Khám phá bộ sưu tập mới nhất dành cho {group.name.toLowerCase()}.
        </p>
      </div>
    </section>
  );
}
