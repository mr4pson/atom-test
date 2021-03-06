import { memo } from "react";
import { Input } from "antd";
import styles from './NumberChanger.module.scss';
import Icon from 'components/uiKit/Icon';
import { arrowDownIcon, arrowUpIcon } from 'icons';
import { regLimitNumber } from "components/common/constants";
import { useNumberChanger } from "./useNumberChanger";

type Props = {
  className: string;
  form: any;
  fieldName: string;
  initialState: number | undefined;
  placeholder: string;
  maxValue: number;
}

function NumberChanger(props: Props): JSX.Element {

  const NUMBER_CHANGER_MAX_LENGTH = 8;
  const MIN_VALUE = 0;

  const { state, setState } = useNumberChanger(props.form, props.fieldName, props.initialState);

  const renderSetterCounter = (): JSX.Element => {
    return (
      <div className={styles['setter']}>
        <Icon
          className={styles["setter__icon"]}
          path={arrowUpIcon.path}
          viewBox={arrowUpIcon.viewBox}
          title="AtomTest"
          onClick={handleIncreaseValue}
        />
        <Icon
          className={styles["setter__icon"]}
          path={arrowDownIcon.path}
          viewBox={arrowDownIcon.viewBox}
          title="AtomTest"
          onClick={handleDecreaseValue}
        />
      </div>
    )
  }

  function handleIncreaseValue(): void {
    setState((prevState) => {
      if (prevState && +prevState >= props.maxValue) {
        return props.maxValue;
      } else if (prevState && +prevState < props.maxValue) {
        return +prevState + 1;
      }
      return MIN_VALUE + 1;
    })
  }

  function handleDecreaseValue(): void {
    setState((prevState) => {
      if (prevState && +prevState <= MIN_VALUE) {
        return MIN_VALUE;
      } else if (prevState && +prevState > MIN_VALUE) {
        return +prevState - 1;
      }
      return MIN_VALUE;
    })
  }
  
  function handleValueChange(event): void {
    if (regLimitNumber.test(event.target.value) && typeof +event.target.value === "number") {
      setState(
        event.target.value > MIN_VALUE && event.target.value < props.maxValue ? +event.target.value
        : event.target.value <= MIN_VALUE ? MIN_VALUE 
        : event.target.value >= props.maxValue ? props.maxValue
        : MIN_VALUE);
    } else {
      setState(0);
    }
  }

  return (
    <>
      <Input
        className={props.className}
        suffix={renderSetterCounter()}
        value={state}
        onChange={handleValueChange}
        maxLength={NUMBER_CHANGER_MAX_LENGTH}
        placeholder={props.placeholder}
      />
    </>
  );
}

export default memo(NumberChanger);