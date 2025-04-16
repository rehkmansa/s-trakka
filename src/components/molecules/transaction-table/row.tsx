import { AnimatePresence } from 'motion/react';
import { NeonText } from '~/components/atoms/neon-text';
import { FadeYWhileInView } from '~/components/hoc/animations';
import { Popover } from '~/components/hoc/popover';
import { TokenMap } from '~/context/selected-token';
import { Transaction } from '~/lib/utils/generate-transactions';
import { cn, shortenUsername } from '~/lib/utils/helpers';
import { motion } from 'motion/react';
import { TransactionTablePopoverCard } from '~/components/molecules/transaction-table/popover-card';

export const TRANSACTION_TABLE_GRID_STYLE = 'grid grid-cols-9 gap-2 px-12';

const cardVariants = {
  initial: {
    opacity: 0,
    rotateX: -50,
    x: -50,
    y: -20,
    transformPerspective: 1000,
    z: -40,
    skewX: 20,
    scale: 0.4,
  },
  animate: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    x: 0,
    transformPerspective: 1000,
    transition: { duration: 0.4, ease: 'easeOut' },
    z: 0,
    skewX: 0,
    scale: 1,
  },
};

export const TransactionTableRow = ({
  transaction,
  tokens,
}: {
  transaction: Transaction;
  tokens: TokenMap;
}) => {
  return (
    <FadeYWhileInView
      initialY={15}
      className="h-5 first-of-type:mt-2 last-of-type:pb-2 flex items-center justify-center"
      // props={{onHoverStart: }}
    >
      <div className={cn('w-full', TRANSACTION_TABLE_GRID_STYLE)}>
        <span>{transaction.time}</span>
        <NeonText
          className="uppercase"
          variant={transaction.type === 'buy' ? 'uptrend' : 'downtrend'}
        >
          {transaction.type}
        </NeonText>
        <span>{tokens[transaction.token]?.name ?? transaction.token}</span>
        <span>{transaction.price_usd}</span>
        <span>{transaction.token_amount.toFixed(3)}</span>
        <span>{transaction.weth.toFixed(2)}</span>
        <span>{transaction.usd}</span>
        <NeonText variant={transaction.pnl < 1 ? 'downtrend' : 'uptrend'}>
          {Math.abs(transaction.pnl).toFixed(2)}
        </NeonText>
        <Popover<HTMLButtonElement, HTMLDivElement>
          renderTrigger={(props) => (
            <button className="text-left w-full" type="button" {...props}>
              {shortenUsername(transaction.user)}
            </button>
          )}
          renderContent={({ isOpen, ...props }) => (
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={cardVariants}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: 1000,
                    transformOrigin: 'bottom-right',
                  }}
                  {...props}
                >
                  <TransactionTablePopoverCard />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        />
      </div>
    </FadeYWhileInView>
  );
};
