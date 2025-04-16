import { motion } from 'motion/react';
import { TextWithEthIcon } from '~/components/atoms/text-with-eth-icon';
import { useUserProfile } from '~/hooks/use-user-profile';
import { cn } from '~/lib/utils/helpers';
import { UserProfile } from '~/mock/generate-user-profile';

const SVGBackground = () => {
  return (
    <svg
      width={248}
      height={282}
      viewBox="0 0 248 282"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none origin-right"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M11.75 5.00001C11.75 2.37665 13.8766 0.25 16.5 0.25H243C245.623 0.25 247.75 2.37665 247.75 5V245.814C247.75 247.178 247.164 248.476 246.141 249.377L210.752 280.564C209.884 281.328 208.768 281.75 207.611 281.75H5C2.37665 281.75 0.25 279.623 0.25 277V119.985C0.25 119.081 0.507742 118.196 0.992979 117.434L10.9288 101.825C11.4651 100.983 11.75 100.005 11.75 99.0061V5.00001Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1}
        className="stroke-base-green fill-highlight-bg"
        // initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.25 }}
      />
    </svg>
  );
};

const Meta = ({ profitable }: { profitable: boolean }) => {
  return (
    <div
      className={cn('text-base-green text-sm flex items-center gap-1', {
        'text-base-red': !profitable,
      })}
    >
      <div className={cn('size-2.5 bg-base-green -mt-0.5', { 'bg-base-red': !profitable })} />{' '}
      <p className="leading-none">{!profitable ? 'NOT ' : ''}PROFITABLE TRADER</p>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center text-sm">
    <p className="font-medium">{label}</p>
    <TextWithEthIcon className="text-right ml-auto">{value}</TextWithEthIcon>
  </div>
);

export interface UserProfileCardProps {
  name: string;
}

const fields: { label: string; key: Exclude<keyof UserProfile, 'profitable'> }[] = [
  { key: 'balance', label: 'Balance' },
  { key: 'est_value', label: 'Est. Value.' },
  { key: 'pnl', label: 'PNL' },
  { key: 'upnl', label: 'UPNL' },
];

export const UserProfileCard = ({ name }: UserProfileCardProps) => {
  const { profitable, ...details } = useUserProfile(name);

  return (
    <motion.div className="relative w-[248px] min-h-[282px]">
      <span className="font-accent text-[8px]/[1] text-sub-text absolute right-[-12px] z-[1] top-[60px] rotate-90">
        TRADER_RECAP
      </span>
      <SVGBackground />
      <div className="p-[34px] relative space-y-5">
        <div className="space-y-2">
          <h4 className="font-bold text-[25px]/[1.2] text-white">{name}</h4>
          <Meta profitable={profitable} />
        </div>
        <div className="space-y-5">
          {fields.map((f) => (
            <Row key={f.key} label={f.label} value={details[f.key]} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
