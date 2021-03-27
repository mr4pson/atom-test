import { TypeAction } from "./TestQuestionsOption/types";

export enum QuestionOptionType {
    CHECKBOX = 'CHECKBOX',
    RADIO = 'RADIO'
}

export type TypeTestQuestionOption = {
    id?: number;
    isEditing: boolean;
    title: string;
    image?: string;
    trueOption: boolean;
    actions: TypeAction[];
}

export type TypeTestQuestion = {
    id?: number;
    title: string;
    data?: any;
    body?: JSX.Element;
    type: QuestionOptionType;
    isEditing: boolean;
    collapseOn?: string;
    image?: string;
    actions: TypeAction[];
    options: TypeTestQuestionOption[];
}