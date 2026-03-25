import { type JSX, useCallback, useEffect } from "react";
import { Button, Divider, Flex, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";

import { useFormDraft } from "@/features/ads/hooks";
import { useUpdateAd } from "@/features/ads/hooks/use-update-ad";
import { type AdCategory, type AdType, type AdUpdateType } from "@/features/ads/types";

import { AdEditDescriptionField } from "../ad-edit-description-field";
import { AdEditParamsFields } from "../ad-edit-params-fields";
import { AdEditPriceField } from "../ad-edit-price-field";

import { CATEGORY_OPTIONS } from "./ad-edit-form.constants";

import css from "./ad-edit-form.module.css";

type AdEditFormProps = {
  adId: number;
  initialValues?: AdType;
  onGeneratePrice?: () => Promise<string>;
  onGenerateDescription?: (currentText: string) => Promise<string>;
};

export const AdEditForm = ({
  adId,
  initialValues,
  onGeneratePrice,
  onGenerateDescription
}: AdEditFormProps): JSX.Element => {
  const navigate = useNavigate();
  const [form] = Form.useForm<AdUpdateType>();

  const { mutate, isPending } = useUpdateAd(adId);
  const { saveDraft, clearDraft } = useFormDraft(String(adId), form);

  const category = Form.useWatch("category", form);
  const description = Form.useWatch("description", form) ?? "";

  useEffect(() => {
    if (initialValues && !form.isFieldsTouched()) {
      form.setFieldsValue({
        ...initialValues,
        price: initialValues.price ?? undefined,
        params: initialValues.params ?? {}
      } as AdUpdateType);
    }
  }, [initialValues, form]);

  const handleApplyPrice = useCallback(
    (val: string) => {
      if (val) {
        form.setFieldsValue({ price: Number(val) } as AdUpdateType);
        saveDraft();
      }
    },
    [form, saveDraft]
  );

  const handleApplyDescription = useCallback(
    (text: string) => {
      if (text) {
        form.setFieldsValue({ description: text } as AdUpdateType);
        saveDraft();
      }
    },
    [form, saveDraft]
  );

  const onFinish = useCallback(
    (values: AdUpdateType) => {
      const { title, description, category, params, price } = values;
      mutate(
        { title, description, category, params, price: price ? Number(price) : 0 },
        {
          onSuccess: () => {
            clearDraft();
            navigate(`/ads/${adId}`);
          }
        }
      );
    },
    [mutate, adId, clearDraft, navigate]
  );

  return (
    <Form
      form={form}
      layout="vertical"
      className={css.form}
      onFinish={onFinish}
      onValuesChange={saveDraft}>
      <Form.Item
        name="category"
        label="Категория"
        rules={[{ required: true }]}
        className={css.fieldFixedWidth}>
        <Select
          options={CATEGORY_OPTIONS}
          onChange={() => {
            form.setFieldValue("params", {});
            saveDraft();
          }}
        />
      </Form.Item>

      <Divider className={css.divider} />

      <Form.Item
        name="title"
        label="Название"
        rules={[{ required: true }]}
        className={css.fieldFixedWidth}>
        <Input allowClear disabled={isPending} />
      </Form.Item>

      <Divider className={css.divider} />

      <AdEditPriceField
        isPending={isPending}
        onGeneratePrice={onGeneratePrice}
        onApplyPrice={handleApplyPrice}
      />

      <Divider className={css.divider} />

      {category && (
        <>
          <div className={css.section}>
            <span className={css.sectionTitle}>Характеристики</span>
            <AdEditParamsFields category={category as AdCategory} />
          </div>
          <Divider className={css.divider} />
        </>
      )}

      <AdEditDescriptionField
        description={description}
        isPending={isPending}
        onGenerateDescription={onGenerateDescription}
        onApplyDescription={handleApplyDescription}
      />

      <Flex gap={8}>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Сохранить
        </Button>
        <Button onClick={() => navigate(-1)} disabled={isPending}>
          Отменить
        </Button>
      </Flex>
    </Form>
  );
};
