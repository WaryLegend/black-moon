export type AppPageProps<P = any, S = any> = {
  params: Promise<P>;
  searchParams: Promise<S>;
};
