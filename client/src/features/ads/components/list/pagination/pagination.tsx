import { Pagination } from "antd";
import type { JSX } from "react";

type PaginationComponentProps = {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
};

export const PaginationComponent = ({
  current,
  pageSize,
  total,
  onChange
}: PaginationComponentProps): JSX.Element => {
  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      showSizeChanger={false}
      hideOnSinglePage
    />
  );
};
