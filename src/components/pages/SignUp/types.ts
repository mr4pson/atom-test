export type TypeItemRule = {
  required: boolean;
  message: string;
}

export type TypeFormState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  sex: string;
  username: string;
  password: string;
}

export type TypeUseSignUpResult = {
  loading: boolean;
  status: number | null;
  regUser: (formData: any) => Promise<any>;
}