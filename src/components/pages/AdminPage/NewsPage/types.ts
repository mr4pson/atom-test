import { TypeSubCategory } from "../MenuDetailPage/types";

export type TypeNewsPageData = {
  id: string;
  name: string;
  heading: string;
  description: string;
  status: string;
  uploadFile: any;
  subcategory: TypeSubCategory,
  createdAt: string;
}

export enum newsCreationMode {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
}
