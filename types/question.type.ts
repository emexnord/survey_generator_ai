export type Question = {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[]; // Required for MULTIPLE_CHOICE, CHECKBOXES, and DROPDOWN
  required: boolean;
};

export type QuestionType =
  | "SHORT_PARAGRAPH"
  | "PARAGRAPH"
  | "MULTIPLE_CHOICE"
  | "CHECKBOXES"
  | "DROPDOWN"
  | "IMAGE_UPLOAD"; // for example,in social media reporting
