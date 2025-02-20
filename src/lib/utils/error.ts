import { FirebaseError } from 'firebase/app';
import { GraphQLError } from '@/types/graphql';
import { ERROR_MESSAGES } from '@/lib/constants';

// Error type guards
export function isFirebaseError(error: unknown): error is FirebaseError {
  return error instanceof FirebaseError;
}

export function isGraphQLError(error: unknown): error is { 
  response: { errors: GraphQLError[] } 
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'errors' in error.response &&
    Array.isArray(error.response.errors)
  );
}

export function isJobberError(error: unknown): error is {
  message: string;
  code: string;
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'code' in error &&
    typeof error.message === 'string' &&
    typeof error.code === 'string'
  );
}

// Error handling functions
export function handleAPIError(error: unknown): string {
  if (isFirebaseError(error)) {
    return handleFirebaseError(error);
  }

  if (isGraphQLError(error)) {
    return handleGraphQLError(error);
  }

  if (isJobberError(error)) {
    return handleJobberError(error);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return ERROR_MESSAGES.SERVER;
}

function handleFirebaseError(error: FirebaseError): string {
  switch (error.code) {
    case 'auth/invalid-email':
      return ERROR_MESSAGES.AUTH.INVALID_EMAIL;
    case 'auth/user-disabled':
      return ERROR_MESSAGES.AUTH.USER_DISABLED;
    case 'auth/user-not-found':
      return ERROR_MESSAGES.AUTH.USER_NOT_FOUND;
    case 'auth/wrong-password':
      return ERROR_MESSAGES.AUTH.WRONG_PASSWORD;
    case 'auth/email-already-in-use':
      return ERROR_MESSAGES.AUTH.EMAIL_IN_USE;
    case 'auth/operation-not-allowed':
      return ERROR_MESSAGES.AUTH.OPERATION_NOT_ALLOWED;
    case 'auth/weak-password':
      return ERROR_MESSAGES.AUTH.WEAK_PASSWORD;
    default:
      return error.message;
  }
}

function handleGraphQLError(error: { response: { errors: GraphQLError[] } }): string {
  const firstError = error.response.errors[0];
  if (!firstError) {
    return ERROR_MESSAGES.SERVER;
  }

  // Check for specific error codes in extensions
  if (firstError.extensions?.code) {
    switch (firstError.extensions.code) {
      case 'UNAUTHENTICATED':
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 'FORBIDDEN':
        return ERROR_MESSAGES.FORBIDDEN;
      case 'BAD_USER_INPUT':
        return ERROR_MESSAGES.VALIDATION;
      case 'INTERNAL_SERVER_ERROR':
        return ERROR_MESSAGES.SERVER;
      default:
        return firstError.message;
    }
  }

  return firstError.message;
}

function handleJobberError(error: { message: string; code: string }): string {
  switch (error.code) {
    case 'RATE_LIMIT_EXCEEDED':
      return ERROR_MESSAGES.RATE_LIMIT;
    case 'INVALID_API_KEY':
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 'RESOURCE_NOT_FOUND':
      return ERROR_MESSAGES.NOT_FOUND;
    case 'VALIDATION_ERROR':
      return ERROR_MESSAGES.VALIDATION;
    default:
      return error.message;
  }
}

// Format error message for display
export function formatErrorMessage(error: unknown): string {
  const message = handleAPIError(error);
  
  // Remove any technical details or stack traces
  return message.split('\n')[0].trim();
}
