import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SnippetCollection } from "./SnippetCollection";
import { Explanation, createExplantionEntityInstances } from "./Explanation";

@Entity()
export class CodeSnippet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @ManyToOne(() => SnippetCollection, (collection) => collection.codeSnippets, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "snippetCollectionId", referencedColumnName: "id" })
  snippetCollection: SnippetCollection;

  @OneToMany(() => Explanation, (explanation) => explanation.codeSnippet, {
    cascade: true,
    eager: true,
  })
  explanations: Explanation[];
}

export function createCodeSnippetsEntityInstances(
  codeSnippetsToAdd: CodeSnippet[]
) {
  // create an array of CodeSnippet instances
  const newCodeSnippets = codeSnippetsToAdd.map((elm) => {
    const newCodeSnippet = new CodeSnippet();
    newCodeSnippet.code = elm.code;
    // create an array of Explantion instances and save them on explantions property of CodeSnippet
    const newExplanations = createExplantionEntityInstances(elm.explanations);
    newCodeSnippet.explanations = newExplanations;
    return newCodeSnippet;
  });
  return newCodeSnippets;
}
