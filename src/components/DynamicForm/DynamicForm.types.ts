export type DynamicFormField =
  | {
      type: "text" | "number";
      label: string;
      name: string;
    }
  | {
      type: "select";
      label: string;
      name: string;
      options: string[];
    };

export interface DynamicFormProps {
  fields: DynamicFormField[];
  onSubmit: (data: Record<string, string>) => void;
}
