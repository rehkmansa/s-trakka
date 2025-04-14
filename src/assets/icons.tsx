// Simplicity over abstraction – since this is a small-scale project with a
// limited icon set, I'm opting for direct component exports instead of dynamic
// loading or an icon pack. In a larger project, something like
// `vite-plugin-svgr` with single-file SVG imports would be better.

export type IconProps = React.SVGProps<SVGSVGElement>;

export const SearchIcon = (props: IconProps) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.908 17.25l-6.037-6.037a5.841 5.841 0 01-3.642 1.246c-1.74 0-3.214-.604-4.42-1.81C.604 9.443.001 7.969 0 6.229c0-1.74.603-3.214 1.81-4.42C3.015.604 4.488.001 6.23 0c1.74 0 3.214.603 4.42 1.81 1.206 1.206 1.809 2.679 1.808 4.42a5.841 5.841 0 01-1.245 3.64l6.037 6.038-1.342 1.342zM6.23 10.542c1.198 0 2.216-.42 3.055-1.258.84-.838 1.258-1.856 1.258-3.055 0-1.198-.42-2.216-1.258-3.054-.838-.838-1.856-1.258-3.055-1.258-1.198 0-2.216.42-3.054 1.258-.838.839-1.258 1.857-1.258 3.054 0 1.198.42 2.216 1.258 3.055.839.84 1.857 1.258 3.054 1.258z"
      fill="currentColor"
    />
  </svg>
);

export const EthIcon = (props: IconProps) => (
  <svg
    width={11}
    height={14}
    viewBox="0 0 11 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.737.574l4.738 6.432-4.737 6.432L1 7.006 5.737.574z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.475 7.006L5.737 8.58 1 7.006"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
