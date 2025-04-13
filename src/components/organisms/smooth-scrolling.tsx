import ReactLenis from 'lenis/react';
import { type PropsWithChildren } from 'react';

export const SmoothScroll = ({ children }: PropsWithChildren) => (
  <ReactLenis root options={{ duration: 3, syncTouch: true }}>
    {children}
  </ReactLenis>
);
