import { useCallback, useState } from "react";
import { Button, Flex, Popover, Typography } from "antd";
import type { JSX, ReactNode } from "react";

import css from "./ai-generate-button.module.css";

import { BulbOutlined, ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

type AiLabels = {
  buttonDefault: string;
  buttonLoading: string;
  buttonRetry: string;
  popoverTitle: string;
  popoverErrorTitle?: string;
  errorMessage?: string;
  applyButton?: string;
  closeButton?: string;
};

type AiGenerateButtonProps = {
  onGenerate: () => Promise<string>;
  onApply?: (value: string) => void;
  onTransform?: (value: string) => string;
  labels: AiLabels;
  icon?: ReactNode;
};

export const AiGenerateButton = ({
  onGenerate,
  onApply,
  onTransform,
  labels,
  icon = <BulbOutlined />
}: AiGenerateButtonProps): JSX.Element => {
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
      const finalValue = onTransform ? onTransform(response) : response;
      onApply(finalValue);
    }
    setIsPopoverOpen(false);
  }, [response, onApply, onTransform]);

  const renderContent = (): JSX.Element => (
    <div className={css.content}>
      {error ? (
        <>
          <Text type="danger">{labels.errorMessage || "Произошла ошибка"}</Text>
        </>
      ) : (
        <Text className={css.responseText}>{response}</Text>
      )}

      <Flex gap={8} justify="flex-end" className={css.actions} style={{ marginTop: 12 }}>
        <Button size="small" onClick={() => setIsPopoverOpen(false)}>
          {labels.closeButton || "Закрыть"}
        </Button>
        {!error && onApply && (
          <Button type="primary" size="small" onClick={handleApply}>
            {labels.applyButton || "Применить"}
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
      classNames={{ root: error ? css.popoverError : css.popover }}
      styles={{
        content: {
          maxWidth: "450px",
          width: "100%"
        }
      }}
      title={
        <Text strong className={css.title}>
          {error ? labels.popoverErrorTitle || "Ошибка" : labels.popoverTitle}
        </Text>
      }
      content={renderContent()}>
      <Button
        icon={hasRun && !loading ? <ReloadOutlined /> : icon}
        loading={loading}
        onClick={handleClick}
        className={css.button}>
        {loading ? labels.buttonLoading : hasRun ? labels.buttonRetry : labels.buttonDefault}
      </Button>
    </Popover>
  );
};
