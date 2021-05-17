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
}

export interface projectdata {
  id: string;
  image: string;
  title: string;
}

export interface projectdetail {
  title: string;
  gitHub: string;
  detail: projectdata[];
  date: string;
  explanation: string[];
  tech: string[];
}
