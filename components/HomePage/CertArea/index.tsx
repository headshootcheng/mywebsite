/** @jsxImportSource @emotion/react */
import React from "react";
import useMobile from "../../../hooks/useMobile";
import { useRouter } from "next/router";
interface Props {
  data: CertData;
}

const CertArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const [isReveal, setIsReveal] = React.useState<boolean>(false);
  const route = useRouter();
  if (!data.enabled) return null;
  React.useEffect(() => {
    const handleScroll = () => {
      if (
        typeof ref !== "function" &&
        ref?.current?.offsetTop &&
        window.scrollY > ref?.current?.offsetTop - 400
      )
        setIsReveal(true);
      else setIsReveal(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const isMobile = useMobile();
  return null;
  // return (
  //   <div
  //     css={{ backgroundColor: `${data.backgroundColor}` }}
  //     className={styles.certWrapper}
  //     ref={ref}
  //   >
  //     <span className={styles.header}>{data.title}</span>
  //     <div className="gap-28 flex flex-col w-full mt-20">
  //       {/* {certList
  //           .sort((a, b) => a.id - b.id)
  //           .map((cert, i) => (
  //             <div
  //               key={cert.attributes.certId}
  //               css={{
  //                 flexDirection: `${
  //                   isMobile
  //                     ? "column-reverse"
  //                     : i % 2 == 0
  //                     ? "row"
  //                     : "row-reverse"
  //                 }`,
  //                 transitionDelay: `${i / 2}s`,
  //                 alignItems: `${isMobile ? "center" : ""}`,
  //               }}
  //               className={ClassNames([
  //                 styles.certItemWrapper,
  //                 { [styles.certItemWrapper_active]: isReveal },
  //               ])}
  //             >
  //               <div
  //                 css={{
  //                   alignItems: `${
  //                     isMobile ? "center" : i % 2 == 0 ? "start" : "end"
  //                   }`,
  //                 }}
  //                 className={styles.certItemWrapper_text}
  //               >
  //                 <span className={styles.certItemWrapper_text_title}>
  //                   {cert.attributes.certTitle}
  //                 </span>
  //                 <span
  //                   css={{
  //                     textAlign: `${
  //                       isMobile ? "center" : i % 2 == 0 ? "left" : "right"
  //                     }`,
  //                     height: "100%",
  //                   }}
  //                 >
  //                   {cert.attributes.story}
  //                 </span>
  //                 <Button
  //                   variant="text"
  //                   endIcon={<ArrowForwardIcon />}
  //                   sx={{ color: "black" }}
  //                   onClick={() => {
  //                     route.replace(`/cert/${cert.id}`);
  //                   }}
  //                 >
  //                   View Detail
  //                 </Button>
  //               </div>
  //               <div className={styles.certItemWrapper_image}>
  //                 <img
  //                   src={cert.attributes.previewImage.data.attributes.url}
  //                   alt={cert.attributes.previewImage.data.attributes.name}
  //                   className={styles.certItemWrapper_image_content}
  //                 />
  //               </div>
  //             </div>
  //           ))} */}
  //     </div>
  //   </div>
  // );
});

CertArea.displayName = "CertArea";

export default CertArea;
