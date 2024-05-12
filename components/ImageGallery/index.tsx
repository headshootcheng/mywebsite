import React from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);
interface Props {
  parentStyle: string;
  // projectList: ProjectItem;
}
const ImageGallery: React.FC<Props> = ({ parentStyle }) => {
  return null;
  // return (
  //   <Swiper
  //     className={Classnames(parentStyle)}
  //     breakpoints={{
  //       "375": {
  //         slidesPerView: 1,
  //         spaceBetween: 0,
  //       },
  //       "768": {
  //         slidesPerView: 1,
  //         spaceBetween: 50,
  //       },
  //     }}
  //     pagination={{ clickable: true }}
  //   >
  //     {projectList.map((project) => {
  //       return (
  //         <SwiperSlide className={styles.swiperSlide} key={project._id}>
  //           <img src={project.photoUrl} className={styles.imgArea} />
  //           <div className={styles.textBlock}>
  //             <span className={styles.text}>{project.title}</span>
  //           </div>
  //         </SwiperSlide>
  //       );
  //     })}
  //   </Swiper>
  // );
};

export default ImageGallery;
