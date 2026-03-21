import { Pagination } from "antd";
import type { JSX } from "react";

export const PaginationComponent = (): JSX.Element => {
  return <Pagination total={50} pageSize={10} showSizeChanger={false} />;
};
