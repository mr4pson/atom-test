import { Form, FormInstance, Input, Select, Space, Table } from 'antd';
import classNames from 'classnames';
import AdminModal from 'components/pages/AdminPage/AdminModal';
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import Icon from 'components/uiKit/Icon';
import { deleteIcon, searchIcon, visibleIcon } from 'icons';
import { memo, useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { AdminsPage, paths as adminPaths } from 'components/pages/AdminPage/routes/constants';
import { Page, paths } from 'routes/constants';
import { participantList } from './constants';
import styles from './Participants.module.scss';
import { TypeParticipantsData } from './types';
import { useCheckRole } from 'components/hooks/useCheckRole';
import { useUpdateParticipants } from './useUpdateParticipants';
import { connect } from "react-redux";
import { setCurrentIdToState } from 'redux/reducers/Participants.reducer';

type Props = {
  currentId: string;
  setCurrentIdToState: (id: string | number | undefined) => void;
};

function Participants(props: Props): JSX.Element {
    const history = useHistory();

    const formRef = useRef<FormInstance>(null);
    const { Option } = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [chosenParticipant, setChosenParticipant] = useState<string>('');

    const { loading, participants, getParticipants, deleteParticipants } = useUpdateParticipants();

    const inititalFormState = {
      participants: 'new',
      searchParticipants: '',
    }

    const columns = [
      {
        title: 'Имя',
        dataIndex: 'fullName',
        key: 'fullName',
      },
      {
        title: 'Дата регистрации',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'Город',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'Номер',
        dataIndex: 'phone',
        key: 'phone',
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
              path={visibleIcon.path}
              viewBox={visibleIcon.viewBox}
              title="AtomTest"
              onClick={() => onShowParticipant(itemData)}
            />
          </Space>
        ),
      },
    ];

    function handleSelectChange(value: string): void {
      // setParticipants(value);
      onSubmit();
    }

    function handlePressEnter(e) {
      e.target.blur(); 
      //Write you validation logic here
    }

    function handleSearchChange(): void {
      const searchValue = formRef.current?.getFieldValue('searchParticipants');
      console.log(searchValue);
    }

    const showModal = (itemData: any) => {
      setChosenParticipant(itemData.fullName);
      props.setCurrentIdToState(itemData.id);
      setIsModalVisible(true);
    };
  
    const handleDelete = async (): Promise<void> => {
      await deleteParticipants(props.currentId);
      await getParticipants();
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const handleCreateParticipant = () => {
      history.push(adminPaths[AdminsPage.ADD_PARTICIPANT]);
    }

    function onShowParticipant(itemData: TypeParticipantsData): void {
      history.push(`${paths[Page.PARTICIPANT_INFO]}/${itemData.id}`);
    }

    function onSubmit (): void {
      console.log(formRef.current?.getFieldsValue());
    };

    useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

    useEffect(() => {
      getParticipants();
    }, [])

    console.log(props.currentId);

    return (
      <div className={styles['participants-page']}>
        <Form
          name="basic"
          onFinish={onSubmit}
          ref={formRef}
          initialValues={inititalFormState}
        >
          <div className={styles["tool-bar"]}>
            <div className={styles["tool-bar__input-select-wrapper"]}>
              <Form.Item className={styles["participants-page__form-item"]} name="participants">
                <Select
                  placeholder="Выберите участника"
                  className={classNames(
                    "tool-bar__select",
                    styles["tool-bar__select"]
                  )}
                  onChange={handleSelectChange}
                  // value={participants![0]}
                >
                  {participantList.map((item) => (
                    <Option key={item?.id} value={item?.value}>
                      {item?.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className={styles["participants-page__form-item"]}
                name="searchParticipants"
              >
                <Input
                  className={styles["tool-bar__input"]}
                  placeholder="Поиск участника"
                  type="search"
                  onChange={handleSearchChange}
                  onBlur={onSubmit}
                  onPressEnter={handlePressEnter}
                  suffix={
                    <Icon
                      className={styles["tool-bar__search-icon"]}
                      path={searchIcon.path}
                      viewBox={searchIcon.viewBox}
                      title="AtomTest"
                    />
                  }
                />
              </Form.Item>
            </div>
            {/* <ButtonElem
              type={buttonElemType.Primary}
              htmlType="button"
              className={styles["tool-bar__button"]}
              onClick={handleCreateParticipant}
            >
              Добавить участника
            </ButtonElem> */}
            <div />
          </div>
          <Table
              rowClassName={styles["admin-table__row"]}
              className={styles["admin-table"]}
              columns={columns}
              dataSource={participants!}
              pagination={false}
              loading={loading}
            />
        </Form>
        <AdminModal
          className={'delete-modal'}
          title={`Удаление участника "${chosenParticipant}"`}
          isModalVisible={isModalVisible}
          loading={loading}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
        >
          <span>Вы действительно хотите удалить участника "{chosenParticipant}"?</span>
        </AdminModal>
      </div>
    );
}

const mapStateToProps = (state: any) => {
  return {
    currentId: state.participants?.currentId,
  }
}

export default connect(mapStateToProps, { setCurrentIdToState })(memo(Participants));
