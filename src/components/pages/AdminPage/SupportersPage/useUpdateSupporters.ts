import axios from "axios";
import { useState } from "react";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { TypeSupporter, TypeUseRemoveSupporterResult } from "./types";

export function useUpdateSupporters(): TypeUseRemoveSupporterResult {
  const [loading, setLoading] = useState<boolean>(false);
  const curJwtPair: string = getJwtPair();
  const [supporters, setSupporters] = useState<TypeSupporter[] | null>(null);

  async function getSupporters(): Promise<TypeSupporter | Object> {
    setLoading(true);
    const options = {
      headers: {
        'Authorization': `Bearer ${curJwtPair}`,
        'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.get<TypeSupporter[]>(
        `/api/supporters/`, options,
      );
      setSupporters(axiosData)
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function deleteSupporter(id: string): Promise<TypeSupporter | Object> {
    setLoading(true);
    const options = {
      headers: {
        'Authorization': `Bearer ${curJwtPair}`,
        'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.delete<any>(
        `/api/supporters/${id}`, options,
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
    supporters,
    getSupporters,
    deleteSupporter,
  }
}
