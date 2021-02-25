import { memo } from "react";
import { Button } from 'antd';
import { buttonElemProps, buttonElemType } from "./types";
import styles from './ButtonElem.module.scss';
import classNames from 'classnames';

function ButtonElem(props: buttonElemProps): JSX.Element {
    const getButtonClassNames = () => {
        const classes = [styles['atom-btn']];
        if (props.type === buttonElemType.Default) {
            classes.push(styles['atom-btn--default']);
        }
        return classNames(...classes);
    }
    return (
        <Button className={getButtonClassNames()} type={props.type}>{props.children}</Button>
    );
}

export default memo(ButtonElem);