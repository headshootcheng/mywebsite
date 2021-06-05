import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);
import styles from "./ImageGallery.module.scss";
import projectdata from "../../model/ProjectData";
import classnames from "classnames";
interface Props {
  parentStyle: Object;
  projectList: projectdata[];
  onClickSlide: (id: string) => void;
}
const ImageGallery: React.FC<Props> = ({
  projectList = [],
  onClickSlide = () => {},
  parentStyle = styles.swiper,
}) => {
  return (
    <Swiper
      className={classnames(parentStyle)}
      breakpoints={{
        "375": {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        "768": {
          slidesPerView: 1,
          spaceBetween: 50,
        },
      }}
      pagination={{ clickable: true }}
    >
      {(projectList || []).map(({ image, title, id }) => {
        return (
          <SwiperSlide
            className={styles.swiperSlide}
            key={id}
            onClick={() => onClickSlide(id)}
          >
            <img src={image} className={styles.imgArea} />
            <div className={styles.textBlock}>
              <div className={styles.textArea}>
                <span className={styles.text}>{title}</span>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageGallery;
