import axios from "axios";
import { useState } from "react";
import { TypeUseSignUpResult } from "./types";

export function useSignUp(): TypeUseSignUpResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);
  
  async function regUser(formData: any): Promise<any> {
    setLoading(true);
    try {
      const { data: axiosData } = await axios.post<any>(
        `/api/register/`, { ...formData },
      );
      console.log(axiosData);
      return {};
    } catch ({ response }) {
      console.log(response);
      setStatus(response.status);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    status,
    regUser,
  }
}
