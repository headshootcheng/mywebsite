/** @jsxImportSource @emotion/react */
import React from "react";
import useMobile from "../../../hooks/useMobile";
import { ContactData } from "../../../types/HomeContent";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import NoteIcon from "@mui/icons-material/Note";
import styles from "./Contact.module.css";
interface Props {
  data: ContactData;
}

const ContactArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  if (!data.enabled) return null;
  const isMobile = useMobile();
  return (
    <div
      css={{ backgroundColor: `${data.backgroundColor}` }}
      className={styles.contactWrapper}
      ref={ref}
    >
      <span className={styles.header}>{data.title}</span>
      <div className={styles.contactRow}>
        <div
          className={styles.contactItem}
          onClick={() => {
            window.open(data.linkedin);
          }}
        >
          <LinkedInIcon
            fontSize="large"
            sx={{
              height: isMobile ? 40 : 50,
              width: isMobile ? 40 : 50,
              margin: 0,
              color: "white",
            }}
          />
          <span className={styles.contactLink}>{data.linkedin}</span>
        </div>
        <div
          className={styles.contactItem}
          onClick={() => {
            window.open(data.github);
          }}
        >
          <GitHubIcon
            fontSize="large"
            sx={{
              height: isMobile ? 40 : 50,
              width: isMobile ? 40 : 50,
              margin: 0,
              color: "white",
            }}
          />
          <span className={styles.contactLink}>{data.github}</span>
        </div>
        <div
          className={styles.contactItem}
          onClick={() => {
            window.open(data.developerNote);
          }}
        >
          <NoteIcon
            fontSize="large"
            sx={{
              height: isMobile ? 40 : 50,
              width: isMobile ? 40 : 50,
              margin: 0,
              color: "white",
            }}
          />
          <span className={styles.contactLink}>{data.developerNote}</span>
        </div>
      </div>
    </div>
  );
});

ContactArea.displayName = "ContactArea";

export default ContactArea;
