import { Form, Input } from "antd";
import axios from "axios";
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import { TypeAction } from "components/uiKit/AdminCollapse/types";
import ButtonElem from "components/uiKit/ButtomElem";
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import { editIcon, trashIcon, unVisibleIcon, visibleIcon } from "icons";
import { memo, useEffect, useState } from "react";
// import { getActions } from './constants';
import styles from "./PartnersPage.module.scss";
import { TypePartner } from "./types";
import Icon from "components/uiKit/Icon";
import AdminModal from 'components/pages/AdminPage/AdminModal';
import { useHistory } from 'react-router';
import { AdminsPage, paths } from "../routes/constants";

const { TextArea } = Input;

function PartnersPage(): JSX.Element {
  const [partners, setPartners] = useState<TypePartner[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [chosenPartner, setChosenPartner] = useState<string>('');

  let history = useHistory();

  const getPartners = async () => {
    const partnersResponse = await axios.get<TypePartner[]>(
      "/mocks/getPartnersPageData.json"
    );
    const newPartners = partnersResponse.data.map((item) => ({
      ...item,
      actions: getActions(item),
    }));
    setPartners(newPartners);
  };

  useEffect(() => {
    getPartners();
  }, []);

  console.log(partners);
  const getActions = (itemData: TypePartner): TypeAction[] => {
    return [
      {
        id: "watch",
        icon: itemData.visible ? (
          <Icon
            className={styles["action-icon__watch"]}
            path={visibleIcon.path}
            viewBox={visibleIcon.viewBox}
          />
        ) : (
          <Icon
            className={styles["action-icon__delete"]}
            path={unVisibleIcon.path}
            viewBox={unVisibleIcon.viewBox}
          />
        ),
        callback: (action: TypeAction, config: any, formValues: Object) => {
          console.log(config);
          config.visible = !config.visible;
          action.icon = config.visible ? (
            <Icon
              className={styles["action-icon__watch"]}
              path={visibleIcon.path}
              viewBox={visibleIcon.viewBox}
            />
          ) : (
            <Icon
              className={styles["action-icon__delete"]}
              path={unVisibleIcon.path}
              viewBox={unVisibleIcon.viewBox}
            />
          );
        },
      },
      {
        id: "edit",
        icon: (
          <Icon
            className={styles["action-icon__edit"]}
            path={editIcon.path}
            viewBox={editIcon.viewBox}
          />
        ),
        callback: () => handleEditPartner(itemData),
      },
      {
        id: "delete",
        icon: (
          <Icon
            className={styles["action-icon__delete"]}
            path={trashIcon.path}
            viewBox={trashIcon.viewBox}
          />
        ),
        callback: () =>  showModal(itemData),
      },
    ];
  };

  const handleEditPartner = (itemData: TypePartner) => {
    history.push(`${paths[AdminsPage.EDIT_PARTNER]}/${itemData.id}`)
  };

  const handleAddPartner = () => {
    // TODO add http create request
    history.push(paths[AdminsPage.ADD_PARTNER]);
  }

  const showModal = (itemData: TypePartner) => {
    setChosenPartner(itemData.title);
    setIsModalVisible(true);
    console.log(itemData.id);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles["partners-page"]}>
      <div className={styles["partners-page__create-wrap"]}>
        <ButtonElem
          type={buttonElemType.Primary}
          htmlType="button"
          className={styles["partners-page__create-btn"]}
          onClick={handleAddPartner}
        >
          Добавить партнера
        </ButtonElem>
      </div>
      <>
        {partners.map((question, index) => (
          <AdminCollapseElem key={index} config={question}>
            <Form.Item name="description">
              <TextArea placeholder="Введите ответ" rows={1} />
            </Form.Item>
          </AdminCollapseElem>
        ))}
      </>
      <AdminModal
        title={`Удаление "${chosenPartner}"`}
        isModalVisible={isModalVisible}
        loading={loading}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <span>Вы действительно хотите удалить партнера "{chosenPartner}"?</span>
      </AdminModal>
    </div>
  );
}

export default memo(PartnersPage);
