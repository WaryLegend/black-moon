"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviewsByProduct } from "@/lib/data-service";

export function useReviewsByProduct({ productId, limit = 10 }) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [`reviews-${productId}`], // No need for offset/limit in key; infinite handles pages
    queryFn: ({ pageParam = 0 }) =>
      getReviewsByProduct({ productId, pageParam, limit }),
    getNextPageParam: (lastPage, allPages) => {
      // Calculate next offset as the total reviews fetched so far
      const fetchedCount = allPages.reduce(
        (sum, page) => sum + page.reviews.reviews.length,
        0,
      );
      // Return next offset if more reviews exist, else undefined (stops pagination)
      return fetchedCount < lastPage.reviews.total ? fetchedCount : undefined;
    },
    staleTime: 60 * 1000 * 5,
  });

  // Flatten all fetched reviews into a single array
  const allReviews = data?.pages.flatMap((page) => page.reviews.reviews) || [];

  // Take product, total, and avgRating from the first page (they're consistent across fetches)
  const product = data?.pages[0]?.product;
  const total = data?.pages[0]?.reviews.total || 0;
  const avgRating = data?.pages[0]?.reviews.avgRating || 0;

  return {
    isLoading,
    product,
    reviews: { total, avgRating, reviews: allReviews },
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
