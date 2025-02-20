// Configuration types
export interface JobberConfig {
  apiKey: string;
  webhookSecret: string;
  batchSize: number;
}

// GraphQL connection types
export interface Edge<T> {
  node: T;
  cursor: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
}

// Domain model types
export interface JobberAddress {
  street: string;
  unit?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface JobberClient {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  title?: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  companyName?: string;
  isCompany: boolean;
  isLead: boolean;
  isArchived: boolean;
  balance: number;
  billingAddress: JobberAddress;
  defaultEmails: string[];
  emails: { address: string; label?: string }[];
  phones: { number: string; label?: string }[];
  properties: JobberProperty[];
  clientProperties: Connection<JobberProperty>;
  customFields: { name: string; value: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface JobberProperty {
  id: string;
  address: JobberAddress;
  createdAt: string;
  updatedAt: string;
}

export interface JobberJob {
  id: string;
  title: string;
  status: 'draft' | 'scheduled' | 'completed' | 'cancelled';
  client: JobberClient;
  property: JobberProperty;
  scheduledAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface JobberQuote {
  id: string;
  status: 'draft' | 'awaiting_response' | 'approved' | 'declined';
  client: JobberClient;
  property: JobberProperty;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobberInvoice {
  id: string;
  status: 'draft' | 'sent' | 'paid' | 'bad_debt';
  client: JobberClient;
  total: number;
  dueAt: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Firestore types
export interface FirestoreClient extends Omit<JobberClient, 'clientProperties'> {
  syncedAt: string;
  lastError?: string;
}

export interface SyncMetadata {
  entityId: string;
  entityType: string;
  lastSyncedAt: string;
  lastJobberUpdate: string;
  lastFirebaseUpdate: string;
  syncStatus: 'success' | 'error' | 'in_progress';
  version: number;
}
