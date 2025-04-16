import { getMockUserProfile } from '~/mock/generate-user-profile';

export const useUserProfile = (name: string) => {
  const user = getMockUserProfile(name);
  return user;
};
