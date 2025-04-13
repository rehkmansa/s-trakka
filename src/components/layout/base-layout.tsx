import { type PropsWithChildren } from 'react';
import { Navbar } from '~/components/layout/navbar';
import { SmoothScroll } from '~/components/organisms/smooth-scrolling';

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <SmoothScroll>
      <Navbar />
      <main>{children}</main>
    </SmoothScroll>
  );
};
