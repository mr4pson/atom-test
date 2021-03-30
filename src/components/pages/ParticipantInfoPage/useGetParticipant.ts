import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { TypeUseGetParticipantResult } from "./types";
import { TypeParticipant } from "../PrivateOffice/types";

export function useGetParticipant(): TypeUseGetParticipantResult {
  const [loading, setLoading] = useState<boolean>(false);
  const curJwtPair: string = getJwtPair();
  const [currentParticipant, setCurrentParticipant] = useState<TypeParticipant | null>(null);

  async function getCurrentParticipant(id: string): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.get<any>(
        `/api/users/${id}`, options,
      );
      const transformedNews = {
          ...axiosData,
          createdAt: moment(axiosData.createdAt).format('DD.MM.YYYY'),
        }
        setCurrentParticipant(transformedNews)
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    currentParticipant,
    getCurrentParticipant,
  }
}
