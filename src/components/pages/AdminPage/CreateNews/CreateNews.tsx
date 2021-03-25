import { Form, FormInstance, Input, Select, Spin } from "antd";
import ButtonElem from "components/uiKit/ButtomElem";
import { buttonElemType, htmlType } from "components/uiKit/ButtomElem/types";
import { memo, useRef, useState, useEffect } from "react";
import styles from "./CreateNews.module.scss";
import Icon from "components/uiKit/Icon";
import classNames from "classnames";
import { fileBlankIcon, imageAltIcon } from "icons";
import { statuses } from "./constants";
import TextRedactor from "components/uiKit/TextRedactor";
import { useLocation, useHistory } from "react-router-dom";
import { AdminsPage, paths } from "../routes/constants";
import { useCreateNews } from "./useUpdateNews";
import { connect } from "react-redux";
import { newsCreationMode } from "../NewsPage/types";
import { setCurrentIdToState } from "redux/reducers/News.reducer";

function CreateNews(props: any): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const [isChoosenFileChecked, setIsChoosenFileChecked] = useState<boolean>(
    false
  );
  const { loading, createNews, currentNews, getCurrentNews, updateNews } = useCreateNews();
  
  const inititalFormState = {
    name: "",
    heading: "",
    status: "drafts",
    description: "",
    uploadFile: null,
  };

  const { Option } = Select;

  const formRef = useRef<FormInstance>(null);

  async function handleSave(): Promise<void> {
    const formFieldsValue = formRef.current?.getFieldsValue();

    if (formFieldsValue.name && formFieldsValue.uploadFile && formFieldsValue.heading) {
        setIsChoosenFileChecked(false);
        await updateNews({ ...formFieldsValue }, props.currentId)
        history.push(paths[AdminsPage.NEWS]);
        console.log(formRef.current?.getFieldsValue());
    }
    console.log(formRef.current?.getFieldsValue());
  }

  async function onSubmit(): Promise<void> {
    const formFieldsValue = formRef.current?.getFieldsValue();

    if (formFieldsValue.name && formFieldsValue.uploadFile && formFieldsValue.heading) {
      if (props.creationMode === newsCreationMode.CREATE) {
        await createNews({ ...formFieldsValue });
      } else {
        await updateNews({ ...formFieldsValue }, props.currentId);
      }
      setIsChoosenFileChecked(false);
      history.push(paths[AdminsPage.NEWS]);
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

  useEffect(() => {
    if (props.creationMode === newsCreationMode.EDIT) {
      getCurrentNews(props.currentId);
    }
    return () => {
      props.setCurrentIdToState(null);
    }
  }, []);

  return (
    <>
      {(props.creationMode === newsCreationMode.EDIT ? currentNews : true) ? (
        <Form
          className={styles["create-news-page"]}
          name="basic"
          onFinish={onSubmit}
          ref={formRef}
          initialValues={
            location.pathname === paths[AdminsPage.NEWS_CREATE] && props.creationMode === newsCreationMode.CREATE
              ? inititalFormState
              : currentNews!
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
                name="name"
              >
                <Input
                  className={styles["main-data-header__input"]}
                  placeholder="Введите название статьи"
                  type="search"
                  value={currentNews?.name}
                  disabled={loading}
                />
              </Form.Item>
              <div className={styles["create-news-page__title"]}>Рубрика</div>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите название рубрики !",
                  },
                ]}
                className={styles["form-item"]}
                name="heading"
              >
                <Input
                  className={styles["main-data-header__input"]}
                  placeholder="Введите название рубрики"
                  type="search"
                  value={currentNews?.heading}
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
                      : currentNews?.description!
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
      ) : <div className={styles["spin-wrapper"]}>
      <Spin size={"large"} />
    </div>}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
      currentId: state.news?.currentId,
      creationMode: state.news?.creationMode
  }
}

export default connect(mapStateToProps, { setCurrentIdToState })(memo(CreateNews));