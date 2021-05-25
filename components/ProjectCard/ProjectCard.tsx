import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import styles from "./ProjectCard.module.scss";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { projectdata } from "../../utils/globalInterface";

interface Props {
  projectData: projectdata;
}
const ProjectCard = ({ projectData = {} }: Props) => {
  return (
    <Card className={styles.card}>
      <div className={styles.cardMainWrapper}>
        <CardMedia
          className={styles.imgWrapper}
          image={projectData?.image || ""}
          title={projectData?.title || ""}
        />
        <CardContent className={styles.contentWrapper}>
          <span className={styles.title}>{projectData?.title || ""}</span>
        </CardContent>
      </div>
      <CardActions className={styles.actionWrapper}>
        <Button size="small" color="primary">
          Detail
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
