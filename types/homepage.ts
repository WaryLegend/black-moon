export type HomePageProps = {
  params: Promise<{
    group?: string;
  }>;
};

export type HomeTargetGroup = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
};

export type HomeCategory = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
  imageName?: string | null;
  groupSlug: string;
};
