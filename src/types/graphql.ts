import type { Connection, Edge, PageInfo } from './jobber';

// Re-export connection types
export type { Connection, Edge, PageInfo };

// Raw API response types that match the GraphQL schema exactly
export interface GraphQLAddress {
  street: string;
  unit?: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

export interface GraphQLProperty {
  id: string;
  address: GraphQLAddress;
  created_at: string;
  updated_at: string;
}

export interface GraphQLClient {
  id: string;
  first_name: string;
  last_name: string;
  name: string;
  title?: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  company_name?: string;
  is_company: boolean;
  is_lead: boolean;
  is_archived: boolean;
  balance: number;
  billing_address: GraphQLAddress;
  default_emails: string[];
  emails: { address: string; label?: string }[];
  phones: { number: string; label?: string }[];
  properties: GraphQLProperty[];
  client_properties: Connection<GraphQLProperty>;
  custom_fields: { name: string; value: string }[];
  created_at: string;
  updated_at: string;
}

export interface GraphQLJob {
  id: string;
  title: string;
  status: 'draft' | 'scheduled' | 'completed' | 'cancelled';
  client: GraphQLClient;
  property: GraphQLProperty;
  scheduled_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GraphQLQuote {
  id: string;
  status: 'draft' | 'awaiting_response' | 'approved' | 'declined';
  client: GraphQLClient;
  property: GraphQLProperty;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface GraphQLInvoice {
  id: string;
  status: 'draft' | 'sent' | 'paid' | 'bad_debt';
  client: GraphQLClient;
  total: number;
  due_at: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

// GraphQL query variables
export interface ClientQueryVariables {
  id: string;
}

export interface ClientsQueryVariables {
  first: number;
  after?: string;
}

export interface JobsQueryVariables {
  first: number;
  after?: string;
  clientId?: string;
}

export interface QuotesQueryVariables {
  first: number;
  after?: string;
  clientId?: string;
}

export interface InvoicesQueryVariables {
  first: number;
  after?: string;
  clientId?: string;
}

// GraphQL query response types
export interface ClientsResponse {
  clients: Connection<GraphQLClient>;
}

export interface ClientResponse {
  client: GraphQLClient;
}

export interface JobsResponse {
  jobs: Connection<GraphQLJob>;
}

export interface QuotesResponse {
  quotes: Connection<GraphQLQuote>;
}

export interface InvoicesResponse {
  invoices: Connection<GraphQLInvoice>;
}

// GraphQL error types
export interface GraphQLError {
  message: string;
  path?: string[];
  extensions?: {
    code?: string;
    [key: string]: unknown;
  };
}

// Type aliases for convenience
export type ClientEdge = Edge<GraphQLClient>;
export type PropertyEdge = Edge<GraphQLProperty>;
export type JobEdge = Edge<GraphQLJob>;
export type QuoteEdge = Edge<GraphQLQuote>;
export type InvoiceEdge = Edge<GraphQLInvoice>;
