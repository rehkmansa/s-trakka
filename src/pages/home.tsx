import { LeftView } from '~/components/organisms/left-view';
import { RightView } from '~/components/organisms/right-view';

export const HomePage = () => {
  return (
    <div className="flex flex-1  h-full items-center gap-2.5">
      <LeftView />
      <RightView />
    </div>
  );
};
