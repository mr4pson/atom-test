export type TypeAction = {
    id: string;
    icon: React.ReactElement;
    callback: (action: TypeAction, config: any, formValues: Object) => void;
}