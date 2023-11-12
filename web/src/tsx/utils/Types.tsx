export interface DisasterCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

export interface AdvancementCardProps {
  title: string;
  subtitle: string;
  link: string;
  imagePath: string;
}

export interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export interface PersonCardProps {
  name: string;
  role: string;
  image: string;
  github: string;
  insta: string;
  linkedin?: string;
  delay: number;
}
