/** @jsxImportSource @emotion/react */
import React, { forwardRef } from "react";
import styles from "./Welcome.module.css";

interface Props {
  data: WelcomeData;
}

const WelcomeArea = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  if (!data.isEnabled) return null;

  return (
    <section
      ref={ref}
      css={{
        backgroundImage: `url(${data.backgroundImage})`,
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={styles.welcomeWrapper}
      role="banner"
      aria-label={`${data.title} - ${data.subTitle}`}
    >
      {/* Overlay for better text readability */}
      <div
        css={{
          position: "absolute",
          backgroundColor: "rgba(128, 128, 128, 0.5)",
          height: "100%",
          width: "100%",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      
      {/* Content container */}
      <div
        css={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <header className={styles.titleArea}>
          <h1 className={styles.title} tabIndex={0}>
            {data.title}
          </h1>
        </header>
        
        <div className={styles.subtitleArea}>
          <p className={styles.subtitle} tabIndex={0}>
            {data.subTitle}
          </p>
        </div>

        {/* Scroll indicator for better UX */}
        <div
          css={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            animation: "bounce 2s infinite",
          }}
          aria-label="Scroll down to see more content"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            css={{ color: "white", cursor: "pointer" }}
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>
      </div>

      {/* Keyframes for scroll indicator animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
      `}</style>
    </section>
  );
});

WelcomeArea.displayName = "WelcomeArea";

export default WelcomeArea;
