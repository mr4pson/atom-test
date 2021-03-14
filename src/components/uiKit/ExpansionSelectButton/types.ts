export type TypeExpansionOption = {
    title: string;
    value: any;
}

export type Props = {
    children: React.ReactNode;
    options: TypeExpansionOption[];
    onOptionPick: (value: any) => void;
}