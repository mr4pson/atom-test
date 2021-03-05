export enum QuestionType {
    SINGLE = 'SINGLE',
    MULTIPLE = 'MULTIPLE',
    SENGLE_PICTURE = 'SENGLE_PICTURE',
    MULTIPLE_PICTURE = 'MULTIPLE_PICTURE'
}

export type TypeUserTestQuestion = {
    id: number;
    title: string;
    image?: string;
    type: QuestionType;
    options: TypeUserTestOption[];
}
export type TypeUserTestOption = {
    title: string;
    value: number;
}

export type UserTestProps = {
    answers: Object;
    setStateAnswersToState: (arg) => void;
}