import AppDataSource from "../datasource/dataSource";
import { CodeSnippet } from "../entity/CodeSnippet";
import { Explanation } from "../entity/Explanation";
import { SnippetCollection } from "../entity/SnippetCollection";
import { User } from "../entity/User";

export const UserRepository = AppDataSource.getRepository(User);
export const SnippetCollectionRepository =
  AppDataSource.getRepository(SnippetCollection);
export const CodeSnippetRepository = AppDataSource.getRepository(CodeSnippet);
export const ExplanationRepository = AppDataSource.getRepository(Explanation);
