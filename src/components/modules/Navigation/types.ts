export type TypeLink = {
  name: string;
  path: string;
  children?: TypeLink[];
  deletable?: boolean;
}