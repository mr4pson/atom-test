import { TypeNewsPageData } from "../NewsPage/types"

export type TypeCreateNewsPageData = {
  id: string;
  name: string;
  heading: string;
  description: string;
  status: string;
  uploadFile: any;
  createdAt: string;
}

export type TypeUseUpdateNewsResult = {
  loading: boolean;
  createNews: (formData: any) => Promise<any>;
  currentNews: TypeNewsPageData | null;
  getCurrentNews: (id: string) => Promise<any>;
  updateNews: (formData: any, id: string) => Promise<any>;
}
