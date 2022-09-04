import { ContentType } from "./enums/ContentType";

declare interface WelcomeData {
  backgroundImage: BackgroundImage;
  enabled: boolean;
  headerTitle: string;
  headerSubtitle: string;
  title: string;
  __component: ContentType.Welcome;
}

declare interface ProfileData {
  title: string;
  profileImage: Image;
  enabled: boolean;
  myIntro: string;
  backgroundColor: string;
  backgroundImage: BackgroundImage | null;
  __component: ContentType.Profile;
}

declare interface CertData {
  title: string;
  enabled: boolean;
  backgroundColor: string;
  __component: ContentType.Cert;
}

declare interface CareerData {
  backgroundColor: string;
  backgroundImage: BackgroundImage | null;
  enabled: boolean;
  title: string;
  infos: CareerInfo[];
  __component: ContentType.Career;
}

declare interface SkillData {
  backgroundColor: string;
  SkillInfos: SkillInfo[];
  title: string;
  __component: ContentType.Skill;
  enabled: boolean;
  SkillTypes: SkillType[];
}

declare interface ProjectData {
  backgroundColor: string;
  enabled: boolean;
  title: string;
  __component: ContentType.Project;
}

declare interface ContactData {
  backgroundColor: string;
  enabled: boolean;
  title: string;
  __component: ContentType.Contact;
  github: string;
  linkedin: string;
  developerNote: string;
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

declare interface DataRes {
  attributes: Attribute;
  id: number;
}

declare interface HomeRes {
  data: DataRes;
  meta: any;
}
