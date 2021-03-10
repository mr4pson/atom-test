export type TypeAction = {
    id: string;
    icon: React.ReactElement;
    callback: (action: TypeAction, config: TypeCollapseConfig, formValues: Object ) => void;
}

export type TypeCollapseConfig = {
    title: string;
    actions: TypeAction[];
    isEditing: boolean;
    collapseOn?: string;
}

export type Props = {
    config: TypeCollapseConfig;
    children: any;
}