import type {
  JobberClient,
  JobberProperty,
  JobberJob,
  JobberQuote,
  JobberInvoice,
  JobberAddress,
} from '@/types/jobber';
import type {
  GraphQLClient,
  GraphQLProperty,
  GraphQLJob,
  GraphQLQuote,
  GraphQLInvoice,
  GraphQLAddress,
} from '@/types/graphql';

// Map GraphQL address to domain address
export function mapAddress(address: GraphQLAddress): JobberAddress {
  return {
    street: address.street,
    unit: address.unit,
    city: address.city,
    province: address.province,
    postalCode: address.postal_code,
    country: address.country,
  };
}

// Map GraphQL property to domain property
export function mapProperty(property: GraphQLProperty): JobberProperty {
  return {
    id: property.id,
    address: mapAddress(property.address),
    createdAt: property.created_at,
    updatedAt: property.updated_at,
  };
}

// Map GraphQL client to domain client
export function mapClient(client: GraphQLClient): JobberClient {
  return {
    id: client.id,
    firstName: client.first_name,
    lastName: client.last_name,
    name: client.name,
    title: client.title,
    email: client.email,
    phone: client.phone,
    company: client.company,
    companyName: client.company_name,
    isCompany: client.is_company,
    isLead: client.is_lead,
    isArchived: client.is_archived,
    balance: client.balance,
    billingAddress: mapAddress(client.billing_address),
    defaultEmails: client.default_emails,
    emails: client.emails,
    phones: client.phones,
    properties: client.properties.map(mapProperty),
    clientProperties: {
      edges: client.client_properties.edges.map(edge => ({
        node: mapProperty(edge.node),
        cursor: edge.cursor,
      })),
      pageInfo: client.client_properties.pageInfo,
    },
    customFields: client.custom_fields,
    createdAt: client.created_at,
    updatedAt: client.updated_at,
  };
}

// Map GraphQL job to domain job
export function mapJob(job: GraphQLJob): JobberJob {
  return {
    id: job.id,
    title: job.title,
    status: job.status,
    client: mapClient(job.client),
    property: mapProperty(job.property),
    scheduledAt: job.scheduled_at,
    completedAt: job.completed_at,
    createdAt: job.created_at,
    updatedAt: job.updated_at,
  };
}

// Map GraphQL quote to domain quote
export function mapQuote(quote: GraphQLQuote): JobberQuote {
  return {
    id: quote.id,
    status: quote.status,
    client: mapClient(quote.client),
    property: mapProperty(quote.property),
    total: quote.total,
    createdAt: quote.created_at,
    updatedAt: quote.updated_at,
  };
}

// Map GraphQL invoice to domain invoice
export function mapInvoice(invoice: GraphQLInvoice): JobberInvoice {
  return {
    id: invoice.id,
    status: invoice.status,
    client: mapClient(invoice.client),
    total: invoice.total,
    dueAt: invoice.due_at,
    paidAt: invoice.paid_at,
    createdAt: invoice.created_at,
    updatedAt: invoice.updated_at,
  };
}
