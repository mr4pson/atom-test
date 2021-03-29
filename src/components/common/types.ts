export type TypeSelectOption = {
  value: string;
  text: string;
};

export type TypeUserInfo = {
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
