import { type JSX, useCallback, useEffect } from "react";
import { Button, Divider, Flex, Form, Input, Select, Typography } from "antd";
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

const DEFAULT_AI_LABELS = {
  buttonLoading: "Выполняется запрос",
  buttonRetry: "Повторить запрос",
  popoverTitle: "Ответ AI:",
  popoverErrorTitle: "Ошибка запроса",
  errorMessage: "Не удалось получить оценку. Попробуйте позже.",
  applyButton: "Применить",
  closeButton: "Закрыть"
};

const PRICE_AI_LABELS = {
  buttonDefault: "Узнать рыночную цену",
  ...DEFAULT_AI_LABELS
};

const DESCRIPTION_GEN_LABELS = {
  buttonDefault: "Придумать описание",
  ...DEFAULT_AI_LABELS
};

const DESCRIPTION_IMPROVE_LABELS = {
  buttonDefault: "Улучшить описание",
  ...DEFAULT_AI_LABELS
};

type AdEditFormProps = {
  adId: number;
  initialValues?: AdType;
  onGeneratePrice?: () => Promise<string>;
  onGenerateDescription?: (currentText: string) => Promise<string>;
};

const extractPrice = (value: string): string | null => {
  const cleaned = value.replace(/\s/g, "");
  const match = cleaned.match(/\d+([.,]\d+)?/);
  return match ? match[0].replace(",", ".") : null;
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
  const isDescriptionEmpty = description.trim().length === 0;

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

      <div className={css.fieldFixedWidth}>
        <Text style={{ display: "block", marginBottom: 8 }}>Цена</Text>
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
              onApply={handleApplyPrice}
              labels={PRICE_AI_LABELS}
            />
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
        label={
          <Flex align="center" gap={12}>
            <span>Описание</span>
            {onGenerateDescription && (
              <AiGenerateButton
                onGenerate={() => onGenerateDescription(description)}
                onApply={handleApplyDescription}
                labels={isDescriptionEmpty ? DESCRIPTION_GEN_LABELS : DESCRIPTION_IMPROVE_LABELS}
              />
            )}
          </Flex>
        }
        extra={
          <Text type="secondary" style={{ fontSize: 12 }}>
            {description.length} / {MAX_DESCRIPTION_LENGTH}
          </Text>
        }>
        <TextArea rows={6} maxLength={MAX_DESCRIPTION_LENGTH} disabled={isPending} />
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
