import { useEffect, useRef, useState } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

/** NodeJS.Timeout type is missing */
type Timeout = number;

const usePopover = <TriggerRef extends HTMLElement, ContentRef extends HTMLElement>() => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<TriggerRef | null>(null);
  const contentRef = useRef<ContentRef | null>(null);
  const timeoutRef = useRef<null | Timeout>(null);

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const close = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  };

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !triggerRef.current?.contains(e.target as Node) &&
        !contentRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
    triggerRef,
    contentRef,
  };
};

type WithBaseProps<T, Ref extends HTMLElement> = {
  ref: React.Ref<Ref>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
} & T;

type TriggerProps<T extends HTMLElement> = WithBaseProps<{ onClick(): void }, T>;

type ChildrenProps<T extends HTMLElement> = WithBaseProps<{ isOpen: boolean }, T>;

interface PopoverProps<TRef extends HTMLElement, CRef extends HTMLElement> {
  renderTrigger: (props: TriggerProps<TRef>) => React.ReactNode;
  renderContent: (props: ChildrenProps<CRef>) => React.ReactNode;
}

export const Popover = <TRef extends HTMLElement, CRef extends HTMLElement>({
  renderContent,
  renderTrigger,
}: PopoverProps<TRef, CRef>) => {
  const { isOpen, open, close, toggle, triggerRef, contentRef } = usePopover<TRef, CRef>();

  const baseProps = { onMouseEnter: open, onMouseLeave: close };

  const toggleVisibility = (show: boolean) => {
    if (show) return open();
    return close();
  };

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={toggleVisibility}>
      <PopoverPrimitive.Trigger asChild>
        {renderTrigger({ ...baseProps, ref: triggerRef, onClick: toggle })}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content align="end" asChild sideOffset={0}>
          {renderContent({ ...baseProps, ref: contentRef, isOpen })}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};
