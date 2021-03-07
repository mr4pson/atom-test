import { memo, useRef, useState } from 'react';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import styles from './AdminPage.module.scss';
import { Input, Button, FormInstance, Table, Select, Menu, Form, Modal, Space } from 'antd';
import Icon from 'components/uiKit/Icon';
import { data, noteList } from './constants';
// import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import { menuItems } from './constants';
import { deleteIcon, editIcon, searchIcon } from 'icons';
import classNames from 'classnames';

function AdminPage(): JSX.Element {
    const formRef = useRef<FormInstance>(null);
    const { Option } = Select;
    const [note, setNote] = useState<string>(noteList[0].value);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const inititalFormState = {
      note: 'all',
      searchNews: '',
    }

    const columns = [
      {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Дата добавления',
        dataIndex: 'createdDate',
        key: 'createdDate',
      },
      {
        title: 'Рубрика',
        dataIndex: 'heading',
        key: 'heading',
      },
      {
        title: 'Редактирование',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Icon
              className={styles['admin-table__icon']}
              path={deleteIcon.path}
              viewBox={deleteIcon.viewBox}
              onClick={showModal}
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

    function onSubmit (): void {
      // console.log('Success:', values);
      console.log(formRef.current?.getFieldsValue());
    };

    function handleSelectChange(value: string): void {
      setNote(value);
      onSubmit();
    }

    function handlePressEnter(e) {
      e.target.blur(); 
      //Write you validation logic here
    }

    function handleSearchChange(): void {
      const searchValue = formRef.current?.getFieldValue('searchNews');
      console.log(searchValue);
    }

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsModalVisible(false);
      }, 2000)
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    console.log(note);

    return (
      <div className='container'>
        <Navigation navigationType={NavigationType.HEADER}/>
        <Form
            name="basic"
            onFinish={onSubmit}
            className={styles['admin-page']}
            ref={formRef}
            initialValues={inititalFormState}
        >
          <Menu
            className={classNames('menu', styles['menu'])}
            defaultSelectedKeys={[menuItems[0].key]}
            mode={'inline'}
            theme={'light'}
          >
            {
              menuItems.map((item) => {
                return <Menu.Item
                  className={styles['menu__item']}
                  key={item.key}
                  icon={item.icon}
                >
                  {item.title}                 
                </Menu.Item>
              })
            }
          </Menu>
          <div className={styles['admin-page__table-tools-wrapper']}>
            <div className={styles['tool-bar']}>
              <div className={styles['tool-bar__input-select-wrapper']}>
                <Form.Item name="note">
                  <Select
                      placeholder='Выбирите запись' 
                      className={classNames('tool-bar__select', styles['tool-bar__select'])}
                      onChange={handleSelectChange}
                      value={note}
                  >
                    {
                      noteList.map((item) => (
                        <Option key={item?.id} 
                          value={item?.value}
                        >
                          {item?.title}
                        </Option>
                      ))
                    }
                  </Select>
                </Form.Item>
                <Form.Item name="searchNews">
                  <Input
                    className={styles['tool-bar__input']}
                    placeholder='Поиск новости'
                    type="search"
                    onChange={handleSearchChange}
                    onBlur={onSubmit}
                    onPressEnter={handlePressEnter}
                    suffix={<Icon
                      className={styles['tool-bar__search-icon']}
                      path={searchIcon.path}
                      viewBox={searchIcon.viewBox}
                      title="AtomTest"
                    />}
                  />
                </Form.Item>
              </div>
              <Button
                type={buttonElemType.Primary}
                htmlType="button"
                className={styles['tool-bar__button']}
              >
                Добавить новость
              </Button>
            </div>
            <Table
              rowClassName={styles['admin-table__row']}
              className={styles['admin-table']}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
          </div>
        </Form>
        <Modal
          title="Удалить новость"
          className={classNames('delete-modal', styles['delete-modal'])}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button className={styles['return-btn']} key="back" onClick={handleCancel}>
              Вернуться
            </Button>,
            <Button
              className={styles['submit-btn']}
              key="submit"
              type={buttonElemType.Primary}
              loading={loading}
              onClick={handleOk}
            >
              Подтвердить
            </Button>,
          ]}
        >
          <span>Вы действительно хотите удалить новость?</span>
        </Modal>
      </div>
    );
}

export default memo(AdminPage);