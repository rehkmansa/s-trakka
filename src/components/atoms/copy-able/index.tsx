import { useState } from 'react';
import { CopyIcon } from '~/components/atoms/copy-able/copy-icon';
import { useTimeout } from '~/hooks/use-timeout';
import { cn } from '~/lib/utils/helpers';
import { PropsWithClassname } from '~/types/global';

const TIMEOUT_DURATION = 1500;

interface CopyAbleProps extends PropsWithClassname {
  text: string;
  iconClassName?: string;
  smallIcon?: boolean;
  allowCopy?: boolean;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const CopyAble = (props: CopyAbleProps) => {
  const {
    children,
    text,
    className,
    'aria-label': ariaLabel = 'Copy content',
    allowCopy = true,
  } = props;
  const [copied, setCopied] = useState(false);
  const { setTimeOut } = useTimeout();

  const copyText = async () => {
    if (copied) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (_) {
      alert('Failed to copy text');
    } finally {
      setTimeOut(() => setCopied(false), TIMEOUT_DURATION);
    }
  };

  if (!allowCopy) return children;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {children}
      <button
        className={cn(
          'outline-none focus-visible:ring rounded-[2px] focus-visible:ring-component-outlines hover:ring-0',
          {
            'cursor-default focus-visible:ring-0': copied,
          }
        )}
        onClick={copyText}
        aria-label={ariaLabel}
      >
        <CopyIcon copied={copied} />
      </button>
    </div>
  );
};
