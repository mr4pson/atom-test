import { TypeAction } from "components/uiKit/AdminCollapse/types";
import { TypeSubCategory } from "../MenuDetailPage/types";

export type TypeMenu = {
  id?: string;
  _id?: string;
  title: string;
  url?: string;
  isEditing: boolean;
  visible: boolean;
  editable: boolean;
  deletable: boolean;
  collapseOn?: string;
  subcategories?: TypeSubCategory[];
  actions: TypeAction[];
}