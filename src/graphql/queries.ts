import { gql } from '@apollo/client';

export const GET_CLIENTS = gql`
  query GetClients($first: Int, $after: String) {
    clients(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          balance
          billingAddress {
            street
            city
            province
            postalCode
            country
          }
          clientProperties {
            edges {
              node {
                id
                address {
                  street
                  city
                  province
                  postalCode
                  country
                }
              }
            }
          }
          companyName
          customFields {
            name
            value
            fieldType
          }
          defaultEmails
          emails {
            address
            label
          }
          firstName
          lastName
          isCompany
          isLead
          isArchived
          name
          phones {
            number
            label
          }
          title
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_CLIENT = gql`
  query GetClient($id: ID!) {
    client(id: $id) {
      id
      balance
      billingAddress {
        street
        city
        province
        postalCode
        country
      }
      clientProperties {
        edges {
          node {
            id
            address {
              street
              city
              province
              postalCode
              country
            }
          }
        }
      }
      companyName
      customFields {
        name
        value
        fieldType
      }
      defaultEmails
      emails {
        address
        label
      }
      firstName
      lastName
      isCompany
      isLead
      isArchived
      name
      phones {
        number
        label
      }
      title
      createdAt
      updatedAt
    }
  }
`;
