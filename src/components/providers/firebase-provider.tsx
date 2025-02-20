'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { useToast } from '@/hooks';
import { app } from '@/lib/firebase/config';
import { ERROR_MESSAGES } from '@/lib/constants';
import type { FirestoreError } from 'firebase/firestore';
import { Loading } from '@/components/ui/loading';
import { ErrorScreen } from '@/components/ui/error';

interface FirebaseProviderProps {
  children: ReactNode;
}

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    try {
      // Check if Firebase is initialized
      if (!app) {
        throw new Error('Firebase app not initialized');
      }

      // Enable offline persistence for Firestore
      const { getFirestore, enableIndexedDbPersistence } = require('firebase/firestore');
      const db = getFirestore(app);
      
      void enableIndexedDbPersistence(db).catch((err: FirestoreError) => {
        if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled in one tab at a time
          console.warn('Multiple tabs open, persistence disabled');
        } else if (err.code === 'unimplemented') {
          // The current browser doesn't support persistence
          console.warn('Browser does not support persistence');
        }
      });

      setIsInitialized(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : ERROR_MESSAGES.SERVER;
      setError(message);
      toast.error(message);
    }
  }, [toast]);

  // Show loading state while initializing
  if (!isInitialized && !error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading size="lg" message="Initializing Firebase..." />
      </div>
    );
  }

  // Show error state if initialization failed
  if (error) {
    return (
      <ErrorScreen
        title="Firebase Error"
        message={error}
      />
    );
  }

  return <>{children}</>;
}
