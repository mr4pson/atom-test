import axios from "axios";
import { useState } from "react";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { TypeSupporter, TypeUseUpdateSupporterResult } from "../SupportersPage/types";

export function useUpdateSupporter(): TypeUseUpdateSupporterResult {
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const curJwtPair = getJwtPair();
  const [currentSupporter, setCurrentSupporter] = useState<any>(null);

  async function getCurrentSupporter(id: string): Promise<TypeSupporter | Object> {
    setLoadingUpdate(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: supporterData } = await axios.get<TypeSupporter>(
        `/api/supporters/${id}`, options,
      );
        setCurrentSupporter(supporterData);
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoadingUpdate(false);
    }
  }

  async function addSupporter(formData: any): Promise<TypeSupporter | Object> {
    setLoadingUpdate(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.post<TypeSupporter>(
        `/api/supporters/`, { ...formData },
        options,
      );
      console.log(axiosData);
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoadingUpdate(false);
    }
  }

  async function updateSupporter(formData: TypeSupporter, id: string): Promise<TypeSupporter | Object> {
    setLoadingUpdate(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.put<any>(
        `/api/supporters/${id}`, { ...formData },
        options,
      );
      console.log(axiosData);
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoadingUpdate(false);
    }
  }

  return {
    loadingUpdate,
    currentSupporter,
    addSupporter,
    getCurrentSupporter,
    updateSupporter,
  }
}