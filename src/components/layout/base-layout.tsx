import { type PropsWithChildren } from 'react';
import { Navbar } from '~/components/layout/navbar';

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main className="p-2.5 flex-1 overflow-hidden flex flex-col">{children}</main>
    </>
  );
};
