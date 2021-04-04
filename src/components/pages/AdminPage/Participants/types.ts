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
  getParticipantByName: (name: string) => Promise<TypeParticipant & { createdAt: string } | Object>;
  deleteParticipants: (id: string) => Promise<any>;
}
