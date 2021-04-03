import { TypeFaqQuestion } from "../AdminPage/FaqPage/types";
import { counterParametersType } from "../AdminPage/SetCounterParameters/types"

export type TypeQuestion = {
    title: string;
    answer: string;
}

export type CounterParameter = {
    data: string;
    type: counterParametersType;
}

export type TypeUseHomePage = {
    questions: TypeFaqQuestion[];
    counterParameters: CounterParameter | null;
    getFaqQuestions: () => void;
    getCounterParameters: () => void;
};