import { Flex, Tag } from "antd";
import type { JSX } from "react";

export const AdCardRevisionTag = (): JSX.Element => {
  return (
    <Tag
      style={{
        margin: 0,
        width: "fit-content",
        borderRadius: 6,
        border: "none",
        background: "#fff7e6",
        color: "#d46b08",
        fontSize: 12,
        lineHeight: "18px",
        padding: "4px 10px"
      }}>
      <Flex align="center" gap={6}>
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#fa8c16",
            display: "inline-block"
          }}
        />
        Требует доработок
      </Flex>
    </Tag>
  );
};
