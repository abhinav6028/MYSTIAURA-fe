export type User = {
  username: string;
  roles: string[];
};

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};