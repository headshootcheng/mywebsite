import careerinfo from "./CareerInfo";
import skillinfo from "./SkillInfo";
import projectdata from "./ProjectData";
interface homedata {
  icon: string;
  intro: string;
  linkedin: string;
  gitbook: string;
  github: string;
  career: careerinfo[];
  skill: skillinfo[];
  project: projectdata[];
}
export default homedata;
