import ReactLenis from 'lenis/react';
import { type PropsWithChildren } from 'react';

export const SmoothScroll = ({ children }: PropsWithChildren) => (
  <ReactLenis options={{ duration: 0.25, syncTouch: true }}>{children}</ReactLenis>
);
