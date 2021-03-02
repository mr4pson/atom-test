import { memo } from "react";
import { Button } from 'antd';
import { buttonElemType } from "./types";
import styles from './ButtonElem.module.scss';
import classNames from 'classnames';

type Props = {
    type: buttonElemType;
    htmlType?: "button" | "submit" | "reset" | undefined;
    children: string;
}

function ButtonElem(props: Props): JSX.Element {
    const getButtonClassNames = () => {
        const classes = [styles['atom-btn']];
        if (props.type === buttonElemType.Default) {
            classes.push(styles['atom-btn--default']);
        }
        return classNames(...classes);
    }
    return (
        <Button htmlType={props.htmlType || 'button'} className={getButtonClassNames()} type={props.type}>{props.children}</Button>
    );
}

export default memo(ButtonElem);