import { TypeParticipant } from "components/pages/PrivateOffice/types"

export type TypeParticipantsData = {
  id: string;
  fullName: string;
  registrationDate: string;
  city: string;
  sex: string;
  phone: string;
}

export type TypeUseUpdateParticipantResult = {
  loading: boolean;
  participants: (TypeParticipant & { createdAt: string })[] | null;
  getParticipants: () => Promise<any>;
  deleteParticipants: (id: string) => Promise<any>;
}