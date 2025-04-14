import { useState } from 'react';
import { SearchIcon } from '~/assets/icons';
import { cn } from '~/lib/utils/helpers';

interface SearchbarProps {
  wrapperClassName?: string;
  iconClassName?: string;
  inputClassName?: string;
  placeholder?: string;

  onSearch?: (search: string) => void;
}

export const Searchbar = (props: SearchbarProps) => {
  const { iconClassName, inputClassName, placeholder, wrapperClassName } = props;
  const [text, setText] = useState('');

  const search = (e: React.SyntheticEvent) => {
    e.preventDefault();

    //
  };

  return (
    <form onSubmit={search} className={cn('relative w-full text-base', wrapperClassName)}>
      <SearchIcon className={cn('absolute top-1/2 left-3.5 -translate-y-1/2', iconClassName)} />
      <input
        value={text}
        className={cn(
          'outline-none border-component-outlines font-extralight border w-full pl-10 rounded-sm tracking-wider h-[33px] placeholder:text-sub-text',
          inputClassName
        )}
        placeholder={placeholder ?? 'Search for token name or address'}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};
