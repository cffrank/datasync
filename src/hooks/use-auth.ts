import { useCallback } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  type User,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useAuthContext } from '@/contexts/auth';
import { useToast } from './use-toast';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';

export function useAuth() {
  const { user, loading } = useAuthContext();
  const toast = useToast();

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        toast.success(SUCCESS_MESSAGES.AUTH.LOGIN);
        return result.user;
      } catch (error) {
        toast.error(ERROR_MESSAGES.AUTH.WRONG_PASSWORD);
        throw error;
      }
    },
    [toast]
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        toast.success(SUCCESS_MESSAGES.AUTH.REGISTER);
        return result.user;
      } catch (error) {
        toast.error(ERROR_MESSAGES.AUTH.EMAIL_IN_USE);
        throw error;
      }
    },
    [toast]
  );

  const signInWithGoogle = useCallback(async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      toast.success(SUCCESS_MESSAGES.AUTH.LOGIN);
      return result.user;
    } catch (error) {
      toast.error(ERROR_MESSAGES.AUTH.OPERATION_NOT_ALLOWED);
      throw error;
    }
  }, [toast]);

  const signInWithGithub = useCallback(async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      toast.success(SUCCESS_MESSAGES.AUTH.LOGIN);
      return result.user;
    } catch (error) {
      toast.error(ERROR_MESSAGES.AUTH.OPERATION_NOT_ALLOWED);
      throw error;
    }
  }, [toast]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      toast.success(SUCCESS_MESSAGES.AUTH.LOGOUT);
    } catch (error) {
      toast.error(ERROR_MESSAGES.SERVER);
      throw error;
    }
  }, [toast]);

  const resetPassword = useCallback(
    async (email: string) => {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success(SUCCESS_MESSAGES.AUTH.PASSWORD_RESET);
      } catch (error) {
        toast.error(ERROR_MESSAGES.AUTH.USER_NOT_FOUND);
        throw error;
      }
    },
    [toast]
  );

  const verifyEmail = useCallback(
    async (user: User) => {
      try {
        await sendEmailVerification(user);
        toast.success('Verification email sent');
      } catch (error) {
        toast.error(ERROR_MESSAGES.SERVER);
        throw error;
      }
    },
    [toast]
  );

  return {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    logout,
    resetPassword,
    verifyEmail,
  };
}
