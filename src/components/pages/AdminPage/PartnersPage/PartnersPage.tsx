import { Form, Input } from "antd";
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import { TypeAction } from "components/uiKit/AdminCollapse/types";
import ButtonElem from "components/uiKit/ButtomElem";
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import { editIcon, trashIcon, unVisibleIcon, visibleIcon } from "icons";
import { memo, useEffect, useState } from "react";
import styles from "./PartnersPage.module.scss";
import { TypePartner } from "./types";
import Icon from "components/uiKit/Icon";
import AdminModal from 'components/pages/AdminPage/AdminModal';
import { useHistory } from 'react-router';
import { AdminsPage, paths } from "../routes/constants";
import { useRemovePartner } from "./useRemovePartner";
import { connect } from "react-redux";
import { setCurrentIdToState } from 'redux/reducers/AdminPages.reducer';
import { useUpdatePartner } from "../AddPartnerPage/useUpdatePartner";
import Loader from 'components/uiKit/Loader';
import { useCheckRole } from "components/hooks/useCheckRole";

const { TextArea } = Input;

type Props = {
  currentId: string;
  setCurrentIdToState: (id: string | number | undefined) => void;
};

function PartnersPage(props: Props): JSX.Element {
  const [data, setData] = useState<TypePartner[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chosenPartner, setChosenPartner] = useState<string>('');

  const { loading, getPartners, partners, deletePartner } = useRemovePartner();
  const { loadingUpdate, updatePartner } = useUpdatePartner();
  let history = useHistory();

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
        callback: async (action: TypeAction, config: any, formValues: Object) => {
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
          await updatePartner({ ...itemData, visible: !itemData.visible }, itemData.id?.toString()!)
          await getPartners();
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
        callback: () => showModal(itemData),
      },
    ];
  };

  const showModal = (itemData: TypePartner) => {
    setChosenPartner(itemData.title);
    props.setCurrentIdToState(itemData.id);
    setIsModalVisible(true);
  };

  const handleEditPartner = (itemData: TypePartner) => {
    history.push(`${paths[AdminsPage.EDIT_PARTNER]}/${itemData.id}`)
  };

  const handleAddPartner = () => {
    history.push(paths[AdminsPage.ADD_PARTNER]);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  async function handleDelete(): Promise<void> {
    await deletePartner(props.currentId);
    await getPartners();
    setIsModalVisible(false);
  };

  useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

  useEffect(() => {
    (async () => {
      await getPartners();
    })();
  }, []);

  useEffect(() => {
    const newPartners = partners?.map((item) => ({
      ...item,
      actions: getActions(item),
    }));
    setData(newPartners);
  }, [partners]);

  return (
    <>
      {
        !(loading || loadingUpdate) ? <div className={styles["partners-page"]}>
          <div className={styles["partners-page__create-wrap"]}>
            <ButtonElem
              type={buttonElemType.Primary}
              htmlType="button"
              className={styles["partners-page__create-btn"]}
              onClick={handleAddPartner}
            >
              Добавить партнёра
            </ButtonElem>
          </div>
          <>
            {data?.map((partner, index) => (
              <AdminCollapseElem key={index} config={partner}>
                <Form.Item name={"description"}>
                  <TextArea placeholder="Введите ответ" rows={1} />
                </Form.Item>
              </AdminCollapseElem>
            ))}
          </>
          <AdminModal
            className={'delete-modal'}
            title={`Удаление "${chosenPartner}"`}
            isModalVisible={isModalVisible}
            loading={loading}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
          >
            <span>Вы действительно хотите удалить партнера "{chosenPartner}"?</span>
          </AdminModal>
        </div> : <Loader className={'admin-loader'} />
      }
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    currentId: state.adminPages?.currentId,
  }
}

export default connect(mapStateToProps, { setCurrentIdToState })(memo(PartnersPage));
