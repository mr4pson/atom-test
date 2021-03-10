import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import React, { memo, useEffect, useState } from "react";
import { ReactComponent as ChevronSvg } from '../../../assets/images/admin/chevron.svg';
import styles from './DatePickerElem.module.scss';
moment.locale('ru');

const { RangePicker } = DatePicker;

type Props = {

}

const generateUiniqueId = () => {
    return Math.random().toString(16).slice(2);
}

function DatePickerElem(props: Props): JSX.Element {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [uniqueId] = useState<string>(generateUiniqueId());
    useEffect(() => {
        window.addEventListener('click', function (e: any) {
            if (!document.getElementsByClassName(uniqueId)[0]?.contains(e.target)) {
                console.log(3124124);
                setIsActive(false);
            }
        });
    }, [])

    const changeCalendarVisibility = () => {
        setTimeout(() => {
            setIsActive(!isActive);
        });
    }

    return (
        <div id="atom-date-picker" className={styles['date-picker']}>
            <div className={styles['date-picker__select']} onClick={changeCalendarVisibility}>
                <div className={styles['date-picker__title']}>Период статистики</div>
                <div className={styles['date-picker__chevron']}><ChevronSvg /></div>
            </div>
            <RangePicker 
                locale={locale}
                open={isActive}
                dropdownClassName={uniqueId}
                onChange={changeCalendarVisibility}
                className="atom-date-picker"
            />
        </div>
    );
}

export default memo(DatePickerElem);