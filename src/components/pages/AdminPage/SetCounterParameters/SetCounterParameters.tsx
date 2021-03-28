import { memo, useEffect } from "react";
import styles from "./SetCounterParameters.module.scss";
import classNames from "classnames";
import NumberChanger from "components/uiKit/numberChanger";
import ButtonElem from "components/uiKit/ButtomElem";
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import { Form, notification, DatePicker } from "antd";
import moment from "moment";
import { useUpdateCounterParameters } from "./useUpdateCounterParameters";
import { counterParametersType, StatusType } from "./types";
import Loader from 'components/uiKit/Loader';
import { userType } from "components/common/types";
import { useCheckRole } from "components/hooks/useCheckRole";

// import { loginPage } from 'i18n'

function SetCounterParameters(): JSX.Element {
  const [bannerForm] = Form.useForm();
  const [testForm] = Form.useForm();

  const {
    bannerData,
    testData,
    loading,
    statusType,
    counterName,
    getCounterParameters,
    updateCounterParameters
  } = useUpdateCounterParameters();

  const initialBannerFormState = {
    bannerDate: moment(bannerData)
  };

  const initialTestFormState = {
    testHours: testData?.testHours,
    testMinutes: testData?.testMinutes,
    testSeconds: testData?.testSeconds,
  }

  const testFormItems = [
    {
      name: 'testHours',
      fieldName: 'testHours',
      initialState: initialTestFormState.testHours,
      placeholder: 'Кол-во часов',
      maxValue: 23,
      translation: 'часы',
    },
    {
      name: 'testMinutes',
      fieldName: 'testMinutes',
      initialState: initialTestFormState.testMinutes,
      placeholder: 'Кол-во минут',
      maxValue: 60,
      translation: 'минуты',
    },
    {
      name: 'testSeconds',
      fieldName: 'testSeconds',
      initialState: initialTestFormState.testSeconds,
      placeholder: 'Кол-во секунд',
      maxValue: 60,
      translation: 'секунды',
    },
  ];

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
    await updateCounterParameters(moment(bannerDate)
      .format('YYYY-MM-DD HH:mm:ss'), counterParametersType.BANNER);
  }

  async function onTestSubmit(): Promise<void> {
    const testDate = testForm.getFieldsValue();
    await updateCounterParameters(JSON.stringify(testDate), counterParametersType.TEST);
  }

  useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

  useEffect(() => {
    getCounterParameters(counterParametersType.BANNER);
    getCounterParameters(counterParametersType.TEST);
  }, []);

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
    <>
      {bannerData && testData ? <div className={styles["counter-page"]}>
        {bannerData && <Form
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
        </Form>}
        {testData && <Form
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
        </Form>}
      </div> : <Loader />}
    </>
  );
}

export default memo(SetCounterParameters);
