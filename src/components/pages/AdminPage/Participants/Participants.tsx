import { Form, FormInstance, Input, Select, Space, Table } from 'antd';
import classNames from 'classnames';
import AdminModal from 'components/pages/AdminPage/AdminModal';
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import Icon from 'components/uiKit/Icon';
import { deleteIcon, editIcon, searchIcon } from 'icons';
import { memo, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { paths } from 'components/pages/AdminPage/routes/constants';
import { data, participantList } from './constants';
import styles from './Participants.module.scss';

function Participants(): JSX.Element {
    const history = useHistory();

    const formRef = useRef<FormInstance>(null);
    const { Option } = Select;
    const [participants, setParticipants] = useState<string>(participantList[0].value);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chosenParticipant, setChosenParticipant] = useState<string>('');

    const inititalFormState = {
      participants: 'new',
      searchParticipants: '',
    }

    const columns = [
      {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Дата регистрации',
        dataIndex: 'registrationDate',
        key: 'registrationDate',
      },
      {
        title: 'Город',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'Номер',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Редактирование',
        key: 'action',
        render: (text) => (
          <Space size="middle">
            <Icon
              className={styles['admin-table__icon']}
              path={deleteIcon.path}
              viewBox={deleteIcon.viewBox}
              onClick={() => showModal(text)}
              title="AtomTest"
            />
            <Icon
              className={styles['admin-table__icon']}
              path={editIcon.path}
              viewBox={editIcon.viewBox}
              title="AtomTest"
            />
          </Space>
        ),
      },
    ];

    function handleSelectChange(value: string): void {
      setParticipants(value);
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

    const showModal = (text: any) => {
      setChosenParticipant(text.name);
      setIsModalVisible(true);
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

    const handleCreateParticipant = () => {
      // Add when mock up will finished
      history.push(paths[''])
    }

    function onSubmit (): void {
      // console.log('Success:', values);
      console.log(formRef.current?.getFieldsValue());
    };

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
                  value={participants}
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
            <ButtonElem
              type={buttonElemType.Primary}
              htmlType="button"
              className={styles["tool-bar__button"]}
              onClick={handleCreateParticipant}
            >
              Добавить участника
            </ButtonElem>
          </div>
          <Table
              rowClassName={styles["admin-table__row"]}
              className={styles["admin-table"]}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
        </Form>
        <AdminModal
          title={`Удаление участника "${chosenParticipant}"`}
          isModalVisible={isModalVisible}
          loading={loading}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
        >
          <span>Вы действительно хотите удалить участника "{chosenParticipant}"?</span>
        </AdminModal>
      </div>
    );
}

export default memo(Participants);