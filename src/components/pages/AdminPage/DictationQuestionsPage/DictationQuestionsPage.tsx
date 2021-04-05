import { Space, Table } from 'antd';
import AdminModal from 'components/pages/AdminPage/AdminModal';
import Icon from 'components/uiKit/Icon';
import { deleteIcon, visibleIcon } from 'icons';
import { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AdminsPage, paths } from 'components/pages/AdminPage/routes/constants';
import styles from './DictationQuestionsPage.module.scss';
import { connect } from "react-redux";
import { setCurrentIdToState } from 'redux/reducers/AdminPages.reducer';
import { useCheckRole } from 'components/hooks/useCheckRole';
import { useUpdateDictationQuestions } from './useUpdateDictationQuestions';
import { TypeDictationQuestion } from './types';

function DictationQuestionsPage(props: {
  currentId: string;
  setCurrentIdToState: (id: string) => void;
}): JSX.Element {
  const history = useHistory();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chosenQuestion, setChosenQuestion] = useState<string>('');

  const { loading, getDictationQuestions, dictationQuestions, deleteDictationQuestion } = useUpdateDictationQuestions();

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Дата добавления',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
            title="Удалить сообщение"
          />
          <Icon
            className={styles['admin-table__icon']}
            path={visibleIcon.path}
            viewBox={visibleIcon.viewBox}
            title="Посмотреть сообщение"
            onClick={() => onShowDictationQuestion(itemData)}
          />
        </Space>
      ),
    },
  ];

  const showModal = (itemData: TypeDictationQuestion) => {
    setChosenQuestion(itemData.fullName);
    props.setCurrentIdToState(itemData.id);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    await deleteDictationQuestion(props.currentId);
    await getDictationQuestions();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onShowDictationQuestion(itemData: TypeDictationQuestion): void {
    history.push(`${paths[AdminsPage.WATCH_DICTATION_QUESTIONS]}/${itemData.id}`);
  }

  useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

  useEffect(() => {
    (async () => {
      await getDictationQuestions();
    })();
  }, []);

  return (
    <div className={styles['dictation-questions-page']}>
      <Table
        rowClassName={styles["admin-table__row"]}
        className={styles["admin-table"]}
        columns={columns}
        dataSource={dictationQuestions}
        pagination={false}
      loading={loading}
      />
      <AdminModal
        className={'delete-modal'}
        title={`Удаление сообщения от "${chosenQuestion}"`}
        isModalVisible={isModalVisible}
        loading={loading}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
      >
        <span>Вы действительно хотите удалить сообщение от "{chosenQuestion}"?</span>
      </AdminModal>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    currentId: state.adminPages?.currentId,
  }
}

export default connect(mapStateToProps, { setCurrentIdToState })(memo(DictationQuestionsPage));
