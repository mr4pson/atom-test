import axios from "axios";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { useState } from "react";
import moment from "moment";
import { TypeOrganizationTypes, TypeUseGetOrganizationTypes } from "../PartnersPage/types";

export function useGetOrganizationTypes(): TypeUseGetOrganizationTypes {
  const [loading, setLoading] = useState<boolean>(false);
  const [organizationTypes, setOrganizationTypes] = useState<TypeOrganizationTypes[]>([]);
  const curJwtPair: string = getJwtPair();

  async function getOrganizationTypes(): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.get<any>(
        `/api/organization-types/`, options,
      );
      const transformedNews = axiosData.map((item: TypeOrganizationTypes) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('DD.MM.YYYY'),
        }
      })
      setOrganizationTypes(transformedNews)
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
    getOrganizationTypes,
    organizationTypes,
  }
}