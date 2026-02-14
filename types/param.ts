export type ParamProps<P = any, S = any> = {
  params: Promise<P>;
  searchParams: Promise<S>;
};
