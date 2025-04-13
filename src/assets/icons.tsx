// Simplicity over abstraction – since this is a small-scale project with a
// limited icon set, I'm opting for direct component exports instead of dynamic
// loading or an icon pack. In a larger project, something like
// `vite-plugin-svgr` with single-file SVG imports would be better.

export type IconProps = React.SVGProps<SVGSVGElement>;

export const SearchIcon = (props: IconProps) => (
  <svg
    width={15}
    height={18}
    viewBox="0 0 15 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.81 17.25l-5.241-6.037a4.81 4.81 0 01-1.435.91 4.473 4.473 0 01-1.726.335c-1.512 0-2.79-.603-3.837-1.809C.524 9.443 0 7.969 0 6.229c0-1.74.524-3.214 1.57-4.42C2.619.604 3.898.001 5.409 0c1.51 0 2.79.603 3.837 1.81 1.047 1.206 1.57 2.679 1.57 4.42 0 .702-.097 1.365-.291 1.988a6.014 6.014 0 01-.79 1.653l5.24 6.037-1.164 1.342zm-8.402-6.708c1.04 0 1.923-.42 2.652-1.258.728-.838 1.092-1.856 1.091-3.055 0-1.198-.364-2.216-1.091-3.054-.728-.838-1.612-1.258-2.652-1.258s-1.924.42-2.652 1.258c-.727.839-1.092 1.857-1.092 3.054 0 1.198.364 2.216 1.092 3.055.728.84 1.612 1.258 2.652 1.258z"
      fill="currentColor"
    />
  </svg>
);
