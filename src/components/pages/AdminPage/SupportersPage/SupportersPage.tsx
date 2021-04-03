import { Space, Table } from 'antd';
import AdminModal from 'components/pages/AdminPage/AdminModal';
import Icon from 'components/uiKit/Icon';
import { deleteIcon, editIcon } from 'icons';
import { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from './SupportersPage.module.scss';
import { useCheckRole } from 'components/hooks/useCheckRole';
import { connect } from "react-redux";
import { setCurrentIdToState } from 'redux/reducers/AdminPages.reducer';
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import { TypeSupporter } from './types';
import { AdminsPage, paths } from '../routes/constants';
import { useUpdateSupporters } from './useUpdateSupporters';

type Props = {
  currentId: string;
  setCurrentIdToState: (id: string | number | undefined) => void;
};

function SupportersPage(props: Props): JSX.Element {
  const history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chosenSupporter, setChosenSupporter] = useState<string>('');

  const { loading, supporters, getSupporters, deleteSupporter } = useUpdateSupporters();

  const columns = [
    {
      title: 'Ф.И.О.',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Должность',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Организация',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: 'Редактирование',
      key: 'action',
      render: (itemData) => (
        <Space size="middle">
          <Icon
            className={styles['admin-table__icon']}
            path={deleteIcon.path}
            viewBox={deleteIcon.viewBox}
            onClick={() => showModal(itemData)}
            title="AtomTest"
          />
          <Icon
            className={styles['admin-table__icon']}
            path={editIcon.path}
            viewBox={editIcon.viewBox}
            onClick={() => handleEditSupporter(itemData)}
            title="AtomTest"
          />
        </Space>
      ),
    },
  ];

  function handleCreateSupporter(): void {
    history.push(paths[AdminsPage.ADD_SUPPORTER]);
  }

  const showModal = (itemData: TypeSupporter) => {
    setChosenSupporter(itemData.fullName);
    props.setCurrentIdToState(itemData.id);
    setIsModalVisible(true);
  };

  const handleDelete = async (): Promise<void> => {
    await deleteSupporter(props.currentId);
    await getSupporters();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditSupporter = (itemData: TypeSupporter) => {
    history.push(`${paths[AdminsPage.EDIT_SUPPORTER]}/${itemData.id}`)
  }

  useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

  useEffect(() => {
    getSupporters();
  }, [])

  console.log(supporters);

  return (
    <div className={styles['supporters-page']}>
      <>
        <div className={styles["tool-bar"]}>
          <ButtonElem
            type={buttonElemType.Primary}
            htmlType="button"
            className={styles["tool-bar__button"]}
            onClick={handleCreateSupporter}
          >
            Добавить спонсора
            </ButtonElem>
          <div />
        </div>
        <Table
          rowClassName={styles["admin-table__row"]}
          className={styles["admin-table"]}
          columns={columns}
          dataSource={supporters!}
          pagination={false}
        loading={loading}
        />
      </>
      <AdminModal
        className={'delete-modal'}
        title={`Удаление спонсора "${chosenSupporter}"`}
        isModalVisible={isModalVisible}
        loading={loading}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
      >
        <span>Вы действительно хотите удалить спонсора "{chosenSupporter}"?</span>
      </AdminModal>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    currentId: state.adminPages?.currentId,
  }
}

export default connect(mapStateToProps, { setCurrentIdToState })(memo(SupportersPage));
