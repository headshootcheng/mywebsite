import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);
import styles from "./ImageGallery.module.scss";
import Image from "next/image";
import { projectdata } from "../../utils/globalInterface";
interface Props {
  projectList: projectdata[];
  onClickSlide: (id: string) => void;
}
const ImageGallery = ({ projectList, onClickSlide = () => {} }: Props) => {
  return (
    <Swiper
      className={styles.swiper}
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
      // onSlideChange={() => console.log("slide change")}
      //onSwiper={(swiper) => console.log("swiper", swiper)}
    >
      {(projectList || []).map(({ image, title, id }) => {
        return (
          <SwiperSlide
            className={styles.swiperSlide}
            key={id}
            onClick={() => onClickSlide(id)}
          >
            <Image src={image} layout="fill" />
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
