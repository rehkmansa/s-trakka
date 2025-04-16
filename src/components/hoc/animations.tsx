import { motion, MotionProps } from 'motion/react';
import { JSX } from 'react';

type Keys = keyof JSX.IntrinsicElements;

type TransitionProps = MotionProps['transition'];

function getMotionProps(animate: boolean, name: string) {
  return animate
    ? { animate: name, whileInView: undefined }
    : { whileInView: name, animate: undefined };
}

const createComp = (comp?: Keys) =>
  motion[(comp ?? 'div') as keyof typeof motion] as typeof motion.div;

const createBaseSpringAnimation = (transition: TransitionProps) => ({
  type: 'spring',
  stiffness: 50,
  damping: 20,
  visualDuration: 0.7,
  ...transition,
});

type BaseAnimationProps<Extras> = {
  children: React.ReactNode;
  className?: string;
  transition?: TransitionProps;
} & Extras;

export type FadeYAnimationProps = BaseAnimationProps<{
  initialY?: number;
  as?: keyof JSX.IntrinsicElements;
}>;

interface FadeYWhileInViewProps extends FadeYAnimationProps {
  amount?: number;
  framerProps?: MotionProps;
}

export const FadeYWhileInView = ({
  children,
  initialY = 40,
  className,
  as: comp = 'div',
  transition,
  amount = 0.3,
  framerProps,
}: FadeYWhileInViewProps) => {
  const Comp = createComp(comp);

  return (
    <Comp
      {...framerProps}
      initial={{ y: initialY, opacity: 0, scale: 1 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      transition={createBaseSpringAnimation(transition)}
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </Comp>
  );
};

export const FadeY = ({
  children,
  initialY = 40,
  className,
  as: comp = 'div',
  transition,
}: FadeYAnimationProps) => {
  const Comp = createComp(comp);

  return (
    <Comp
      initial={{ y: initialY, opacity: 0, scale: 1 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={createBaseSpringAnimation(transition)}
      className={className}
    >
      {children}
    </Comp>
  );
};

type StaggeredAnimationProps = Omit<FadeYAnimationProps, 'transition'> & {
  delay?: number;
  amountInView?: number;
  animate?: boolean;
  initialOpacity?: number;
};

export const StaggeredAnimation = ({
  children,
  as: comp,
  className,
  initialY = 5,
  delay,
  amountInView = 0.35,
  animate = false,
  initialOpacity = 1,
}: StaggeredAnimationProps) => {
  const Comp = createComp(comp);

  const containerVariants = {
    hidden: { opacity: initialOpacity, y: initialY },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        type: 'spring',
        bounce: 0.1,
        visualDuration: 0.35,
        delay,
      },
    },
  };

  const animationProps = getMotionProps(animate, 'show');

  return (
    <Comp
      initial="hidden"
      viewport={{ once: true, amount: amountInView }}
      variants={containerVariants}
      className={className}
      {...animationProps}
    >
      {children}
    </Comp>
  );
};

type StaggeredChildProps = Omit<FadeYAnimationProps, 'transition'> &
  React.ComponentProps<typeof motion.div>;

const StaggerChild = ({
  children,
  as: comp,
  className,
  initialY = 30,
  ...props
}: StaggeredChildProps) => {
  const Comp = createComp(comp);

  const cardVariants = {
    hidden: { opacity: 0, y: initialY },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 30,
        visualDuration: 1,
      },
    },
  };

  return (
    <Comp variants={cardVariants} className={className} {...props}>
      {children}
    </Comp>
  );
};

StaggeredAnimation.Child = StaggerChild;
