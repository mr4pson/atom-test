export enum buttonElemType {
    Primary = 'primary',
    Default = 'default',
    Dashed = 'dashed'
}

export type buttonElemProps = {
    type: buttonElemType;
    children: string;
}