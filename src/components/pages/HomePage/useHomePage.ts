import axios from "axios";
import { useState } from "react";
import { TypeFaqQuestion } from "../AdminPage/FaqPage/types";
import { counterParametersType } from "../AdminPage/SetCounterParameters/types";
import { CounterParameter, TypeUseHomePage } from "./types";

export function useHomePage(): TypeUseHomePage {
  const [questions, setQuestions] = useState<TypeFaqQuestion[]>([]);
  const [counterParameters, setCounterParameters] = useState<CounterParameter | null>(null);

  const getFaqQuestions = async () => {
    const questionsResponse = await axios.get<TypeFaqQuestion[]>('/api/faqs');
    setQuestions(questionsResponse.data);
  }

  const getCounterParameters = async () => {
    const counterParameterResponse = await axios.get<CounterParameter>('/api/counter-parameters/' + counterParametersType.BANNER);
    setCounterParameters(counterParameterResponse.data);
  }

  return {
    questions,
    counterParameters,
    getFaqQuestions,
    getCounterParameters
  }
}