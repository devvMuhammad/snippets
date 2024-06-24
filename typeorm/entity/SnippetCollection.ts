import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CodeSnippet, createCodeSnippetsEntityInstances } from "./CodeSnippet";
import { validFrameworks, validLanguages } from "../config/languages";

@Entity()
export class SnippetCollection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  authorId: string;

  @Column({ length: 200 })
  title: string;

  @Column()
  description: string;

  @Column({ type: "enum", enum: validLanguages, default: validLanguages[0] })
  language: string;

  @Column()
  framework: string;

  // Cascade insert here means if there is a new CodeSnippet instance set
  // on this relation, it will be inserted automatically to the db when you save this SnippetCollection entity
  @OneToMany(
    () => CodeSnippet,
    (codeSnippet) => codeSnippet.snippetCollection,
    { cascade: true, eager: true }
  )
  codeSnippets: CodeSnippet[];

  @BeforeInsert()
  @BeforeUpdate()
  validateFramework() {
    const incomingLanguage = this.language;
    const incomingFramework = this.framework;
    if (!validFrameworks(incomingLanguage))
      throw new Error(`Invalid language ${incomingLanguage}`);
    if (
      !validFrameworks(incomingLanguage as string)?.includes(incomingFramework)
    ) {
      throw new Error(
        `Invalid framework ${incomingFramework} for language ${incomingLanguage}`
      );
    }
  }
}

export function createSnippetCollectionInstance(
  collectionToAdd: SnippetCollection
) {
  const newCollection = new SnippetCollection();
  newCollection.authorId = collectionToAdd?.authorId;
  newCollection.description = collectionToAdd?.description;
  newCollection.title = collectionToAdd?.title;
  newCollection.language = collectionToAdd?.language;
  newCollection.framework = collectionToAdd?.framework;
  const newCodeSnippets = createCodeSnippetsEntityInstances(
    collectionToAdd.codeSnippets
  );
  newCollection.codeSnippets = newCodeSnippets;
  return newCollection;
}
