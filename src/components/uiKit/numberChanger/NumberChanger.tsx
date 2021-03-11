import { memo, useState } from "react";
import { Input } from "antd";
import styles from './NumberChanger.module.scss';
import Icon from 'components/uiKit/Icon';
import { arrowDownIcon, arrowUpIcon } from 'icons';
import { regLimitNumber } from "components/common/constants";
import { useNumberChanger } from "./useNumberChanger";

type Props = {
  className: string;
  formRef: any;
  fieldName: string;
  initialState: number | undefined;
  placeholder: string;
}

function NumberChanger(props: Props): JSX.Element {

  const NUMBER_CHANGER_MAX_LENGTH = 8;

  const { state, setState } = useNumberChanger(props.formRef, props.fieldName, props.initialState);

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
    setState((prevState) => +(prevState ? prevState : 0)  + 1)
  }

  function handleDecreaseValue(): void {
    setState((prevState) => +(prevState ? prevState : 0) - 1)

  }
  
  function handleValueChange(event): void {
    if (regLimitNumber.test(event.target.value)) {
      setState(event.target.value);
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