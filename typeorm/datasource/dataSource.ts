import { DataSource } from "typeorm";
import { SnippetCollection } from "../entity/SnippetCollection";
import { CodeSnippet } from "../entity/CodeSnippet";
import { User } from "../entity/User";
import { Photo } from "../entity/Photo";
import { Explanation } from "../entity/Explanation";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "aws-0-ap-south-1.pooler.supabase.com",
  port: 6543,
  username: "postgres.pwmjcdpmymmgpfrnfkcu",
  password: "zama-database-password",
  database: "postgres",
  entities: [SnippetCollection, CodeSnippet, Explanation, User, Photo],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
