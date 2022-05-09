import create, { StateCreator } from 'zustand';
import { UserStoreT, UserT } from './models';

const initializer: StateCreator<UserStoreT> = (
  set,
  get
) => ({
  user: null,
  set: (user: UserT) => {
    set({ user });
  },
  get: () => {
    return get().user;
  },
  login: async ({ email, password }) => {
    if (
      email === 'email@email.com' &&
      password === 'password'
    ) {
      setTimeout(() => {
        set({ user: { email, username: email } });
      }, 3000);
    } else {
      set({ user: null });
    }
  },
});

export const useUser = create<UserStoreT>(initializer);
