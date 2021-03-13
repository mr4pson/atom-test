import { TypeAction } from "components/uiKit/AdminCollapse/types";

export type TypeFaqQuestion = {
    id?: number;
    title: string;
    body: string;
    data?: any;
    isEditing: boolean;
    collapseOn?: string;
    actions: TypeAction[];
}