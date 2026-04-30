import { useEffect, useRef, useCallback, useState } from 'react';

interface UseInfiniteScrollProps {
  enabled?: boolean;
  onLoadMore: () => void;
}
export const useInfiniteScroll = <T extends HTMLElement = HTMLElement>({
  enabled = true,
  onLoadMore,
}: UseInfiniteScrollProps) => {
  const containerRef = useRef<T>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFetchingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    onLoadMore();
  }, [onLoadMore]);

  const resetLoading = useCallback(() => {
    isFetchingRef.current = false;
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!enabled || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isFetchingRef.current) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [enabled, loadMore]);

  return {
    containerRef,
    sentinelRef, // 👈 этот ref нужно поставить в конец списка
    isLoading,
    resetLoading,
  };
};
