import { TypeTestQuestionOption } from "components/pages/AdminPage/TestQuestionsPage/types"

export type TypeAction = {
    id: string;
    icon: React.ReactElement;
    callback: (action: TypeAction, config: TypeCollapseConfig, formValues: Object ) => void;
}

export type TypeCollapseConfig = {
    id?: number;
    title: string;
    data?: any;
    actions: TypeAction[];
    body?: any;
    description?: string;
    isEditing?: boolean;
    collapseOn?: string;
    options?: TypeTestQuestionOption[];
}