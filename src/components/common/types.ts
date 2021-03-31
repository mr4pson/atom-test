export type TypeSelectOption = {
  value: string;
  text: string;
};

export type TypeUserInfo = {
  id: string;
  username: string;
  email: string;
  role: string;
  expire: number;
  fullName: string;
}

export enum userType {
  ADMIN = 'ADMIN',
  USER  =  'USER',
}
