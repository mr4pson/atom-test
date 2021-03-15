import { memo } from "react";
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

// import { loginPage } from 'i18n'

function SetCounterParameters(): JSX.Element {
  const [bannerForm] = Form.useForm();
  const [testForm] = Form.useForm();

  const close = () => {
    console.log(
      "Notification was closed. Either the close button was clicked or duration time elapsed."
    );
  };

  const openNotification = (counterName: string) => {
    const key = `open${Date.now()}`;

    notification.open({
      message: `Счетчик ${counterName} успешно опубликован`,
      // description:
      //   'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      key,
      onClose: close,
    });
  };

  function onSubmit(values: any): void {
    // console.log('Success:', values);
    console.log(bannerForm.getFieldValue('bannerDate'));
    const bannerDate = bannerForm.getFieldValue('bannerDate');
    console.log(moment(bannerDate).format('YYYY-MM-DD HH:mm:ss'))
    bannerForm.resetFields();
    openNotification("баннера");
  }

  function onTestSubmit(values: any): void {
    console.log(testForm.getFieldsValue());
    testForm.resetFields();
    openNotification("теста");
  }

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
          >
            Опубликовать
          </ButtonElem>
        </div>
      </Form>
    </div>
  );
}

export default memo(SetCounterParameters);
