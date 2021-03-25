import axios from "axios";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { useState } from "react";
import { counterParametersType, StatusType } from "./types";

type TypeUseUpdateCounterResult = {
  loading: boolean;
  statusType: StatusType;
  counterName: counterParametersType | undefined;
  updateCounterParameters: (formData: any, id: counterParametersType) => Promise<any>;
}

export function useUpdateCounterParameters(): TypeUseUpdateCounterResult {
  const [loading, setLoading] = useState<boolean>(false);
  const curJwtPair: string = getJwtPair();
  const [statusType, setStatusType] = useState<StatusType>(StatusType.INFO);
  const [counterName, setCounterName] = useState<counterParametersType>();

  async function updateCounterParameters(formData: any, id: counterParametersType): Promise<any> {
    setStatusType(StatusType.INFO);
    setLoading(true);
    setCounterName(id);
    const options = {
      headers: {
          'Authorization': `Bearer ${curJwtPair}`,
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
    loading,
    statusType,
    counterName,
    updateCounterParameters,
  }
}
