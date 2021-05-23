export interface option {
  id: string;
  link: string;
  display: string;
}

export interface homedata {
  icon: string;
  intro: string;
  linkedin: string;
  gitbook: string;
  github: string;
  career: careerinfo[];
}

export interface nav {
  title: string;
  onPress: () => void;
}

export interface projectdata {
  id: string;
  image: string;
  title: string;
}

export interface careerinfo {
  title: string;
  company: string;
  date: string;
  duties: string[];
}

export interface projectdetail {
  title: string;
  gitHub: string;
  detail: projectdata[];
  date: string;
  explanation: string[];
  tech: string[];
}
