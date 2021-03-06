import { TypeAction } from "components/uiKit/AdminCollapse/types";

export type TypeFaqQuestion = {
    id?: number;
    title: string;
    body: any;
    data?: any;
    description?: string;
    isEditing: boolean;
    collapseOn?: string;
    actions: TypeAction[];
}