import { TransactionsTable } from '~/components/molecules/transactions-table';

export const LiveTokenActivity = () => {
  return (
    <div className="relative w-full flex-1 bg-component-bg shrink-0">
      <div className="py-6 text-center">
        <h4 className="font-medium text-xl/[1]">LIVE ACTIVITY</h4>
      </div>
      <TransactionsTable />

      <svg
        width={1303}
        height={368}
        viewBox="0 0 1303 368"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M21.6747 24.6788L21.6748 24.6789L21.6804 24.6731L43.7044 1.71193C44.6002 0.778001 45.8382 0.25 47.1323 0.25H906.5H929H1020H1069.5H1298C1300.62 0.25 1302.75 2.37665 1302.75 5V319.008C1302.75 320.223 1302.28 321.392 1301.45 322.274L1259.8 366.266C1258.9 367.213 1257.65 367.75 1256.35 367.75H5.00003C2.37668 367.75 0.25 365.623 0.25 363V47.6056C0.25 46.3265 0.765911 45.1014 1.68099 44.2076L21.6747 24.6788Z"
          fill="transparent"
          className="stroke-component-outlines"
          stroke="currentColor"
          strokeWidth={0.5}
        />
      </svg>
    </div>
  );
};
