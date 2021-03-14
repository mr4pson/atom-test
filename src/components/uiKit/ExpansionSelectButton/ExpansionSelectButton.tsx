import { memo, useState } from "react";
import classNames from 'classnames';
import styles from "./ExpansionSelectButton.module.scss";
import { ReactComponent as ChevronSvg } from '../../../assets/images/admin/chevron.svg';
import { Props } from "./types";

function ExpansionSelectButton(props: Props): JSX.Element {
    const [active, setActive] = useState<boolean>(false);

    const handleHeaderClick = () => {
        setActive(!active);
    }

    const handleOptionClick = (value: any) => {
        handleHeaderClick();
        props.onOptionPick(value);
    }

    return(
        <div className={classNames(styles['expansion-select-button'], {
            [styles['expansion-select-button_active']]: active,
        })}>
            <div
                onClick={handleHeaderClick}
                className={styles['expansion-select-button__header']}
            >
                <div className={styles['expansion-select-button__icon']}>
                    <ChevronSvg />
                </div>
                <div className={styles['expansion-select-button__title']}>{props.children}</div>
            </div>
            <div className={styles['expansion-select-button__body']}>
                {props.options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            handleOptionClick(option.value);
                        }}
                        className={styles['expansion-select-button__option']}
                    >
                        {option.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(ExpansionSelectButton);
