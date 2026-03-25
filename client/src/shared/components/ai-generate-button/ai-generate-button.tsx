import { useCallback, useState } from "react";
import { Button, Flex, Popover, Typography } from "antd";
import type { JSX } from "react";

import css from "./ai-generate-button.module.css";

import { BulbOutlined, ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

type AiGenerateButtonProps = {
  onGenerate: () => Promise<string>;
  onApply?: (value: string) => void;
};

const parsePrice = (text: string): string => {
  const cleaned = text.replace(/\s(?=\d)/g, "");
  const match = cleaned.match(/\d+/);
  return match ? match[0] : "";
};

export const AiGenerateButton = ({ onGenerate, onApply }: AiGenerateButtonProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleClick = useCallback(async (): Promise<void> => {
    setIsPopoverOpen(false);
    setLoading(true);
    setError(false);

    try {
      const result = await onGenerate();
      setResponse(result);
      setHasRun(true);
      setIsPopoverOpen(true);
    } catch {
      setError(true);
      setHasRun(true);
      setIsPopoverOpen(true);
    } finally {
      setLoading(false);
    }
  }, [onGenerate]);

  const handleApply = useCallback((): void => {
    if (response && onApply) {
      const price = parsePrice(response);
      onApply(price);
    }
    setIsPopoverOpen(false);
  }, [response, onApply]);

  const renderContent = (): JSX.Element => (
    <div className={css.content}>
      {error ? (
        <>
          <Text type="danger">Произошла ошибка при запросе к AI</Text>
          <Text type="secondary">Попробуйте повторить запрос или закройте уведомление</Text>
        </>
      ) : (
        <Text className={css.responseText}>{response}</Text>
      )}

      <Flex gap={8} justify="flex-end" className={css.actions} style={{ marginTop: 12 }}>
        <Button size="small" onClick={() => setIsPopoverOpen(false)}>
          Закрыть
        </Button>
        {!error && onApply && (
          <Button type="primary" size="small" onClick={handleApply}>
            Применить
          </Button>
        )}
      </Flex>
    </div>
  );

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
      trigger="click"
      placement="bottomLeft"
      classNames={{
        root: error ? css.popoverError : css.popover
      }}
      title={
        <Text strong className={css.title}>
          {error ? "Ошибка" : "Средняя цена"}
        </Text>
      }
      content={renderContent()}>
      <Button
        icon={hasRun && !loading ? <ReloadOutlined /> : <BulbOutlined />}
        loading={loading}
        onClick={handleClick}
        className={css.button}>
        {loading ? "Выполняется запрос" : hasRun ? "Повторить запрос" : "Узнать рыночную цену"}
      </Button>
    </Popover>
  );
};
