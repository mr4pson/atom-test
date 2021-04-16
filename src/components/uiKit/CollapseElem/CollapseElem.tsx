import { memo, useState } from "react";
import styles from './CollapseElem.module.scss';
import classNames from 'classnames';
import { ReactComponent as CollapseBtn } from './../../../assets/images/home-page/collapse-btn.svg';

type Props = {
    title: string;
    children: string;
}

function CollapseElem(props: Props): JSX.Element {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const getCollapseElemClassNames = () => {
        const classes = [styles['collapse-elem']];
        if (collapsed) {
            classes.push(styles['collapse-elem--collapsed']);
        }
        return classNames(...classes);
    }

    const changeButtonCollapse = () => {
        setCollapsed(!collapsed);
    }

    return (
        <div className={getCollapseElemClassNames()}>
            <div className={styles['collapse-elem__body']}>
                <div className={styles['collapse-elem__title']}>{props.title}</div>
                <button className={styles['collapse-elem__btn']} onClick={changeButtonCollapse}><CollapseBtn/></button>
            </div>
            <div className={styles['collapse-elem__content']}>{props.children}</div>
        </div>
    );
}

export default memo(CollapseElem);