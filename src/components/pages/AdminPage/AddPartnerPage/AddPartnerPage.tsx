import { Form, FormInstance, Input } from "antd";
import ButtonElem from "components/uiKit/ButtomElem";
import { buttonElemType, htmlType } from "components/uiKit/ButtomElem/types";
import { memo, useRef, useState, useEffect } from "react";
import styles from "./AddPartnerPage.module.scss";
import Icon from "components/uiKit/Icon";
import { imageAltIcon } from "icons";
// import { statuses } from './constants';
import TextRedactor from "components/uiKit/TextRedactor";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AdminsPage, paths } from "../routes/constants";
import { useHistory } from "react-router";
import classNames from 'classnames';
// import { TypeCreateNewsPageData } from './types';

function AddPartnerPage(): JSX.Element {
  const [data, setData] = useState<any | null>(null);
  const formRef = useRef<FormInstance>(null);
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [isChoosenFileChecked, setIsChoosenFileChecked] = useState<boolean>(
    false
  );

  const inititalFormState = {
    name: "",
    link: "",
    uploadFile: null,
    description: "",
  };

  function onSubmit(): void {
    // console.log('Success:', values);
    const formFieldsValue = formRef.current?.getFieldsValue();

    if (
      formFieldsValue.name &&
      formFieldsValue.link &&
      formFieldsValue.uploadFile
    ) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        history.push(paths[AdminsPage.PARTNERS]);
        setIsChoosenFileChecked(false);
      }, 2000);
    }
    console.log(formRef.current?.getFieldsValue());
  }

  function uploadMediaFile(e): void {
    console.log(formRef.current?.getFieldsValue());
    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach((file: any, i: any) => {
      formData.append(i, file);
    });

    formRef.current?.setFieldsValue({
      uploadFile: formData,
    });
    setIsChoosenFileChecked(false);
  }

  async function getPartnerPageData() {
    const response = await axios.get<any>("/mocks/getPartnerPageData.json");
    setData(response.data);
  }

  useEffect(() => {
    getPartnerPageData();
  }, []);

  console.log(!formRef.current?.getFieldsValue().uploadFile, isChoosenFileChecked)

  return (
    <>
      {data && (
        <Form
          className={styles["add-partner-page"]}
          name="basic"
          onFinish={onSubmit}
          ref={formRef}
          initialValues={
            location.pathname === paths[AdminsPage.ADD_PARTNER]
              ? inititalFormState
              : data
          }
        >
          <ButtonElem
            type={buttonElemType.Primary}
            htmlType={htmlType.SUBMIT}
            className={styles["add-partner-page__button-add"]}
            loading={loading}
            onClick={() => setIsChoosenFileChecked(true)}
          >
            Добавить партнёра
          </ButtonElem>
          <div className={styles["page-content"]}>
            <div className={styles["page-content__header"]}>
              <div className={styles["page-content__title"]}>
                Наименование партнёра
              </div>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите наименование !",
                  },
                ]}
                className={styles["form-item"]}
                name="name"
              >
                <Input
                  className={styles["page-content__input"]}
                  placeholder="Введите название партнёра"
                  type="text"
                  value={data?.article}
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Пожалуйста, введите ссылку !" },
                ]}
                className={styles["form-item"]}
                name="link"
              >
                <Input
                  className={styles["page-content__input"]}
                  placeholder="Ссылка на партнёра"
                  type="url"
                  value={data?.article}
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item className={styles["form-item"]} name="uploadFile">
                <label className={classNames(styles["page-content__upload-file"], {
                  [styles['page-content__upload-file_disabled']]: loading
                })}>
                  <Icon
                    className={styles["page-content__button-icon"]}
                    path={imageAltIcon.path}
                    viewBox={imageAltIcon.viewBox}
                    title="AtomTest"
                  />
                  Добавить медиафайл
                  <Input
                    className={styles["page-content__file-input"]}
                    name="Загрузить фото"
                    type="file"
                    id="multi"
                    onChange={uploadMediaFile}
                    disabled={loading}
                  />
                </label>
              </Form.Item>
              {!formRef.current?.getFieldsValue().uploadFile &&
                isChoosenFileChecked && (
                  <span className={styles["choose-file"]}>
                    Пожалйуста, выберите файл!
                  </span>
                )}
            </div>
            <div className={styles["page-content-description"]}>
              <div className={styles["page-content__title"]}>
                Описание партнёра (если нужно)
              </div>
              <Form.Item className={styles["form-item"]} name="description">
                <TextRedactor
                  initialValue={
                    location.pathname === paths[AdminsPage.ADD_PARTNER]
                      ? inititalFormState.description
                      : data.description
                  }
                  formRef={formRef}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      )}
    </>
  );
}

export default memo(AddPartnerPage);
