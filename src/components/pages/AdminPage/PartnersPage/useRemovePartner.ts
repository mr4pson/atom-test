import axios from "axios";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { useState } from "react";
import moment from "moment";
import { TypePartner, TypeUseRemovePartner } from "./types";

export function useRemovePartner(): TypeUseRemovePartner {
  const [loading, setLoading] = useState<boolean>(false);
  const [partners, setPartners] = useState<TypePartner[]>([]);
  const [magazines, setMagazines] = useState<TypePartner[]>([]);
  const curJwtPair = getJwtPair();

  async function getPartners(): Promise<TypePartner[] | Object> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.get<TypePartner[]>(
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
    
  async function deletePartner(id: string): Promise<TypePartner[] | Object> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
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

  async function getMagazines(id: string): Promise<TypePartner[] | Object> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: partnersData } = await axios.get<TypePartner[]>(
        `/api/partners/byOrganizationType/${id}`, options,
      );
      setMagazines(partnersData)
      return [];
    } catch ({ response }) {
      // console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    getPartners,
    partners,
    deletePartner,
    magazines,
    getMagazines
  }
}