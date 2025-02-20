import type { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signInWithGithub: () => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (user: User) => Promise<void>;
}

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
}

export interface AuthFormProps {
  type: 'login' | 'register' | 'reset';
  onSubmit: (data: AuthFormData) => Promise<void>;
  loading?: boolean;
  error?: string;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
