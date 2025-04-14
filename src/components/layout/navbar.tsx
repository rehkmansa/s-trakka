import { Link } from '~/components/atoms/link';
import { Logo } from '~/components/atoms/logo';
import { Searchbar } from '~/components/molecules/searchbar';
import { ProfileInfo } from '~/components/molecules/profile-info';
import { NAV_LINKS } from '~/constants/meta';
import { cn } from '~/lib/utils/helpers';
import { MOCK_TOP_BAR_PROFILE } from '~/mock/data';

export const Navbar = () => {
  return (
    <header className="flex gap-10 justify-between items-center p-[22px] border-b border-component-outlines">
      <div className="flex items-center justify-between gap-10 w-full max-w-[460px] pl-[22px]">
        <Link className="w-full max-w-10">
          <Logo />
        </Link>
        <nav className="text-sub-text font-medium gap-3.5 w-full flex items-center justify-between max-w-[427px]">
          {NAV_LINKS.map((li) => (
            <Link
              className={cn('px-4 text-center relative whitespace-nowrap', {
                'before:absolute before:-bottom-0.5 before:rounded-xs before:w-1/4 before:bg-base-red before:h-0.5 before:left-1/2 before:-translate-x-1/2':
                  li?.active,
              })}
              key={li.label}
              href={li.href}
            >
              {li.label}
            </Link>
          ))}
        </nav>
      </div>
      <Searchbar wrapperClassName="w-full max-w-[603px]" iconClassName="text-sub-text" />
      <ProfileInfo className="w-full max-w-[250px]" variant="secondary" {...MOCK_TOP_BAR_PROFILE} />
    </header>
  );
};
