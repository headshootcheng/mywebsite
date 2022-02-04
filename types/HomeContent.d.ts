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

declare interface CareerData {
  backgroundColor: string;
  backgroundImage: BackgroundImage | null;
  enabled: boolean;
  title: string;

  infos: CareerInfo[];
  __component: ContentType.Career;
}

declare type Content = WelcomeData | ProfileData | CareerData;

declare interface Attribute {
  Content: Content[];
  WebTitle: string;
}

declare interface DataRes {
  attributes: Attribute;
  id: number;
}

declare interface HomeRes {
  data: DataRes;
  meta: any;
}
