export interface ISong {
  id?: string;
  title: string;
  content: string;
  date: number;
  files?: File[];
}