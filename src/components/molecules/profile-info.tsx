import { CopyAble } from '~/components/atoms/copy-able';
import { cn } from '~/lib/utils/helpers';

export interface ProfileInfoProps {
  variant?: 'primary' | 'secondary';
  allowCopy?: boolean;
  src: string;
  name: string;
  walletAddress: string;
}

export const ProfileInfo = (props: ProfileInfoProps) => {
  const { allowCopy = false, variant = 'primary', name, src, walletAddress } = props;
  const isSecondary = variant === 'secondary';

  return (
    <div
      className={cn('flex flex-row items-center gap-6', {
        'flex-row-reverse text-right': isSecondary,
      })}
    >
      <img className={cn('size-[92px]', { 'size-[60px]': isSecondary })} src={src} alt="" />
      <div className="space-y-1">
        <CopyAble text={name} allowCopy={allowCopy}>
          <h4 className={cn('text-2xl leading-none', { 'text-xl': isSecondary })}>{name}</h4>
        </CopyAble>
        <CopyAble text={walletAddress} allowCopy={allowCopy}>
          <p className={cn('text-base text-base-red leading-none', { 'text-sm': isSecondary })}>
            {walletAddress}
          </p>
        </CopyAble>
      </div>
    </div>
  );
};
