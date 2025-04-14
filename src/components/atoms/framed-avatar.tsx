import { motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '~/lib/utils/helpers';
import { PropsWithClassname } from '~/types/global';

const ANIMATION_DURATION = 0.8;
const VERTICAL_LINES_CLASSNAME =
  'absolute top-1/2 h-[60%] w-px -translate-y-1/2 bg-pfp-outline transition-all ease-out duration-300';

const CORNERS = {
  TOP: {
    LEFT: 'M11 1H4a3 3 0 00-3 3v7',
    RIGHT: 'M11 11V4a3 3 0 00-3-3H1',
  },
  BOTTOM: {
    LEFT: 'M1 1v7a3 3 0 003 3h7',
    RIGHT: 'M1 11h7a3 3 0 003-3V1',
  },
};

/**
 * The goal is to get the animation play sequentially hence,
 * First has a delay of 0,
 * Second has a delay 1 * 0.4 and so on.
 */
const delayAnimation = (position: number) => ANIMATION_DURATION * position;

interface DrawnPathProps extends PropsWithClassname {
  dPath: string;
  position: number;
}

export const DrawnPath = ({ className, dPath, position }: DrawnPathProps) => (
  <motion.svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('absolute text-pfp-outline', className)}
  >
    <motion.path
      d={dPath}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ pathLength: 0, pathOffset: 1 }}
      animate={{ pathLength: 1, pathOffset: 0 }}
      transition={{
        duration: ANIMATION_DURATION,
        ease: 'easeInOut',
        delay: delayAnimation(position),
      }}
    />
  </motion.svg>
);

export interface FramedAvatarProps {
  src: string;
  className?: string;
  wrapperClassName?: string;
}

const Frame = ({ hovered }: { hovered: boolean }) => (
  <div
    className={cn('absolute -inset-px duration-300 ease-out transition-all', {
      '-inset-0.5': hovered,
    })}
  >
    {/* Vertical outlines. */}
    <div
      className={cn(VERTICAL_LINES_CLASSNAME, 'left-px', { 'left-1 bg-transparent': hovered })}
    />
    <div
      className={cn(VERTICAL_LINES_CLASSNAME, 'right-px', { 'right-1 bg-transparent': hovered })}
    />

    {/* Corners. */}
    <DrawnPath className="top-0 left-0" dPath={CORNERS.TOP.LEFT} position={0} />
    <DrawnPath className="top-0 right-0" dPath={CORNERS.TOP.RIGHT} position={1} />
    <DrawnPath className="bottom-0 right-0" dPath={CORNERS.BOTTOM.RIGHT} position={2} />
    <DrawnPath className="bottom-0 left-0" dPath={CORNERS.BOTTOM.LEFT} position={3} />
  </div>
);

// TODO: Add shimmer effect on hover.
export const FramedAvatar = (props: FramedAvatarProps) => {
  const { src, className, wrapperClassName } = props;

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={cn('relative', wrapperClassName)}
    >
      <Frame hovered={hovered} />
      <img
        src={src}
        className={cn('relative rounded-xs object-cover overflow-hidden', className)}
        alt=""
      />
    </motion.div>
  );
};
