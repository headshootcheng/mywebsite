import React from "react";
import { useRouter } from "next/router";
const ProjectDetail = () => {
  const router = useRouter();
  const { projectId } = router.query;
  return <div>{projectId}</div>;
};

export default ProjectDetail;
