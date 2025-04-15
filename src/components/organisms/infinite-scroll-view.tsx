import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollViewProps {
  children: React.ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export const InfiniteScrollView = ({
  children,
  onLoadMore,
  hasMore,
  loading,
  threshold = 0.3,
  rootMargin = '0px',
  className,
}: InfiniteScrollViewProps) => {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: false,
  });

  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (inView && hasMore && !loading && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      onLoadMore();
    }
  }, [inView, hasMore, loading, onLoadMore]);

  // Reset trigger state when loading ends.
  useEffect(() => {
    if (!loading) {
      hasTriggeredRef.current = false;
    }
  }, [loading]);

  return (
    <div className={className}>
      {children}
      {hasMore && <div ref={ref} className="w-full h-1" />}
    </div>
  );
};
