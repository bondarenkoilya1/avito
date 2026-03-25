import { useCallback, useEffect } from "react";
import { Button, Divider, Flex, Form, Input, Select, Typography } from "antd";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

import { useFormDraft } from "@/features/ads/hooks";
import { useUpdateAd } from "@/features/ads/hooks/use-replace-ad";
import { CATEGORY_OPTIONS, MAX_DESCRIPTION_LENGTH } from "@/features/ads/pages/ad-edit-page";
import { type AdCategory, type AdType, type AdUpdateType } from "@/features/ads/types";

import { AiGenerateButton } from "@/shared/components";

import { AdEditParamsFields } from "../ad-edit-params-fields";

import css from "./ad-edit-form.module.css";

const { Text } = Typography;
const { TextArea } = Input;

type AdEditFormProps = {
  adId: number;
  initialValues?: AdType;
  onGeneratePrice?: () => Promise<string>;
};

const extractPrice = (value: string): string | null => {
  const cleaned = value.replace(/\s/g, "");
  const match = cleaned.match(/\d+([.,]\d+)?/);
  return match ? match[0].replace(",", ".") : null;
};

export const AdEditForm = ({
  adId,
  initialValues,
  onGeneratePrice
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
        // Гарантируем, что params не undefined для AdUpdateType
        params: initialValues.params ?? {}
      } as AdUpdateType);
    }
  }, [initialValues, form]);

  const handleCategoryChange = useCallback((): void => {
    form.setFieldValue("params", {});
    saveDraft();
  }, [form, saveDraft]);

  const onFinish = useCallback(
    (values: AdUpdateType): void => {
      const { title, description, category, params, price } = values;

      let formattedParams = params;

      if (category === "auto" && params) {
        const p = params as Record<string, unknown>;

        formattedParams = {
          ...p,
          yearOfManufacture: p.yearOfManufacture ? Number(p.yearOfManufacture) : undefined,
          mileage: p.mileage ? Number(p.mileage) : undefined,
          enginePower: p.enginePower ? Number(p.enginePower) : undefined
        };
      }

      const payload: AdUpdateType = {
        title,
        description,
        category,
        params: formattedParams,
        price: price ? Number(price) : 0
      };

      mutate(payload, {
        onSuccess: () => {
          clearDraft();
          navigate(`/ads/${adId}`);
        }
      });
    },
    [mutate, adId, clearDraft, navigate]
  );

  const handleApplyPrice = useCallback(
    (rawResponse: string): void => {
      const parsed = extractPrice(rawResponse);
      if (parsed !== null) {
        form.setFieldsValue({ price: Number(parsed) } as AdUpdateType);
        saveDraft();
      }
    },
    [form, saveDraft]
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
        rules={[{ required: true, message: "Выберите категорию" }]}
        className={css.fieldFixedWidth}>
        <Select options={CATEGORY_OPTIONS} onChange={handleCategoryChange} />
      </Form.Item>

      <Divider className={css.divider} />

      <Form.Item
        name="title"
        label="Название"
        rules={[{ required: true, message: "Введите название" }]}
        className={css.fieldFixedWidth}>
        <Input allowClear disabled={isPending} />
      </Form.Item>

      <Divider className={css.divider} />

      <div className={css.fieldFixedWidth}>
        <Text style={{ display: "block", marginBottom: 8 }}>Цена</Text>
        <Flex gap={8} align="flex-start">
          <Form.Item name="price" noStyle rules={[{ required: true, message: "Введите цену" }]}>
            <Input
              type="number"
              allowClear
              disabled={isPending}
              className={css.priceInput}
              placeholder="0"
            />
          </Form.Item>

          {onGeneratePrice && (
            <AiGenerateButton onGenerate={onGeneratePrice} onApply={handleApplyPrice} />
          )}
        </Flex>
      </div>

      <Divider className={css.divider} />

      {category && (
        <>
          <div className={css.section}>
            <Text strong className={css.sectionTitle}>
              Характеристики
            </Text>
            <AdEditParamsFields category={category as AdCategory} />
          </div>
          <Divider className={css.divider} />
        </>
      )}

      <Form.Item
        name="description"
        label="Описание"
        extra={
          <Text type="secondary" style={{ fontSize: 12 }}>
            {description.length} / {MAX_DESCRIPTION_LENGTH}
          </Text>
        }>
        <TextArea rows={4} maxLength={MAX_DESCRIPTION_LENGTH} disabled={isPending} />
      </Form.Item>

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
