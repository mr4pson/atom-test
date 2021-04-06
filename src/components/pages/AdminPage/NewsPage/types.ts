import { TypeSubCategory } from "../MenuDetailPage/types";

export type TypeNewsPageData = {
  id: string;
  name: string;
  heading: string;
  description: string;
  preview: string;
  status: string;
  uploadFile: any;
  subcategory: TypeSubCategory,
  createdAt: string;
  url?: string;
}

export enum newsCreationMode {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
}
