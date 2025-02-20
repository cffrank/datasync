'use client';

import { type ReactNode } from 'react';
import {
  AuthProvider,
  FirebaseProvider,
  KeyboardProvider,
  MiddlewareProvider,
  QueryProvider,
  SidebarProvider,
  SyncProvider,
  ThemeProvider,
  ToastProvider,
} from '@/components/providers';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <QueryProvider>
          <ThemeProvider>
            <ToastProvider>
              <KeyboardProvider>
                <SidebarProvider>
                  <SyncProvider>
                    <MiddlewareProvider>
                      {children}
                    </MiddlewareProvider>
                  </SyncProvider>
                </SidebarProvider>
              </KeyboardProvider>
            </ToastProvider>
          </ThemeProvider>
        </QueryProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}
