import { Question } from "./question.type";
import { Response } from "./response.type";

export interface Survey {
  id: string;
  title: string;
  questions: Question[];
  responses?: Response[];
  createdAt: Date;
}
