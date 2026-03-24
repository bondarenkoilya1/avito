import { type JSX } from "react";
import { Button, Divider, Flex, Form, Input, Select, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { CATEGORY_OPTIONS, MAX_DESCRIPTION_LENGTH } from "@/features/ads/pages/ad-edit-page";
import { type AdCategory, type AdType } from "@/features/ads/types";

import { AdEditParamsFields } from "../ad-edit-params-fields";

import css from "./ad-edit-form.module.css";

const { Text } = Typography;
const { TextArea } = Input;

export const AdEditForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [form] = Form.useForm<AdType>();
  const category = Form.useWatch("category", form) as AdCategory | undefined;
  const description = Form.useWatch("description", form) ?? "";

  return (
    <Form form={form} layout="vertical" className={css.form}>
      <Form.Item name="category" label="Категория" style={{ maxWidth: 256 }}>
        <Select options={CATEGORY_OPTIONS} />
      </Form.Item>

      <Divider className={css.divider} />

      <Form.Item
        name="title"
        label="Название"
        required
        rules={[{ required: true, message: "Введите название" }]}
        className={css.fieldWide}>
        <Input allowClear />
      </Form.Item>

      <Divider className={css.divider} />

      <Form.Item
        name="price"
        label="Цена"
        required
        rules={[{ required: true, message: "Введите цену" }]}
        className={css.fieldWide}>
        <Input type="number" allowClear />
      </Form.Item>

      <Divider className={css.divider} />

      {category && (
        <>
          <div className={css.section}>
            <Text strong className={css.sectionTitle}>
              Характеристики
            </Text>
            <AdEditParamsFields category={category} />
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
        <TextArea rows={4} maxLength={MAX_DESCRIPTION_LENGTH} />
      </Form.Item>

      <Flex gap={8}>
        <Button type="primary">Сохранить</Button>
        <Button onClick={() => navigate(-1)}>Отменить</Button>
      </Flex>
    </Form>
  );
};
