export type UserT = {
  username: string;
  email: string;
};

export type UserStoreT = {
  user: UserT | null;
  set: (user: UserT) => void;
  get: () => UserT | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => void;
};
