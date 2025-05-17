export interface ProjectLink {
  buttonTitle: string;
  link: string;
}

export interface TechItem {
  tool: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  date: string;
  text: string;
  color: string;
  icon: string;
  links?: Record<string, ProjectLink>;
  stack?: TechItem[];
  tags?: string[];
  subTechs: string[];
}
