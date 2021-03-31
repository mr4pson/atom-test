import { TypeAction } from "components/uiKit/AdminCollapse/types"

export type TypeSubCategoryNews = {
  id: string;
  title: string;
  actions: TypeAction[];
}

export type TypeSubCategory = {
  id: string;
  title: string;
  url: string;
  isEditing: boolean;
  openInNewTab: boolean;
  collapseOn?: string;
  news: TypeSubCategoryNews[];
  actions: TypeAction[];
}