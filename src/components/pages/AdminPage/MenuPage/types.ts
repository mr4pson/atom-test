import { TypeAction } from "components/uiKit/AdminCollapse/types";

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
  actions: TypeAction[];
}