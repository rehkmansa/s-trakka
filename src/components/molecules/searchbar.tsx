import { SearchIcon } from '~/assets/icons';
import { cn } from '~/lib/utils/helpers';

interface SearchbarProps {
  wrapperClassName?: string;
  iconClassName?: string;
  inputClassName?: string;
  placeholder?: string;

  onSearch?: (e: React.FormEvent) => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Searchbar = (props: SearchbarProps) => {
  const {
    iconClassName,
    inputClassName,
    placeholder,
    wrapperClassName,
    onChange,
    onSearch,
    value,
  } = props;

  const search = (e: React.FormEvent) => {
    // No current implementation for this
    e.preventDefault();
    onSearch?.(e);
  };

  return (
    <form onSubmit={search} className={cn('relative w-full text-base', wrapperClassName)}>
      <SearchIcon className={cn('absolute top-1/2 left-3.5 -translate-y-1/2', iconClassName)} />
      <input
        value={value}
        className={cn(
          'outline-none border-component-outlines font-extralight border w-full pl-10 rounded-sm tracking-wider h-[33px] placeholder:text-sub-text',
          inputClassName
        )}
        placeholder={placeholder ?? 'Search for token name or address'}
        onChange={onChange}
      />
    </form>
  );
};
