import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);
import styles from "./ImageGallery.module.scss";
import Image from "next/image";
const ImageGallery = () => {
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
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className={styles.swiperSlide}>
        <Image src="/superwhackamole/game.jpg" layout="fill" />
        <div className={styles.textBlock}>
          <div className={styles.textArea}>
            <span className={styles.text}>Super Whack A Mole</span>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <Image src="/iefyp/app.jpg" layout="fill" />
        <div className={styles.textBlock}>
          <div className={styles.textArea}>
            <span className={styles.text}>Final Year Project</span>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className={styles.swiperSlide}>
        <Image src="/friendchat/dashboard.jpg" layout="fill" />
        <div className={styles.textBlock}>
          <div className={styles.textArea}>
            <span className={styles.text}>Friend Chat</span>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageGallery;
