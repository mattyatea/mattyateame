export interface Stack {
  name: string;
  star: number;
}

export interface TimelineEntry {
  title: string;
  date: string;
  description?: string;
}

export interface Profile {
  name: string;
  birthDate: string;
  avatarUrl: string;
  avatarAlt: string;
}