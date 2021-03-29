import { DatePicker, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import locale from "antd/es/date-picker/locale/ru_RU";
import { generateUiniqueId } from "components/common/commonHelper";
import moment from "moment";
import "moment/locale/ru";
import React, { memo, useEffect, useState } from "react";
import { ReactComponent as ChevronSvg } from "../../../assets/images/admin/chevron.svg";
import styles from "./DatePickerElem.module.scss";
moment.locale("ru");

const { RangePicker } = DatePicker;

type Props = {
	placeholder: string;
  initialValue?: { dateFrom: string, dateTo: string },
  onChange: (data) => void,
};

function DatePickerElem(props: Props): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [uniqueId] = useState<string>(generateUiniqueId());
	const [currentDate, setCurrentDate] = useState<any>(null);

  const changeCalendarVisibility = (value) => {
    props.onChange(value);
    setTimeout(() => {
      setIsActive(!isActive);
    });
		setCurrentDate(
			[moment(value[0]).format(('DD.MM.YY')), moment(value[1]).format(('DD.MM.YY'))]);
  };

  useEffect(() => {
    window.addEventListener("click", function (e: any) {
      if (!document.getElementsByClassName(uniqueId)[0]?.contains(e.target)) {
        setIsActive(false);
      }
    });
    setCurrentDate(
			[props.initialValue?.dateFrom, props.initialValue?.dateTo]);
  }, []);

  return (
    <div id="atom-date-picker" className={styles["date-picker"]}>
      <div
        className={styles["date-picker__select"]}
        onClick={changeCalendarVisibility}
      >
        <>
          <div className={styles["date-picker__title"]}>{
            currentDate ? `${currentDate[0]} - ${currentDate[1]}` : props.placeholder
          }</div>
          <div className={styles["date-picker__chevron"]}>
            <ChevronSvg />
          </div>
        </>
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
