import { type JSX } from "react";
import { Form, Input, Select } from "antd";

import type { FieldConfig } from "@/features/ads/types";

import css from "./params-field-list.module.css";

type ParamsFieldsListProps = {
  fields: FieldConfig[];
};

export const ParamsFieldsList = ({ fields }: ParamsFieldsListProps): JSX.Element => (
  <>
    {fields.map((field) => (
      <Form.Item
        key={Array.isArray(field.name) ? field.name.join("-") : field.name}
        name={field.name}
        label={field.label}
        className={css.fieldFixedWidth}>
        {field.type === "input" ? (
          <Input type={field.inputType} />
        ) : (
          <Select options={field.options} />
        )}
      </Form.Item>
    ))}
  </>
);
