import { memo } from "react";
import { Button } from 'antd';
import { buttonElemType, htmlType, Props } from "./types";
import styles from './ButtonElem.module.scss';
import classNames from 'classnames';

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