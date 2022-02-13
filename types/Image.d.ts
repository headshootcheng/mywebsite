declare interface BackgroundImage {
  image: Image;
  overlayColor: string | null;
}

declare interface Image {
  data: Data;
}

interface Data {
  attributes: Attribute;
}

interface Attribute {
  name: string;
  url: string;
}
