import { type JSX } from "react";
import { Flex, Form, Input, Typography } from "antd";

import {
  DESCRIPTION_GEN_LABELS,
  DESCRIPTION_IMPROVE_LABELS,
  MAX_DESCRIPTION_LENGTH
} from "@/features/ads/components/edit/ad-edit-form/ad-edit-form.constants";

import { AiGenerateButton } from "@/shared/ui";

type AdEditDescriptionFieldProps = {
  description: string;
  isPending: boolean;
  onGenerateDescription?: (currentText: string) => Promise<string>;
  onApplyDescription: (text: string) => void;
};

export const AdEditDescriptionField = ({
  description,
  isPending,
  onGenerateDescription,
  onApplyDescription
}: AdEditDescriptionFieldProps): JSX.Element => {
  const isDescriptionEmpty = description.trim().length === 0;

  return (
    <Form.Item
      name="description"
      label={
        <Flex align="center" gap={12}>
          <span>Описание</span>
          {onGenerateDescription && (
            <AiGenerateButton
              onGenerate={() => onGenerateDescription(description)}
              onApply={onApplyDescription}
              labels={isDescriptionEmpty ? DESCRIPTION_GEN_LABELS : DESCRIPTION_IMPROVE_LABELS}
            />
          )}
        </Flex>
      }
      extra={
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          {description.length} / {MAX_DESCRIPTION_LENGTH}
        </Typography.Text>
      }>
      <Input.TextArea rows={6} maxLength={MAX_DESCRIPTION_LENGTH} disabled={isPending} />
    </Form.Item>
  );
};
