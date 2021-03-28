

import { Form, FormInstance, Input } from "antd";
import { memo, useRef, useState } from "react";
import styles from "./UpdateParticipant.module.scss";
import TextRedactor from "components/uiKit/TextRedactor";
import { useLocation, useHistory } from "react-router-dom";
import { AdminsPage, paths } from "../routes/constants";
import axios from "axios";
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType, htmlType } from "components/uiKit/ButtomElem/types";
import { useCheckRole } from "components/hooks/useCheckRole";

function UpdateParticipant(props: any): JSX.Element {
  const [data, setData] = useState<any | null>(null);
  const formRef = useRef<FormInstance>(null);
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  const [participantForm] = Form.useForm();

  const inititalFormState = {
    name: "",
    city: "",
    number: null,
    description: "",
  };


  function onSubmit(): void {
    const formData = participantForm.getFieldsValue();

    if (
    formData.name &&
    formData.city &&
    formData.number
    ) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        history.push(paths[AdminsPage.PARTICIPANTS]);
      }, 2000);
    }
    console.log(formData);
  };

    // async function getParticipantPageData() {
  //   const response = await axios.get<any>("/mocks/getParticipantPageData.json");
  //   setData(response.data);
  // }

  // useEffect(() => {
  //   getParticipantPageData();
  // }, []);

  useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

  return (
    <>
      {/* {props.creationMode === newsCreationMode.EDIT ? ( */}
        <Form
          className={styles['update-participant-page']}
          form={participantForm}
          name="basic"
          onFinish={onSubmit}
          ref={formRef}
          initialValues={
            location.pathname === paths[AdminsPage.ADD_PARTICIPANT]
              ? inititalFormState
              : data
          }
        >
          <ButtonElem
            type={buttonElemType.Primary}
            htmlType={htmlType.SUBMIT}
            className={styles["update-participant-page__button-add"]}
            loading={loading}
          >
            Добавить участника
          </ButtonElem>
          <div className={styles["page-content"]}>
          <div className={styles["page-content__header"]}>
              <div className={styles["page-content__title"]}>
                Имя участника
              </div>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите имя участника!",
                  },
                ]}
                className={styles["form-item"]}
                name="name"
              >
                <Input
                  className={styles["page-content__input"]}
                  placeholder="Введите имя"
                  type="text"
                  value={data?.name}
                  disabled={loading}
                />
              </Form.Item>
              <div className={styles["page-content__title"]}>
                Город
              </div>
              <Form.Item
                rules={[
                  { required: true, message: "Пожалуйста, введите город !" },
                ]}
                className={styles["form-item"]}
                name="city"
              >
                <Input
                  className={styles["page-content__input"]}
                  placeholder="Город участника"
                  type="text"
                  value={data?.city}
                  disabled={loading}
                />
              </Form.Item>
              <div className={styles["page-content__title"]}>
                Номер
              </div>
              <Form.Item
                rules={[
                  { required: true, message: "Пожалуйста, введите номер участника !" },
                ]}
                className={styles["form-item"]}
                name="number"
              >
                <Input
                    className={styles["page-content__input"]}
                    placeholder="Номер участника"
                    type="text"
                    value={data?.number}
                    disabled={loading}
                  />
              </Form.Item>
            </div>
            <div className={styles["page-content-description"]}>
              <div className={styles["page-content__title"]}>
                Описание участника (если нужно)
              </div>
              <Form.Item className={styles["form-item"]} name="description">
                <TextRedactor
                  initialValue={
                    location.pathname === paths[AdminsPage.ADD_PARTICIPANT]
                      ? inititalFormState.description
                      : data.description
                  }
                  formRef={formRef}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      {/* ) : <div className={styles["spin-wrapper"]}>
      <Spin size={"large"} />
    </div>} */}
    </>
  );
}

export default memo(UpdateParticipant);
