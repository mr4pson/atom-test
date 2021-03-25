export type TypeNewsPageData = {
  id: string;
  name: string;
  heading: string;
  description: string;
  status: string;
  uploadFile: any;
  createdAt: string;
}

export enum newsCreationMode {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
}
