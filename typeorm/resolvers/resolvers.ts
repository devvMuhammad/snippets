import { ApolloServerOptions, BaseContext } from "@apollo/server";
import { SnippetCollectionRepository } from "../repository/repositories";

export const resolvers: ApolloServerOptions<BaseContext>["resolvers"] = {
  Query: {
    getAllCollections: async () => {
      return await SnippetCollectionRepository.find();
    },
    getCollection: async (_, args) => {
      return await SnippetCollectionRepository.findOne({
        where: { id: args.id },
      });
    },
  },
  Mutation: {
    createCollection: async (_, args) => {
      const newCollection = SnippetCollectionRepository.create(args.collection);
      await SnippetCollectionRepository.save(newCollection);
      return await SnippetCollectionRepository.find();
    },
    deleteCollection: async (_, args) => {
      await SnippetCollectionRepository.delete(args.id);
      return await SnippetCollectionRepository.find();
    },
    editCollection: async (_, args) => {
      await SnippetCollectionRepository.update(args.id, args.collection);
      return await SnippetCollectionRepository.findOne({
        where: { id: args.id },
      });
    },
  },
};
