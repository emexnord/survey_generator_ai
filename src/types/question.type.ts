export type Question = {
  id: string;
  text: string;
  type:
    | "SHORT_PARAGRAPH"
    | "PARAGRAPH"
    | "MULTIPLE_CHOICE"
    | "CHECKBOXES"
    | "DROPDOWN"
    | "IMAGE_UPLOAD";
  options?: string[]; // Required for MULTIPLE_CHOICE, CHECKBOXES, and DROPDOWN
  required: boolean;
};
