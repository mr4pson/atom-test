import { memo, useRef } from "react";
import styles from "./SetCounterParameters.module.scss";
import { Form, Button, FormInstance } from "antd";
import { Page, paths } from "routes/constants";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import classNames from "classnames";
import NumberChanger from "components/uiKit/numberChanger";
// import { loginPage } from 'i18n'

function SetCounterParameters(): JSX.Element {
  const inititalFormState = {
    bannerDays: undefined,
    bannerHours: undefined,
    bannerMinutes: undefined,
    bannerSeconds: undefined,
  };

  const initialTestFormState = {
    testHours: undefined,
    testMinutes: undefined,
    testSeconds: undefined,
  }

  const formRef = useRef<FormInstance>(null);
  const formTestRef = useRef<FormInstance>(null);

  let history = useHistory();
  const [form] = Form.useForm();

  function onSubmit(values: any): void {
    // console.log('Success:', values);
    console.log(formRef.current?.getFieldsValue());
    form.resetFields();
  }

  function onTestSubmit(values: any): void {
    console.log(formTestRef.current?.getFieldsValue());
    form.resetFields();
  }

  return (
    <div className={styles["counter-page"]}>
      <Form
        form={form}
        name="basic"
        initialValues={inititalFormState}
        onFinish={onSubmit}
        className={styles["banner-counter"]}
        ref={formRef}
      >
        <div className={styles["counter-page__title"]}>Счетчик банера</div>
        <div className={styles["banner-counter__tools"]}>
          <Form.Item
            name="bannerDays"
            className={styles["counter-page__form-item"]}
          >
            <NumberChanger
              className={classNames(
                styles["banner-counter__input"],
                styles["banner-counter__tool"]
              )}
              formRef={formRef}
              fieldName={"bannerDays"}
              initialState={inititalFormState.bannerDays}
              placeholder="Кол-во дней"
            />
          </Form.Item>
          <Form.Item
            name="bannerHours"
            className={styles["counter-page__form-item"]}
          >
            <NumberChanger
              className={classNames(
                styles["banner-counter__input"],
                styles["banner-counter__tool"]
              )}
              formRef={formRef}
              fieldName={"bannerHours"}
              initialState={inititalFormState.bannerHours}
              placeholder="Кол-во часов"
            />
          </Form.Item>
          <Form.Item
            name="bannerMinutes"
            className={styles["counter-page__form-item"]}
          >
            <NumberChanger
              className={classNames(
                styles["banner-counter__input"],
                styles["banner-counter__tool"]
              )}
              formRef={formRef}
              fieldName={"bannerMinutes"}
              initialState={inititalFormState.bannerMinutes}
              placeholder="Кол-во минут"
            />
          </Form.Item>
          <Form.Item
            name="bannerSeconds"
            className={styles["counter-page__form-item"]}
          >
            <NumberChanger
              className={classNames(
                styles["banner-counter__input"],
                styles["banner-counter__tool"]
              )}
              formRef={formRef}
              fieldName={"bannerSeconds"}
              initialState={inititalFormState.bannerSeconds}
              placeholder="Кол-во секунд"
            />
          </Form.Item>
          <Button
            className={styles["counter-page__button"]}
            type="primary"
            htmlType="submit"
          >
            Опубликовать
          </Button>
        </div>
      </Form>
      <Form
        form={form}
        name="basic"
        initialValues={initialTestFormState}
        onFinish={onTestSubmit}
        className={styles["test-counter"]}
        ref={formTestRef}
      >
        <div className={styles["counter-page__title"]}>Счетчик Теста</div>
        <div className={styles["test-counter__tools"]}>
          <Form.Item
            name="testHours"
            className={styles["counter-page__form-item"]}
          >
            <NumberChanger
              className={classNames(
                styles["test-counter__input"],
                styles["test-counter__tool"]
              )}
              formRef={formTestRef}
              fieldName={"testHours"}
              initialState={initialTestFormState.testHours}
              placeholder="Кол-во дней"
            />
          </Form.Item>
          <Form.Item
            name="testMinutes"
            className={styles["counter-page__form-item"]}
          >
            <NumberChanger
              className={classNames(
                styles["test-counter__input"],
                styles["test-counter__tool"]
              )}
              formRef={formTestRef}
              fieldName={"testMinutes"}
              initialState={initialTestFormState.testMinutes}
              placeholder="Кол-во дней"
            />
          </Form.Item>
          <Button
            className={styles["counter-page__button"]}
            type="primary"
            htmlType="submit"
          >
            Опубликовать
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default memo(SetCounterParameters);
