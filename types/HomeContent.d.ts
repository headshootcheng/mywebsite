declare interface WelcomeData {
  backgroundImage: string;
  isEnabled: boolean;
  sectionName: string;
  subTitle: string;
  title: string;
}

declare interface ProfileData {
  image: string;
  isEnabled: boolean;
  text: string;
  sectionName: string;
}

declare interface CertData {
  title: string;
  enabled: boolean;
}

declare interface CareerData {
  sectionName: string;
  isEnabled: boolean;
  items: CareerInfo[];
}

declare interface SkillData {
  sectionName: string;
  isEnabled: boolean;
  items: SkillInfo[];
}

declare interface ProjectData {
  isEnabled: boolean;
  sectionName: string;
  items: ProjectItem[];
}

declare interface ContactData {
  sectionName: string;
  isEnabled: boolean;
  gitUrl: string;
  linkedinUrl: string;
  developernoteUrl: string;
}

declare type Content =
  | WelcomeData
  | ProfileData
  | CareerData
  | CertArea
  | SkillData
  | ProjectData
  | ContactData;

declare interface Attribute {
  Content: Content[];
  WebTitle: string;
  webIcon: Image;
}

declare interface HomeRes {
  title: string;
  icon: string;
  welcomeArea: WelcomeData;
  profileArea: ProfileData;
  careerArea: CareerData;
  skillArea: SkillData;
  projectArea: ProjectData;
  contactArea: ContactData;
}

declare interface Nav {
  title: string;
  position: number;
  onTrigger: (init?: boolean) => void;
}
