import { TypeAction } from "../TestQuestionsPage/TestQuestionsOption/types";

export type TypeMenu = {
    id?: number;
    title: string;
    body: string;
    data?: any;
    actions: TypeAction[];
}