export type TypeSelectOption = {
  value: string;
  text: string;
};

export type TypeItemRule = {
  required: boolean;
  message: string;
}

export type TypeFormState = {
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
}