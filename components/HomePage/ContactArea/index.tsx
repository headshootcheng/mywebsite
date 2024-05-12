/** @jsxImportSource @emotion/react */
import React from "react";
import useMobile from "../../../hooks/useMobile";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import NoteIcon from "@mui/icons-material/Note";
import styles from "./Contact.module.css";
interface Props {
  data: ContactData;
}

const ContactArea = React.forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  // if (!data.isEnabled) return null;
  const isMobile = useMobile();
  return (
    <div className={styles.contactWrapper} ref={ref}>
      <span className={styles.header}>{data.sectionName}</span>
      <div className={styles.contactRow}>
        <div
          className={styles.contactItem}
          onClick={() => {
            window.open(data.linkedinUrl);
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
          <span className={styles.contactLink}>{data.linkedinUrl}</span>
        </div>
        <div
          className={styles.contactItem}
          onClick={() => {
            window.open(data.gitUrl);
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
          <span className={styles.contactLink}>{data.gitUrl}</span>
        </div>
        <div
          className={styles.contactItem}
          onClick={() => {
            window.open(data.developernoteUrl);
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
          <span className={styles.contactLink}>{data.developernoteUrl}</span>
        </div>
      </div>
    </div>
  );
});

ContactArea.displayName = "ContactArea";

export default ContactArea;
