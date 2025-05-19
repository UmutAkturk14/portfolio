// types/about.ts
export interface Skill {
  name: string;
  level: number; // 1 to 5
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
}

export interface AboutMe {
  bio: string;
  techSkills: Skill[];
  languageSkills: Skill[];
  interests: string[];
  photo: string;
  contact: ContactInfo;
  funFacts: string[];
}
