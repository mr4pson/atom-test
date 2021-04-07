import { TypeSubCategory } from "components/pages/AdminPage/MenuDetailPage/types"

export type TypeLink = {
  name: string;
  path: string;
  children?: TypeLink[];
  deletable?: boolean;
}

export type TypeMenu = {
  createdAt: string;
  deletable: boolean;
  editable: boolean;
  id: string;
  subcategories: TypeSubCategory[];
  title: string;
  updatedAt: string;
  url: string;
  visible: boolean;
}
