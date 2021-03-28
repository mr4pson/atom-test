import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { TypePartner, TypeUseUpdatePartnerResult } from "../PartnersPage/types";

export function useUpdatePartner(): TypeUseUpdatePartnerResult {
  const [loading, setLoading] = useState<boolean>(false);
  const curJwtPair: string = getJwtPair();
  const [currentPartner, setCurrentPartner] = useState<TypePartner | null>(null);

  async function getCurrentPartner(id: string): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.get<any>(
        `/api/partners/${id}`, options,
      );
      const transformedNews = {
          ...axiosData,
          createdAt: moment(axiosData.createdAt).format('DD.MM.YYYY'),
        }
        setCurrentPartner(transformedNews)
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function addPartner(formData: any): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.post<any>(
        `/api/partners/`, { ...formData },
        options,
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

  async function updatePartner(formData: any, id: string): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.put<any>(
        `/api/partners/${id}`, { ...formData },
        options,
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
    addPartner,
    currentPartner,
    getCurrentPartner,
    updatePartner,
  }
}