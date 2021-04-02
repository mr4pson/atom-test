import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { TypePartner, TypeUseUpdatePartnerResult } from "../PartnersPage/types";

export function useUpdatePartner(): TypeUseUpdatePartnerResult {
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const curJwtPair: string = getJwtPair();
  const [currentPartner, setCurrentPartner] = useState<any>(null);

  async function getCurrentPartner(id: string): Promise<any> {
    setLoadingUpdate(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: partnerData } = await axios.get<TypePartner>(
        `/api/partners/${id}`, options,
      );
      const transformedNews = {
          ...partnerData,
          createdAt: moment(partnerData.createdAt).format('DD.MM.YYYY'),
          organizationType: partnerData.organizationType?.id,
        }
        setCurrentPartner(transformedNews);
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoadingUpdate(false);
    }
  }

  async function addPartner(formData: any): Promise<any> {
    setLoadingUpdate(true);
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
      setLoadingUpdate(false);
    }
  }

  async function updatePartner(formData: any, id: string): Promise<any> {
    setLoadingUpdate(true);
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
      setLoadingUpdate(false);
    }
  }

  return {
    loadingUpdate,
    addPartner,
    currentPartner,
    getCurrentPartner,
    updatePartner,
  }
}