import { TypeAction } from "components/uiKit/AdminCollapse/types";

export type TypeFaqQuestion = {
    id?: number;
    title: string;
    data?: any;
    body: JSX.Element;
    isEditing: boolean;
    collapseOn?: string;
    actions: TypeAction[];
}