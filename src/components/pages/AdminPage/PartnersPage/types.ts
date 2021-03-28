import { TypeAction } from "components/uiKit/AdminCollapse/types";

export type TypePartner = {
  id?: number;
  title: string;
  body: string;
  data?: any;
  visible: boolean;
  actions: TypeAction[];
  createdAt: string;
  description?: string;
  uploadFile?: string;
  link: string;
}

export type TypeUseUpdatePartnerResult = {
  loading: boolean;
  addPartner: (formData: any) => Promise<any>;
  currentPartner: TypePartner | null;
  getCurrentPartner: (id: string) => Promise<any>;
  updatePartner: (formData: any, id: string) => Promise<any>;
}
