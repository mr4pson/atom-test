import { TypeAction } from "components/uiKit/AdminCollapse/types";

export type TypeMenu = {
  id?: number;
  title: string;
  body: string;
  data?: any;
  visible: boolean;
  actions: TypeAction[];
}