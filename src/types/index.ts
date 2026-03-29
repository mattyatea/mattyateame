export interface Stack {
  name: string;
  star: number;
}

export interface TimelineEntry {
  title: string;
  date: string;
  description?: string;
  type?: 'work' | 'oss' | 'edu' | 'personal';
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  url?: string;
  status: 'active' | 'ended';
}

export interface Profile {
  name: string;
  birthDate: string;
  avatarUrl: string;
  avatarAlt: string;
}
