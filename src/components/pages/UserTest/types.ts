export enum QuestionType {
    SINGLE = 'SINGLE',
    MULTIPLE = 'MULTIPLE',
    SENGLE_PICTURE = 'SENGLE_PICTURE',
    MULTIPLE_PICTURE = 'MULTIPLE_PICTURE'
}

export type TypeUserTestQuestion = {
    _id: string;
    title: string;
    image?: string;
    type: QuestionType;
    options: TypeUserTestOption[];
}
export type TypeUserTestOption = {
    _id: string;
    title: string;
    image: string;
}

export type UserTestProps = {
    answers: Object;
    setStateAnswersToState: (arg) => void;
    setStateIsTimerFinishedToState: (arg) => void;
}