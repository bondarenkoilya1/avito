import { Flex } from "antd";
import type { JSX } from "react";

import { PlaceholderGallery } from "@/features/ads/components/details/placeholder-gallery";

import css from "./ad-details-gallery.module.css";

type AdDetailsGalleryProps = {
  photos?: string[];
};

export const AdDetailsGallery = ({ photos }: AdDetailsGalleryProps): JSX.Element => {
  return (
    <Flex vertical gap={12} className={css.gallery}>
      <PlaceholderGallery photos={photos} />
    </Flex>
  );
};
