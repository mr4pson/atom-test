import axios from "axios";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { useState } from "react";
import moment from "moment";
import { TypeDictationQuestion, TypeUseUpdateDictationQuestionsResult } from "./types";

export function useUpdateDictationQuestions(): TypeUseUpdateDictationQuestionsResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [dictationQuestions, setDictationQuestions] = useState<TypeDictationQuestion[]>([]);
  const curJwtPair = getJwtPair();
  const [error, setError] = useState<boolean>(false);

  async function getDictationQuestions(): Promise<TypeDictationQuestion[] | Object> {
    setError(false);
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.get<TypeDictationQuestion[]>(
        `/api/dictation-questions/`, options,
      );
      const transformedNews = axiosData.map((item: TypeDictationQuestion) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format('DD.MM.YYYY'),
        }
      })
      setDictationQuestions(transformedNews);
      return {};
    } catch ({ response }) {
      setError(true);
      // console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function addDictationQuestion(formData: any): Promise<Object> {
    setError(false);
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.post<TypeDictationQuestion>(
        `/api/dictation-questions/`, { ...formData },
        options,
      );
      console.log(axiosData);
      return {};
    } catch ({ response }) {
      setError(true);
      // console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  async function deleteDictationQuestion(id: string): Promise<Object> {
    setError(false);
    setLoading(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: axiosData } = await axios.delete<TypeDictationQuestion>(
        `/api/dictation-questions/${id}`, options,
      );
      console.log(axiosData);
      return {};
    } catch ({ response }) {
      setError(true);
      // console.log(response);
      return { error: response };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    addDictationQuestion,
    getDictationQuestions,
    dictationQuestions,
    deleteDictationQuestion
  }
}