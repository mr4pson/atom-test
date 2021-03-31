export type TypeParticipant = {
  id: string;
  fullName: string;
  city: string;
  sex: string;
  phone: string;
  email: string;
}

export type TypeUseGetParticipantResult = {
  loading: boolean;
  currentParticipant: TypeParticipant | null;
  getCurrentParticipant: (id: string) => Promise<any>;
  updateUser: (formData: any, id: string) => Promise<any>;
}
