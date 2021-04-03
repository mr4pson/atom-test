export type TypeSupporter = {
  id: string;
  fullName: string;
  uploadFile: string;
  position: string;
  organization: string;
}

export type TypeUseRemoveSupporterResult = {
  loading: boolean;
  supporters: TypeSupporter[] | null;
  getSupporters: () => Promise<TypeSupporter | Object>;
  deleteSupporter: (id: string) => Promise<TypeSupporter | Object>;
}

export type TypeUseUpdateSupporterResult = {
  loadingUpdate: boolean;
  currentSupporter: TypeSupporter | null;
  addSupporter: (formData: any) => Promise<TypeSupporter | Object>;
  getCurrentSupporter: (id: string) => Promise<TypeSupporter | Object>;
  updateSupporter: (formData: any, id: string) => Promise<TypeSupporter | Object>;
}