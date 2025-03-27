import { Survey } from "./survey.type";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  surveys?: Survey[];
}
