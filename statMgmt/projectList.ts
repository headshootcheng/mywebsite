import { atom } from "recoil";
const projectListAtom = atom<ProjectDataRes[]>({
  key: "projectList",
  default: [],
});
export default projectListAtom;
