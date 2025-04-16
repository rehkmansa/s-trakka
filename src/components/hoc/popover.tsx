import { useEffect, useRef, useState } from 'react';

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

type Props<TriggerRef, ContentRef> = {
  children: (options: {
    isOpen: boolean;
    triggerProps: {
      ref: React.Ref<TriggerRef>;
      onClick: () => void;
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    };
    contentProps: {
      ref: React.Ref<ContentRef>;
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    };
  }) => React.ReactNode;
};

export const Popover = <TriggerRef extends HTMLElement, ContentRef extends HTMLElement>({
  children,
}: Props<TriggerRef, ContentRef>) => {
  const { isOpen, open, close, toggle, triggerRef, contentRef } = usePopover<
    TriggerRef,
    ContentRef
  >();

  return children({
    isOpen,
    triggerProps: {
      ref: triggerRef,
      onClick: toggle,
      onMouseEnter: open,
      onMouseLeave: close,
    },
    contentProps: {
      ref: contentRef,
      onMouseEnter: open,
      onMouseLeave: close,
    },
  });
};
