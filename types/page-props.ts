export type AppPageProps<P = unknown, S = unknown> = {
  params: Promise<P>;
  searchParams: Promise<S>;
};
