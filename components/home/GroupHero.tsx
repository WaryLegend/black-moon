import type { HomeTargetGroup } from "@/types/homepage";
import Image from "next/image";

const GROUP_PRESENTATION: Record<
  string,
  {
    strokeColor: string;
    gradient: string;
    position: string;
    description: string;
  }
> = {
  women: {
    strokeColor: "text-pink-600",
    gradient: "bg-gradient-to-tr",
    position:
      "absolute bottom-15 left-10 max-w-xl md:bottom-16 md:left-15 lg:left-30",
    description:
      "Thanh lịch, hiện đại và đầy cá tính — bộ sưu tập dành riêng cho người phụ nữ của hôm nay.",
  },
  men: {
    strokeColor: "text-blue-600",
    gradient: "bg-gradient-to-tl",
    position:
      "absolute right-10 top-1/2 -translate-y-1/2 max-w-xl md:right-15 lg:right-30 text-right",
    description:
      "Phong cách tối giản, chất liệu cao cấp — định nghĩa lại sự nam tính.",
  },
  kids: {
    strokeColor: "text-yellow-600",
    gradient: "bg-gradient-to-b",
    position: "absolute top-24 left-1/2 -translate-x-1/2 text-center md:top-32",
    description:
      "Thoải mái, bền bỉ và đầy màu sắc — để các bé tự tin vui chơi mỗi ngày.",
  },
};

const defaultPresentation = GROUP_PRESENTATION["women"];

type GroupHeroProps = {
  group: HomeTargetGroup;
};

export default function GroupHero({ group }: GroupHeroProps) {
  const presentation = GROUP_PRESENTATION[group.slug] ?? defaultPresentation;

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

      <div
        className={`from-primary-200/40 absolute inset-0 ${presentation.gradient} via-transparent to-transparent`}
      />

      <div className={presentation.position}>
        <h1 className="mb-4 text-4xl font-bold tracking-tight uppercase drop-shadow-2xl sm:text-5xl md:text-[55px]">
          <span className="text-primary-800">Black</span>
          <span className="text-primary-200 text-2xl sm:text-3xl">&</span>
          <span className="text-accent-500">Moon</span>
          <br />
          <span
            className={`${presentation.strokeColor} text-xl font-light uppercase sm:text-2xl md:text-3xl`}
            style={{
              WebkitTextStroke: "2px",
              WebkitTextFillColor: "transparent",
            }}
          >
            {group.slug} &apos;s Collection
          </span>
        </h1>
        <p className="text-primary-800 text-sm leading-relaxed drop-shadow-lg sm:text-lg">
          {presentation.description ||
            `Khám phá bộ sưu tập mới nhất dành cho ${group.name.toLowerCase()}.`}
        </p>
      </div>
    </section>
  );
}
