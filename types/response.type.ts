import { Answer } from "./answer.type";

export interface Response {
  id: string;
  userEmail?: string | null;
  surveyId: string;
  answers: Answer[];
  createdAt: Date;
}
