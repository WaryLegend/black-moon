export type BreadCrumbItem = {
  slug: string;
  name: string;
};

export type BreadCrumbPaths = {
  group?: BreadCrumbItem;
  category?: BreadCrumbItem;
  product?: BreadCrumbItem;
};
