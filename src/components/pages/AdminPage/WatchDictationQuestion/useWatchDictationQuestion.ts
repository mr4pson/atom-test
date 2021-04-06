import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { 
  TypeDictationQuestion,
  TypeUseWatchDictationQuestionResult,
} from "../DictationQuestionsPage/types";

export function useWatchDictationQuestion(): TypeUseWatchDictationQuestionResult {
  const [loadingWatch, setLoadingWatch] = useState<boolean>(false);
  const curJwtPair = getJwtPair();
  const [currentQuestion, setCurrentQuestion] = useState<TypeDictationQuestion | null>(null);

  async function getCurrentQuestion(id: string): Promise<TypeDictationQuestion | Object> {
    setLoadingWatch(true);
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    try {
      const { data: dictationQuestionData } = await axios.get<TypeDictationQuestion>(
        `/api/dictation-questions/${id}`, options,
      );
      const transformedNews = {
          ...dictationQuestionData,
          createdAt: moment(dictationQuestionData.createdAt).format('DD.MM.YYYY'),
        }
        setCurrentQuestion(transformedNews);
      return {};
    } catch ({ response }) {
      console.log(response);
      return { error: response };
    } finally {
      setLoadingWatch(false);
    }
  }

  return {
    loadingWatch,
    currentQuestion,
    getCurrentQuestion,
  }
}