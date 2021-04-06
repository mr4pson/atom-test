import axios from "axios";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { useState } from "react";
import { counterParametersType, StatusType } from "./types";

type TypeUseUpdateCounterResult = {
  bannerData: string;
  testData: any;
  loading: boolean;
  statusType: StatusType;
  counterName: counterParametersType | undefined;
  getCounterParameters: (type: counterParametersType) => Promise<any>;
  updateCounterParameters: (formData: any, id: counterParametersType) => Promise<any>;
}

export function useUpdateCounterParameters(): TypeUseUpdateCounterResult {
  const [loading, setLoading] = useState<boolean>(false);
  const curJwtPair = getJwtPair();
  const [statusType, setStatusType] = useState<StatusType>(StatusType.INFO);
  const [counterName, setCounterName] = useState<counterParametersType>();
  const [bannerData, setBannerData] = useState<any>();
  const [testData, setTestData] = useState<any>();

  async function getCounterParameters(type: counterParametersType): Promise<any> {
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.get<any>(
        `/api/counter-parameters/${type}`, options,
      );
      if (type === counterParametersType.BANNER) {
        setBannerData(axiosData.data);
      } else {
        setTestData(JSON.parse(axiosData.data));
      }
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function updateCounterParameters(formData: any, id: counterParametersType): Promise<any> {
    setStatusType(StatusType.INFO);
    setLoading(true);
    setCounterName(id);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.put<any>(
        `/api/counter-parameters/${id}`, { data: formData },
        options,
      );
      console.log(axiosData);
      setStatusType(StatusType.SUCCESS);
      return {};
    } catch ({ response }) {
      console.log(response);
      setStatusType(StatusType.ERROR);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  return {
    bannerData,
    testData,
    loading,
    statusType,
    counterName,
    getCounterParameters,
    updateCounterParameters,
  }
}
