import { TypeParticipant } from "../PrivateOffice/types";

export type TypeUseGetParticipantResult = {
  loading: boolean;
  currentParticipant: TypeParticipant | null;
  getCurrentParticipant: (id: string) => Promise<any>;
}