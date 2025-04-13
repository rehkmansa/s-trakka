import clsx from 'clsx';
import LogoImg from '~/assets/logo.png';
import { SITE_NAME } from '~/constants/meta';
import { cn } from '~/lib/utils/helpers';
import { PropsWithClassname } from '~/types/global';

export type LogoProps = PropsWithClassname;

export const Logo = ({ className }: LogoProps) => (
  <img
    src={LogoImg}
    alt={clsx(SITE_NAME, 'logo')}
    className={cn('w-full max-w-[39px] h-[18px]', className)}
  />
);
