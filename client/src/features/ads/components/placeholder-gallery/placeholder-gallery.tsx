import { Flex, Image } from "antd";
import type { JSX } from "react";

import css from "./placeholder-gallery.module.css";

import { PictureOutlined } from "@ant-design/icons";

type PlaceholderGalleryProps = {
  photos?: string[];
};

export const PlaceholderGallery = ({ photos = [] }: PlaceholderGalleryProps): JSX.Element => {
  const validPhotos = photos.filter((photo): photo is string => Boolean(photo?.trim()));

  const mainPhoto = validPhotos[0];
  const thumbnails = validPhotos.slice(1);

  const renderPlaceholder = (isThumbnail = false): JSX.Element => (
    <Flex
      align="center"
      justify="center"
      className={isThumbnail ? css.thumbnailPlaceholder : css.mainPlaceholder}>
      <PictureOutlined className={isThumbnail ? css.thumbnailIcon : css.mainIcon} />
    </Flex>
  );

  return (
    <div className={css.gallery}>
      <div className={css.mainImageWrapper}>
        {mainPhoto ? (
          <Image
            src={mainPhoto}
            alt="Главное фото"
            preview={false}
            className={css.image}
            placeholder={renderPlaceholder()}
          />
        ) : (
          renderPlaceholder()
        )}
      </div>

      {thumbnails.length > 0 && (
        <div className={css.thumbnailRow}>
          {thumbnails.map((photo, index) => (
            <div key={`${photo}-${index}`} className={css.thumbnailWrapper}>
              <Image
                src={photo}
                alt={`Изображение ${index + 2}`}
                preview={false}
                className={css.image}
                placeholder={renderPlaceholder(true)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
