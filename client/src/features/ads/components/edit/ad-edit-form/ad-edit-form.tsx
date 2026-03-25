import { useEffect } from "react";
import { Button, Divider, Flex, Form, Input, Select, Typography } from "antd";
import type { JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUpdateAd } from "@/features/ads/hooks/use-replace-ad";
import { CATEGORY_OPTIONS, MAX_DESCRIPTION_LENGTH } from "@/features/ads/pages/ad-edit-page";
import { type AdCategory, type AdType, type AdUpdateType } from "@/features/ads/types";

import { AdEditParamsFields } from "../ad-edit-params-fields";

import css from "./ad-edit-form.module.css";

const { Text } = Typography;
const { TextArea } = Input;

interface AdEditFormProps {
  initialValues?: AdType;
}

export const AdEditForm = ({ initialValues }: AdEditFormProps): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm<AdUpdateType>();

  const { mutate, isPending } = useUpdateAd(Number(id));

  const category = Form.useWatch("category", form);
  const description = Form.useWatch("description", form) ?? "";

  useEffect(() => {
    if (initialValues) {
      const sanitizedValues = {
        ...initialValues,
        price: initialValues.price ?? undefined
      };

      form.setFieldsValue(sanitizedValues as AdUpdateType);
    }
  }, [initialValues, form]);

  const handleCategoryChange = (): void => {
    void form.setFieldValue("params", {});
  };

  const onFinish = (values: AdUpdateType): void => {
    mutate({
      ...values,
      price: Number(values.price)
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className={css.form}
      initialValues={initialValues}
      onFinish={onFinish}>
      <Form.Item
        name="category"
        label="Категория"
        style={{ maxWidth: 256 }}
        rules={[{ required: true, message: "Выберите категорию" }]}>
        <Select options={CATEGORY_OPTIONS} onChange={handleCategoryChange} />
      </Form.Item>

      <Divider className={css.divider} />

      <Form.Item
        name="title"
        label="Название"
        rules={[{ required: true, message: "Введите название" }]}
        className={css.fieldWide}>
        <Input allowClear disabled={isPending} />
      </Form.Item>

      <Divider className={css.divider} />

      <Form.Item
        name="price"
        label="Цена"
        rules={[{ required: true, message: "Введите цену" }]}
        className={css.fieldWide}>
        <Input type="number" allowClear disabled={isPending} />
      </Form.Item>

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
        className={css.fieldWide}
        extra={
          <Text type="secondary" className={css.charCounter}>
            {description.length} / {MAX_DESCRIPTION_LENGTH}
          </Text>
        }>
        <TextArea rows={2} maxLength={MAX_DESCRIPTION_LENGTH} disabled={isPending} />
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
