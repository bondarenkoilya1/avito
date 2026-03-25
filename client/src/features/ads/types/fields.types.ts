export type InputFieldConfig = {
  type: "input";
  name: string | string[];
  label: string;
  inputType?: "text" | "number";
};

export type SelectFieldConfig = {
  type: "select";
  name: string | string[];
  label: string;
  options: { value: string; label: string }[];
};

export type FieldConfig = InputFieldConfig | SelectFieldConfig;
