import { Form, FormInstance, Input, Select } from "antd";
import ButtonElem from "components/uiKit/ButtomElem";
import { buttonElemType, htmlType } from "components/uiKit/ButtomElem/types";
import { memo, useRef, useState, useEffect } from "react";
import styles from "./CreateNews.module.scss";
import Icon from "components/uiKit/Icon";
import classNames from "classnames";
import { fileBlankIcon, imageAltIcon } from "icons";
import { statuses } from "./constants";
import TextRedactor from "components/uiKit/TextRedactor";
import axios from "axios";
import { TypeCreateNewsPageData } from "./types";
import { useLocation, useHistory } from "react-router-dom";
import { AdminsPage, paths } from "../routes/constants";

function CreateNews(): JSX.Element {
  const [data, setData] = useState<TypeCreateNewsPageData | null>(null);
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [isChoosenFileChecked, setIsChoosenFileChecked] = useState<boolean>(
    false
  );

  const inititalFormState = {
    article: "",
    status: "drafts",
    description: "",
    uploadFile: null,
  };

  const { Option } = Select;

  const formRef = useRef<FormInstance>(null);

  function handleSave(): void {
    const formFieldsValue = formRef.current?.getFieldsValue();

    if (formFieldsValue.article && formFieldsValue.uploadFile) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsChoosenFileChecked(false);
        history.push(paths[AdminsPage.NEWS]);
      }, 2000);
      console.log(formRef.current?.getFieldsValue());
    }
    console.log(formRef.current?.getFieldsValue());
  }

  function onSubmit(): void {
    // console.log('Success:', values);
    const formFieldsValue = formRef.current?.getFieldsValue();

    if (formFieldsValue.article && formFieldsValue.uploadFile) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsChoosenFileChecked(false);
        history.push(paths[AdminsPage.NEWS]);
      }, 2000);
      console.log(formRef.current?.getFieldsValue());
    }
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

  async function getCreateNewsPageData() {
    const response = await axios.get<TypeCreateNewsPageData>(
      "/mocks/getCreateNewsPageData.json"
    );

    setData(response.data);
  }

  useEffect(() => {
    getCreateNewsPageData();
  }, []);

  return (
    <>
      {data && (
        <Form
          className={styles["create-news-page"]}
          name="basic"
          onFinish={onSubmit}
          ref={formRef}
          initialValues={
            location.pathname === paths[AdminsPage.NEWS_CREATE]
              ? inititalFormState
              : data
          }
        >
          <div className={styles["main-data"]}>
            <div className={styles["main-data-header"]}>
              <div className={styles["create-news-page__title"]}>Заголовок</div>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите название статьи !",
                  },
                ]}
                className={styles["form-item"]}
                name="article"
              >
                <Input
                  className={styles["main-data-header__input"]}
                  placeholder="Введите название статьи"
                  type="search"
                  value={data?.article}
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item className={styles["form-item"]} name="uploadFile">
                <label className={classNames(styles["main-data-header__upload-file"], {
                  [styles["main-data-header__upload-file_disabled"]]: loading
                })}>
                  <Icon
                    className={styles["main-data-header__button-icon"]}
                    path={imageAltIcon.path}
                    viewBox={imageAltIcon.viewBox}
                    title="AtomTest"
                  />
                  Добавить медиафайл
                  <Input
                    className={styles["main-data-header__file-input"]}
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
                  <span className={styles["choose-file"]}>Пожалйуста, выберите файл!</span>
                )}
            </div>
            <div className={styles["main-data-description"]}>
              <div className={styles["create-news-page__title"]}>
                Описание новости
              </div>
              <Form.Item className={styles["form-item"]} name="description">
                <TextRedactor
                  initialValue={
                    location.pathname === paths[AdminsPage.NEWS_CREATE]
                      ? inititalFormState.description
                      : data.description
                  }
                  formRef={formRef}
                />
              </Form.Item>
            </div>
          </div>
          <div className={styles["publication"]}>
            <div className={styles["create-news-page__title"]}>Публикация</div>
            <div className={styles["publication-status"]}>
              <Icon
                className={styles["publication-status__icon"]}
                path={fileBlankIcon.path}
                viewBox={fileBlankIcon.viewBox}
                title="AtomTest"
              />
              <div className={styles["publication-status__title"]}>Статус:</div>
              <Form.Item className={styles["form-item"]} name="status">
                <Select
                  className={classNames(
                    "publication-status__select",
                    styles["publication-status__select"]
                  )}
                  disabled={loading}
                >
                  {statuses.map((item) => (
                    <Option key={item?.value} value={item?.value}>
                      {item?.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className={styles["publication-footer"]}>
              <ButtonElem
                type={buttonElemType.Default}
                htmlType="button"
                className={styles["publication-footer__button-save"]}
                onClick={handleSave}
                loading={loading}
              >
                Сохранить
              </ButtonElem>
              <ButtonElem
                type={buttonElemType.Primary}
                htmlType={htmlType.SUBMIT}
                className={styles["publication-footer__button-publish"]}
                onClick={() => setIsChoosenFileChecked(true)}
                loading={loading}
              >
                Опубликовать
              </ButtonElem>
            </div>
          </div>
        </Form>
      )}
    </>
  );
}

export default memo(CreateNews);
