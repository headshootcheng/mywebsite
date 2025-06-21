import React from "react";

// Initialize Swiper modules outside of component
// SwiperCore.use([Navigation, Pagination]);

interface Props {
  // Future implementation for image gallery
  // parentStyle?: string;
  // projectList?: ProjectItem[];
}

const ImageGallery: React.FC<Props> = () => {
  // TODO: Implement image gallery functionality
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
