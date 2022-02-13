import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);
import styles from "./ImageGallery.module.scss";
import Classnames from "classnames";
interface Props {
  parentStyle: string;
  projectList: ProjectImage[];
}
const ImageGallery: React.FC<Props> = ({ projectList = [], parentStyle }) => {
  return (
    <Swiper
      className={Classnames(parentStyle)}
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
      {projectList.map((project) => {
        return (
          <SwiperSlide className={styles.swiperSlide} key={project.id}>
            <img
              src={project.image.data.attributes.url}
              className={styles.imgArea}
            />
            <div className={styles.textBlock}>
              <div className={styles.textArea}>
                <span className={styles.text}>{project.text}</span>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageGallery;
