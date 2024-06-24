export const typeDefs = `#graphql
  type Explanation {
  id: ID
  lineNumber: Int
  text: String
}

  type CodeSnippet {
    id: ID
    code: String
    explanations: [Explanation!]!
  }

  type SnippetCollection {
    id: ID
    authorId: String
    title: String
    description: String
    language: String
    framework: String
    codeSnippets: [CodeSnippet!]!
  }

  input ExplanationInput {
    lineNumber: Int
    text: String
  }

  input CodeSnippetInput {
    code: String
    explanations: [ExplanationInput!]
  }

  input SnippetCollectionInput {
    authorId: String
    title: String
    description: String
    language: String
    framework: String
    codeSnippets: [CodeSnippetInput!]
  }

  type Query {
    getAllCollections(language: String, framework: String): [SnippetCollection!]
    getCollection(id: ID): SnippetCollection!
  }

  type Mutation {
    createCollection(collection: SnippetCollectionInput!): [SnippetCollection!]
    deleteCollection(id: ID!): [SnippetCollection!]
    editCollection(id: ID!, collection: SnippetCollectionInput!): SnippetCollection!
  }
`;
