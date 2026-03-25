import { type JSX } from "react";
import { Flex, Form, Input, Typography } from "antd";

import { PRICE_AI_LABELS } from "@/features/ads/components/edit/ad-edit-form/ad-edit-form.constants";
import { extractPrice } from "@/features/ads/components/edit/ad-edit-form/ad-edit-form.utils";

import { AiGenerateButton } from "@/shared/ui";

import css from "../ad-edit-form/ad-edit-form.module.css";

type AdEditPriceFieldProps = {
  isPending: boolean;
  onGeneratePrice?: () => Promise<string>;
  onApplyPrice: (value: string) => void;
};

export const AdEditPriceField = ({
  isPending,
  onGeneratePrice,
  onApplyPrice
}: AdEditPriceFieldProps): JSX.Element => {
  return (
    <div className={css.fieldFixedWidth}>
      <Typography.Text style={{ display: "block", marginBottom: 8 }}>Цена</Typography.Text>
      <Flex gap={8} align="flex-start">
        <Form.Item name="price" noStyle rules={[{ required: true }]}>
          <Input
            type="number"
            allowClear
            disabled={isPending}
            className={css.priceInput}
            placeholder="0"
          />
        </Form.Item>
        {onGeneratePrice && (
          <AiGenerateButton
            onGenerate={onGeneratePrice}
            onTransform={(raw) => extractPrice(raw) ?? ""}
            onApply={onApplyPrice}
            labels={PRICE_AI_LABELS}
          />
        )}
      </Flex>
    </div>
  );
};
