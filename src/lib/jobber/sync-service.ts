import { jobberClient } from './client';
import { db } from '../firebase/config';
import { collection, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { GET_CLIENTS, GET_CLIENT } from '../../graphql/queries';
import type { JobberClient, FirestoreClient, SyncMetadata } from '../../types/jobber';
import type { 
  ClientQueryResponse, 
  ClientsQueryResponse, 
  ClientEdge,
  ClientQueryVariables,
  ClientsQueryVariables,
  PageInfo
} from '../../types/graphql';

export class ClientSyncService {
  private readonly clientsCollection = 'clients';
  private readonly syncMetadataCollection = 'sync_metadata';

  /**
   * Transform Jobber client data to Firestore format
   */
  private transformToFirestore(jobberClient: JobberClient): FirestoreClient {
    return {
      id: crypto.randomUUID(),
      jobber_id: jobberClient.id,
      balance: jobberClient.balance,
      billing_address: jobberClient.billingAddress ? {
        street: jobberClient.billingAddress.street,
        city: jobberClient.billingAddress.city,
        province: jobberClient.billingAddress.province,
        postal_code: jobberClient.billingAddress.postalCode,
        country: jobberClient.billingAddress.country,
      } : undefined,
      properties: jobberClient.clientProperties.edges.map(edge => ({
        id: edge.node.id,
        address: {
          street: edge.node.address.street,
          city: edge.node.address.city,
          province: edge.node.address.province,
          postal_code: edge.node.address.postalCode,
          country: edge.node.address.country,
        },
      })),
      company_name: jobberClient.companyName,
      custom_fields: jobberClient.customFields.reduce((acc, field) => ({
        ...acc,
        [field.name]: field.value,
      }), {}),
      emails: [
        ...jobberClient.defaultEmails,
        ...jobberClient.emails.map(email => email.address),
      ],
      phone_numbers: jobberClient.phones.map(phone => ({
        number: phone.number,
        label: phone.label,
      })),
      first_name: jobberClient.firstName,
      last_name: jobberClient.lastName,
      is_company: jobberClient.isCompany,
      is_lead: jobberClient.isLead,
      is_archived: jobberClient.isArchived,
      name: jobberClient.name,
      title: jobberClient.title,
      metadata: {
        created_at: jobberClient.createdAt,
        updated_at: jobberClient.updatedAt,
        last_synced: new Date().toISOString(),
        sync_version: 1,
      },
    };
  }

  /**
   * Sync a single client by ID
   */
  async syncClient(clientId: string): Promise<void> {
    try {
      // Fetch client from Jobber
      const result = await jobberClient.query<{ data: { client: JobberClient } }, ClientQueryVariables>({
        query: GET_CLIENT,
        variables: { id: clientId },
      });

      if (!result.data?.data?.client) {
        throw new Error(`Client not found: ${clientId}`);
      }

      // Transform to Firestore format
      const firestoreClient = this.transformToFirestore(result.data.data.client);

      // Save to Firestore
      await setDoc(
        doc(db, this.clientsCollection, firestoreClient.id),
        firestoreClient
      );

      // Update sync metadata
      await this.updateSyncMetadata(clientId, 'success');
    } catch (error) {
      console.error('Error syncing client:', error);
      await this.updateSyncMetadata(clientId, 'error');
      throw error;
    }
  }

  /**
   * Sync all clients (with pagination)
   */
  async syncAllClients(batchSize = 50): Promise<void> {
    let hasNextPage = true;
    let after: string | null = null;

    try {
      while (hasNextPage) {
        type QueryResult = {
          data: {
            data: {
              clients: {
                pageInfo: PageInfo;
                edges: ClientEdge[];
              };
            };
          };
        };
        
        const result: QueryResult = await jobberClient.query<QueryResult['data'], ClientsQueryVariables>({
          query: GET_CLIENTS,
          variables: { first: batchSize, after },
        });

        const { 
          edges,
          pageInfo
        }: { edges: ClientEdge[]; pageInfo: PageInfo } = result.data.data.clients;

        // Process batch
        await Promise.all(
          edges.map(async ({ node }: ClientEdge) => {
            const firestoreClient = this.transformToFirestore(node);
            await setDoc(
              doc(db, this.clientsCollection, firestoreClient.id),
              firestoreClient
            );
            await this.updateSyncMetadata(node.id, 'success');
          })
        );

        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
      }
    } catch (error) {
      console.error('Error in batch sync:', error);
      throw error;
    }
  }

  /**
   * Update sync metadata
   */
  private async updateSyncMetadata(
    clientId: string,
    status: 'success' | 'error' | 'in_progress'
  ): Promise<void> {
    const metadata: SyncMetadata = {
      entity_id: clientId,
      entity_type: 'client',
      last_synced: new Date().toISOString(),
      last_jobber_update: new Date().toISOString(),
      last_firebase_update: new Date().toISOString(),
      sync_status: status,
      version: 1,
    };

    await setDoc(
      doc(db, this.syncMetadataCollection, clientId),
      metadata
    );
  }

  /**
   * Get sync status for a client
   */
  async getSyncStatus(clientId: string): Promise<SyncMetadata | null> {
    const docRef = doc(db, this.syncMetadataCollection, clientId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as SyncMetadata;
    }
    
    return null;
  }
}
