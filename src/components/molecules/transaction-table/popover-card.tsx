import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { UserProfileCard } from '~/components/molecules/user-profile-card';

const MAX_ROTATION = 10;

export const TransactionTablePopoverCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 100, damping: 10 });
  const rotateY = useSpring(rawY, { stiffness: 100, damping: 10 });

  useEffect(() => {
    if (!cardRef.current) return;

    const el = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const offsetX = (x / rect.width - 0.5) * 2;
      const offsetY = (y / rect.height - 0.5) * 2;

      rawY.set(offsetX * MAX_ROTATION);
      rawX.set(-offsetY * MAX_ROTATION);
    };

    const reset = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', reset);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', reset);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className=""
    >
      <UserProfileCard />
    </motion.div>
  );
};
