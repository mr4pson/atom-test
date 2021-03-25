import { memo, useEffect } from "react";
import styles from "./SetCounterParameters.module.scss";
import classNames from "classnames";
import NumberChanger from "components/uiKit/numberChanger";
import ButtonElem from "components/uiKit/ButtomElem";
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import {
  initialBannerFormState,
  initialTestFormState,
  testFormItems,
} from "./constants";
import { Form, notification, DatePicker } from "antd";
import moment from "moment";
import { useUpdateCounterParameters } from "./useUpdateCounterParameters";
import { counterParametersType, StatusType } from "./types";

// import { loginPage } from 'i18n'

function SetCounterParameters(): JSX.Element {
  const [bannerForm] = Form.useForm();
  const [testForm] = Form.useForm();

  const { loading, statusType, counterName, updateCounterParameters } = useUpdateCounterParameters();

  const close = () => {
    console.log(
      "Notification was closed. Either the close button was clicked or duration time elapsed."
    );
  };

  const openNotification = (counterName: string, type: string) => {
    const key = `open${Date.now()}`;
    notification[type]({
      message: `Счетчик ${counterName} успешно опубликован!`,
      key,
      onClose: close,
    });
  };

  async function onSubmit(): Promise<void> {
    const bannerDate = bannerForm.getFieldValue('bannerDate');
    bannerForm.resetFields();
    await updateCounterParameters(moment(bannerDate)
      .format('YYYY-MM-DD HH:mm:ss'), counterParametersType.BANNER);
  }

  async function onTestSubmit(): Promise<void> {
    const testDate = testForm.getFieldsValue();
    testForm.resetFields();
    await updateCounterParameters(JSON.stringify(testDate), counterParametersType.TEST);
  }

  useEffect(() => {
    if (statusType === StatusType.ERROR || statusType === StatusType.SUCCESS) {
      openNotification(
        counterName === counterParametersType.BANNER
          ? 'баннера' : 'теста',
          statusType!
      );
    }
  }, [statusType, counterName])

  return (
    <div className={styles["counter-page"]}>
      <Form
        form={bannerForm}
        name="basic"
        initialValues={initialBannerFormState}
        onFinish={onSubmit}
        className={styles["banner-counter"]}
      >
        <div className={styles["counter-page__title"]}>Счетчик банера</div>
        <div className={styles["counter-page__description"]}>
          Здесь должно находиться описание счетчика баннера.
        </div>
        <div className={styles["banner-counter__tools"]}>
          <Form.Item
            name="bannerDate"
            className={styles["counter-page__form-item"]}
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите дату баннера !",
              },
            ]}
          >
            <DatePicker
              className={classNames(
                styles["test-counter__input"],
                styles["test-counter__tool"],
              )} 
              placeholder="Счетчик баннера" 
              showTime
            />
          </Form.Item>
          <ButtonElem
            className={styles["counter-page__button"]}
            type={buttonElemType.Primary}
            htmlType="submit"
            loading={loading}
          >
            Опубликовать
          </ButtonElem>
        </div>
      </Form>
      <Form
        form={testForm}
        name="basic"
        initialValues={initialTestFormState}
        onFinish={onTestSubmit}
        className={styles["test-counter"]}
      >
        <div className={styles["counter-page__title"]}>Счетчик Теста</div>
        <div className={styles["counter-page__description"]}>
          Здесь должно находиться описание счетчика теста.
        </div>
        <div className={styles["test-counter__tools"]}>
          {testFormItems.map((formItem) => (
            <Form.Item
              key={formItem.name}
              name={formItem.name}
              className={styles["counter-page__form-item"]}
              rules={[
                {
                  required: true,
                  message: `Введите ${formItem.translation} теста !`,
                },
              ]}
            >
              <NumberChanger
                className={classNames(
                  styles["test-counter__input"],
                  styles["test-counter__tool"]
                )}
                form={testForm}
                fieldName={formItem.fieldName}
                initialState={formItem.initialState}
                placeholder={formItem.placeholder}
                maxValue={formItem.maxValue}
              />
            </Form.Item>
          ))}
          <ButtonElem
            className={styles["counter-page__button"]}
            type={buttonElemType.Primary}
            htmlType="submit"
            loading={loading}
          >
            Опубликовать
          </ButtonElem>
        </div>
      </Form>
    </div>
  );
}

export default memo(SetCounterParameters);
