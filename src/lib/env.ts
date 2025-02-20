import { z } from 'zod';

const envSchema = z.object({
  // Firebase Configuration
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1, 'Firebase API key is required'),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1, 'Firebase auth domain is required'),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1, 'Firebase project ID is required'),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1, 'Firebase storage bucket is required'),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, 'Firebase messaging sender ID is required'),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, 'Firebase app ID is required'),

  // Firebase Admin Configuration
  FIREBASE_ADMIN_PROJECT_ID: z.string().optional(),
  FIREBASE_ADMIN_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_ADMIN_PRIVATE_KEY: z.string().optional(),

  // Jobber API Configuration
  JOBBER_API_KEY: z.string().min(1, 'Jobber API key is required'),
  JOBBER_WEBHOOK_SECRET: z.string().min(1, 'Jobber webhook secret is required'),

  // Application Configuration
  NEXT_PUBLIC_APP_URL: z.string().url('Invalid app URL'),
  NEXT_PUBLIC_API_URL: z.string().url('Invalid API URL'),
});

export function validateEnv() {
  try {
    const env = envSchema.parse(process.env);
    return {
      valid: true as const,
      env,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { fieldErrors } = error.flatten();
      const errors = Object.entries(fieldErrors)
        .map(([key, value]) => `${key}: ${value?.join(', ')}`)
        .join('\n');
      
      console.error('Environment validation failed:\n', errors);
      
      return {
        valid: false as const,
        error: errors,
      };
    }
    
    console.error('Environment validation failed:', error);
    return {
      valid: false as const,
      error: 'Failed to validate environment variables',
    };
  }
}

// Validate environment variables
const { valid, error } = validateEnv();

// Throw error in development, but just log in production
if (!valid) {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(error);
  } else {
    console.error('Environment validation failed:', error);
  }
}

// Export validated environment variables
export const env = envSchema.parse(process.env);
