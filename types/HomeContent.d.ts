import { ContentType } from "./enums/ContentType";

declare interface WelcomeData {
  backgroundImage: BackgroundImage;
  enabled: boolean;
  subtitle: string;
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

declare type Content = WelcomeData | ProfileData;

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
