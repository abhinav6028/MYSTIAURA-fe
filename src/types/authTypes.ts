export type Sendotp = {
  email: string;
}

export type SendOtpFormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<number>>;
};

export interface AuthState {
  email: string | null;
  token: string | null;
  user: {
    name?: string;
    email: string;
    role: string;
  } | null;
  isAuthenticated: boolean;
}