export enum buttonElemType {
    Primary = 'primary',
    Default = 'default',
    Dashed = 'dashed'
}

export enum htmlType {
    BUTTON = 'button',
    SUBMIT = 'submit',
    RESET = 'reset'
}

export type Props = {
    type?: buttonElemType;
    disabled?: boolean;
    htmlType?: "button" | "submit" | "reset" | undefined;
    children: string;
    className?: string;
}