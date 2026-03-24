import { type JSX } from "react";
import { Form, Input, Select } from "antd";

import type { FieldConfig } from "@/features/ads/types";

type ParamsFieldsListProps = {
  fields: FieldConfig[];
};

export const ParamsFieldsList = ({ fields }: ParamsFieldsListProps): JSX.Element => (
  <>
    {fields.map((field) => (
      <Form.Item key={field.name} name={["params", field.name]} label={field.label}>
        {field.type === "select" ? (
          <Select options={field.options} placeholder={field.label} />
        ) : (
          <Input type={field.inputType ?? "text"} placeholder={field.label} allowClear />
        )}
      </Form.Item>
    ))}
  </>
);
