import { AnimatePresence, motion } from 'motion/react';

const CopyIconPath = () => (
  <>
    <motion.path
      key="p1"
      d="M16 3H4v13"
      stroke="#7E7E7E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
    <motion.path
      key="p2"
      d="M8 7h12v12a2 2 0 01-2 2h-8a2 2 0 01-2-2V7z"
      stroke="#7E7E7E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
    />
  </>
);

const CheckIconPath = () => (
  <motion.path
    d="M5 13l4 4L19 7"
    stroke="#4CAF50"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  />
);

export const CopyIcon = ({ copied }: { copied: boolean }) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: 'pointer' }}
  >
    <AnimatePresence mode="wait">
      {copied ? <CheckIconPath key="check-icon" /> : <CopyIconPath key="copy-icon" />}
    </AnimatePresence>
  </svg>
);
