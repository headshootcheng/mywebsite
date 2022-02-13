declare interface ProjectImage {
  id: number;
  image: Image;
  text: string;
}

declare interface ProjectTech {
  id: number;
  content: string;
}

declare interface ProjectAttribute {
  ProjectDescriptions: {
    id: number;
    content: string;
  }[];
  ProjectId: string;
  ProjectImages: ProjectImage[];
  ProjectTitle: string;
  codeUrl: string;
  endDate: string | null;
  startDate: string;
  isCurrent: boolean;
  previewImage: Image;
  projectTechs: ProjectTech[];
  story: string;
}

declare interface ProjectDataRes {
  attributes: ProjectAttribute;
  id: number;
}

declare interface ProjectDetailRes {
  data: ProjectDataRes;
  meta: any;
}

declare interface ProjectListRes {
  data: ProjectDataRes[];
  meta: any;
}
