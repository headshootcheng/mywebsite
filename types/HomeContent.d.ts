declare interface WelcomeArea {
  backgroundImage: BackgroundImage;
  enabled: boolean;
  subtitle: string;
  title: string;
  __component: ContentType.Welcome;
}

declare type Content = WelcomeArea;

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
