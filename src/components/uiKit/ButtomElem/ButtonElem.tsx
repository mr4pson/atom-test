import { Button } from 'antd';
import classNames from 'classnames';
import { memo } from "react";
import styles from './ButtonElem.module.scss';
import { buttonElemType, htmlType } from "./types";

type Props = {
    type?: buttonElemType;
    disabled?: boolean;
    htmlType?: "button" | "submit" | "reset" | undefined;
    children: string;
    className?: string;
    loading?: boolean;
    icon?: any;
    onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}

function ButtonElem(props: Props): JSX.Element {
    const getButtonClassNames = () => {
        const classes = [styles['atom-btn']];
        if (props.type === buttonElemType.Default) {
            classes.push(styles['atom-btn--default']);
        }
        if (props.className) {
            classes.push(props.className);
        }
        return classNames(...classes);
    }
    return (
        <Button
            icon={props.icon}
            disabled={props.disabled}
            htmlType={props.htmlType || htmlType.SUBMIT}
            className={getButtonClassNames()}
            type={props.type}
            loading={props.loading}
            onClick={props.onClick}
        >{props.children}</Button>
    );
}

export default memo(ButtonElem);