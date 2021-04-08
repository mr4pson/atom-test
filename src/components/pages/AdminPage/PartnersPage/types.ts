import { TypeAction } from "components/uiKit/AdminCollapse/types";

export type TypePartner = {
  id?: string;
  title: string;
  body: string;
  data?: any;
  visible: boolean;
  actions: TypeAction[];
  createdAt: string;
  description?: string;
  uploadFile?: string;
  link: string;
  massMedia: string;
  organizationType: TypeOrganizationTypes;
  organizationTypeObject: TypeOrganizationTypes;
  ownType: string;
}

export type TypeUseUpdatePartnerResult = {
  loadingUpdate: boolean;
  addPartner: (formData: any) => Promise<any>;
  currentPartner: TypePartner | null;
  getCurrentPartner: (id: string) => Promise<any>;
  updatePartner: (formData: any, id: string) => Promise<any>;
  isOwnTypeShown: boolean;
  setIsOwnTypeShown: (value: boolean) => any;
}

export type TypeUseRemovePartnerResult = {
  loading: boolean;
  getPartners: () => Promise<any>;
  partners: any[];
  deletePartner: (id: string) => Promise<any>;
}

export type TypeOrganizationTypes = {
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

export type TypeUseGetOrganizationTypes = {
  loading: boolean;
  getOrganizationTypes: () => Promise<any>;
  organizationTypes: TypeOrganizationTypes[];
}

export type TypeUseRemovePartner = {
  loading: boolean;
  getPartners: () => Promise<TypePartner[] | Object>;
  partners: TypePartner[];
  deletePartner: (id: string) => Promise<TypePartner[] | Object>;
  magazines: TypePartner[];
  getMagazines: (id: string) => Promise<TypePartner[] | Object>;
}
