import { TypeAction } from "./TestQuestionsOption/types";

export enum QuestionOptionType {
    CHECKBOX = 'CHECKBOX',
    RADIO = 'RADIO'
}

export type TypeTestQuestionOption = {
    isEditing: boolean;
    title: string;
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
    actions: TypeAction[];
    options: TypeTestQuestionOption[];
}