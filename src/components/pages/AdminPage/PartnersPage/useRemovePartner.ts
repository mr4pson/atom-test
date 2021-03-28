import axios from "axios";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { useState } from "react";
import moment from "moment";
import { TypePartner } from "./types";

export function useRemovePartner(): any {
  const [loading, setLoading] = useState<boolean>(false);
  const [partners, setPartners] = useState<any[]>([]);
  const curJwtPair: string = getJwtPair();

  async function getPartners(): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.get<any>(
        `/api/partners/`, options,
      );
      const transformedNews = axiosData.map((item: TypePartner) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('DD.MM.YYYY'),
        }
      })
      setPartners(transformedNews)
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }
    
  async function deletePartner(id: string): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.delete<any>(
        `/api/partners/${id}`, options,
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
    getPartners,
    partners,
    deletePartner
  }
}