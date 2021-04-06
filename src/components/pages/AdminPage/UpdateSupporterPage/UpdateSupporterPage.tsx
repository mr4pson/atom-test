import { Form, FormInstance, Input } from "antd";
import ButtonElem from "components/uiKit/ButtomElem";
import { buttonElemType, htmlType } from "components/uiKit/ButtomElem/types";
import { memo, useRef, useState, useEffect } from "react";
import styles from "./UpdateSupporterPage.module.scss";
import Icon from "components/uiKit/Icon";
import { imageAltIcon } from "icons";
import { useLocation } from "react-router-dom";
import { AdminsPage, paths } from "../routes/constants";
import { useHistory, useParams } from "react-router";
import classNames from 'classnames';
import Loader from 'components/uiKit/Loader';
import { useCheckRole } from "components/hooks/useCheckRole";
import { useUploadFile } from "components/hooks/useUploadFile";
import { useUpdateSupporter } from "./useUpdateSupporter";
import { getImageUrl } from "components/common/commonHelper";

function UpdateSupporterPage(): JSX.Element {
  const formRef = useRef<FormInstance>(null);
  const location = useLocation();
  const history = useHistory();
  const [isChoosenFileChecked, setIsChoosenFileChecked] = useState<boolean>(
    false
  );
  const { id } = useParams<{ id: string }>();

  const { loadingUpdate, currentSupporter, addSupporter, getCurrentSupporter, updateSupporter } = useUpdateSupporter();

  const { uploadMediaFile, mediaFile } = useUploadFile(formRef, setIsChoosenFileChecked );

  const inititalFormState = {
    fullName: '',
    position: '',
    uploadFile: null,
    organization: '',
  };

  const formFieldsValue = formRef.current?.getFieldsValue();

  async function onSubmit(): Promise<void> {
    if (
      formFieldsValue.fullName &&
      formFieldsValue.position &&
      formFieldsValue.uploadFile
    ) {
      if (id) {
        await updateSupporter({ ...formFieldsValue }, id);
      } else {
        await addSupporter({ ...formFieldsValue });
      }
      setIsChoosenFileChecked(false);
      history.push(paths[AdminsPage.SUPPORTERS]);
    }
  }

  useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

  useEffect(() => {
    if (id) {
      getCurrentSupporter(id);
    }
  }, []);

  return (
    <>
      {(id ? currentSupporter : true) ? (
        <Form
          className={styles["update-supporter-page"]}
          name="basic"
          onFinish={onSubmit}
          ref={formRef}
          initialValues={
            location.pathname === paths[AdminsPage.ADD_PARTNER]
              ? inititalFormState
              : currentSupporter!
          }
        >
          <ButtonElem
            type={buttonElemType.Primary}
            htmlType={htmlType.SUBMIT}
            className={styles["update-supporter-page__button-add"]}
            loading={loadingUpdate}
            onClick={() => setIsChoosenFileChecked(true)}
          >
            {id ? 'Изменить партнёра' : 'Добавить партнёра'}
          </ButtonElem>
          <div className={styles["page-content"]}>
            <div className={styles["page-content__header"]}>
              <div className={styles["page-content__title"]}>
                Ф.И.О. спонсора
              </div>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, введите Ф.И.О.!",
                  },
                ]}
                className={styles["form-item"]}
                name="fullName"
              >
                <Input
                  className={styles["page-content__input"]}
                  placeholder="Введите Ф.И.О. спонсора"
                  type="text"
                  value={currentSupporter?.fullName}
                  disabled={loadingUpdate}
                />
              </Form.Item>
              <div className={styles["page-content__title"]}>
                Должность
              </div>
              <Form.Item
                rules={[
                  { required: true, message: "Пожалуйста, введите должность!" },
                ]}
                className={styles["form-item"]}
                name="position"
              >
                <Input
                  className={styles["page-content__input"]}
                  placeholder="Введите должность спонсора"
                  type="text"
                  value={currentSupporter?.position}
                  disabled={loadingUpdate}
                />
              </Form.Item>
              <div className={styles["page-content__title"]}>
                Организация
              </div>
              <Form.Item
                className={styles["form-item"]}
                name="organization"
              >
                <Input
                  className={styles["page-content__input"]}
                  placeholder="Введите наименование организации спонсора"
                  type="text"
                  value={currentSupporter?.organization}
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
              {currentSupporter?.uploadFile && 
                <div
                  style={{ backgroundImage: `url(${mediaFile ? getImageUrl(mediaFile) : getImageUrl(currentSupporter?.uploadFile)})` }}
                  className={styles['page-content__uploaded-image']}
                ></div>
              }
              {!formRef.current?.getFieldsValue().uploadFile &&
                isChoosenFileChecked && (
                  <span className={styles["choose-file"]}>
                    Пожалйуста, выберите файл!
                  </span>
                )}
            </div>
          </div>
        </Form>
      ) : <Loader className={'admin-loader'} />}
    </>
  );
}

export default memo(UpdateSupporterPage);
