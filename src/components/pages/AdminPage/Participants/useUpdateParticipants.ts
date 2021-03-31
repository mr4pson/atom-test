import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { TypeUseUpdateParticipantResult } from "./types";
import { TypeParticipant } from "components/pages/PrivateOffice/types";

export function useUpdateParticipants(): TypeUseUpdateParticipantResult {
  const [loading, setLoading] = useState<boolean>(false);
  const curJwtPair: string = getJwtPair();
  const [participants, setParticipants] = useState<
    (TypeParticipant & { createdAt: string })[] | null
  >(null);

  async function getParticipants(): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
        'Authorization': `Bearer ${curJwtPair}`,
        'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.get<any>(
        `/api/users/`, options,
      );
      const transformedNews = axiosData.map((item: TypeParticipant & { createdAt: string }) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('DD.MM.YYYY'),
        }
      })
      setParticipants(transformedNews)
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function deleteParticipants(id: string): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
        'Authorization': `Bearer ${curJwtPair}`,
        'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.delete<any>(
        `/api/users/${id}`, options,
      );
      console.log(axiosData);
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
    participants,
    getParticipants,
    deleteParticipants,
  }
}
