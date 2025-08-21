// src/types/Language.ts
export interface LanguageType {
  about: {
    bio: string;
    techSkills: { name: string; level: number }[];
    languageSkills: { name: string; level: number }[];
    interests: string[];
    photo: string;
    contact: {
      email: string;
      linkedin: string;
      github: string;
      medium: string;
    };
    funFacts: string[];
  };
  buttons: {
    backToTop: string;
    contact: string;
    copyEmail: string;
    cv: string;
    download: string;
    githubRepo: string;
    goBack: string;
    hireMe: string;
    learnMore: string;
    liveDemo: string;
    openInNewTab: string;
    readMore: string;
    seeCode: string;
    showLess: string;
    showMore: string;
    viewProjects: string;
    visitWebsite: string;
  };
  contact: Record<string, never>;
  hero: {
    motto: string;
    services: string[];
    title: string;
  };
  projects: {
    color: string;
    date: string;
    icon: string;
    id: string;
    links: {
      github?: { buttonTitle: string; link: string };
      deployment?: { buttonTitle: string; link: string };
      documentation?: { buttonTitle: string; link: string };
    };
    stack: { icon: string; tool: string }[];
    subTechs: string[];
    tags: string[];
    text: string;
    title: string;
  }[];
  techStack: {
    stack: {
      description: string;
      icon: string;
      name: string;
    }[];
    title: string;
  };
  writings: {
    sectionTitle: string;
    articles: {
      title: string;
      description: string;
      date: string;
      link: string;
      tags: string[];
      coverImage: string;
      themeColor: string;
    }[];
  };
}
