import { Form, FormInstance, Input } from "antd";
import ButtonElem from "components/uiKit/ButtomElem";
import { buttonElemType, htmlType } from "components/uiKit/ButtomElem/types";
import { memo, useRef, useState, useEffect } from "react";
import styles from "./AddPartnerPage.module.scss";
import Icon from "components/uiKit/Icon";
import { imageAltIcon } from "icons";
import TextRedactor from "components/uiKit/TextRedactor";
import { useLocation } from "react-router-dom";
import { AdminsPage, paths } from "../routes/constants";
import { useHistory, useParams } from "react-router";
import classNames from 'classnames';
import { useUpdatePartner } from "./useUpdatePartner";
import Loader from 'components/uiKit/Loader';
import { useCheckRole } from "components/hooks/useCheckRole";

function AddPartnerPage(): JSX.Element {
  const formRef = useRef<FormInstance>(null);
  const location = useLocation();
  const history = useHistory();
  const [isChoosenFileChecked, setIsChoosenFileChecked] = useState<boolean>(
    false
  );
  const { id } = useParams<{ id: string }>();

  const { loadingUpdate, addPartner, currentPartner, getCurrentPartner, updatePartner } = useUpdatePartner();

  const inititalFormState = {
    title: "",
    link: "",
    uploadFile: null,
    description: "",
  };
  const formFieldsValue = formRef.current?.getFieldsValue();

  async function onSubmit(): Promise<void> {
    if (
      formFieldsValue.title &&
      formFieldsValue.link &&
      formFieldsValue.uploadFile
    ) {
      if (id) {
        await updatePartner({ ...formFieldsValue, visible: true }, id);
      } else {
        await addPartner({ ...formFieldsValue, visible: true });
      }
      setIsChoosenFileChecked(false);
      history.push(paths[AdminsPage.PARTNERS]);
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

  useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

  useEffect(() => {
    if (id) {
      getCurrentPartner(id);
    }
  }, []);

  return (
    <>
      {(id ? currentPartner : true) ? (
        <Form
          className={styles["add-partner-page"]}
          name="basic"
          onFinish={onSubmit}
          ref={formRef}
          initialValues={
            location.pathname === paths[AdminsPage.ADD_PARTNER]
              ? inititalFormState
              : currentPartner!
          }
        >
          <ButtonElem
            type={buttonElemType.Primary}
            htmlType={htmlType.SUBMIT}
            className={styles["add-partner-page__button-add"]}
            loading={loadingUpdate}
            onClick={() => setIsChoosenFileChecked(true)}
          >
            {id ? 'Изменить партнёра' : 'Добавить партнёра'}
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
                name="title"
              >
                <Input
                  className={styles["page-content__input"]}
                  placeholder="Введите название партнёра"
                  type="text"
                  value={currentPartner?.title}
                  disabled={loadingUpdate}
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
                  value={currentPartner?.link}
                  disabled={loadingUpdate}
                />
              </Form.Item>
              <Form.Item className={styles["form-item"]} name="uploadFile">
                <label className={classNames(styles["page-content__upload-file"], {
                  [styles['page-content__upload-file_disabled']]: loadingUpdate
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
                    type="file"
                    id="multi"
                    onChange={uploadMediaFile}
                    disabled={loadingUpdate}
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
                      : currentPartner?.description!
                  }
                  formRef={formRef}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      ) : <Loader className={'admin-loader'} />}
    </>
  );
}

export default memo(AddPartnerPage);
