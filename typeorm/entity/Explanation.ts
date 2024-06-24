import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CodeSnippet } from "./CodeSnippet";

@Entity()
export class Explanation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  lineNumber: number;

  @Column()
  text: string;

  @ManyToOne(() => CodeSnippet, (CodeSnippet) => CodeSnippet.explanations, {
    onDelete: "CASCADE",
  })
  codeSnippet: CodeSnippet;
}

export function createExplantionEntityInstances(
  explantionsToAdd: Explanation[]
) {
  const newExplanations = explantionsToAdd.map((exp) => {
    const newExplantion = new Explanation();
    newExplantion.lineNumber = exp.lineNumber;
    newExplantion.text = exp.text;
    return newExplantion;
  });
  return newExplanations;
}
