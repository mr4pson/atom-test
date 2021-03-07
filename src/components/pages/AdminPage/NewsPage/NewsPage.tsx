import { Button, Form, FormInstance, Input, Select, Space, Table } from 'antd';
import classNames from 'classnames';
import AdminModal from 'components/pages/AdminPage/AdminModal';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import Icon from 'components/uiKit/Icon';
import { deleteIcon, editIcon, searchIcon } from 'icons';
import { memo, useRef, useState } from 'react';
import { data, noteList } from './constants';
import styles from './NewsPage.module.scss';

function NewsPage(props): JSX.Element {
    const formRef = useRef<FormInstance>(null);
    const { Option } = Select;
    const [note, setNote] = useState<string>(noteList[0].value);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chosenNews, setChosenNews] = useState<string>('');

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
        render: (text) => (
          <Space size="middle">
            <Icon
              className={styles['admin-table__icon']}
              path={deleteIcon.path}
              viewBox={deleteIcon.viewBox}
              onClick={() => props.showModal(text)}
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
    // console.log(note);

    const showModal = (text: any) => {
      setChosenNews(text.name);
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

    return (
      <div className={styles['news-page']}>
        <Form
          name="basic"
          onFinish={onSubmit}
          ref={formRef}
          initialValues={inititalFormState}
        >
          <div className={styles["tool-bar"]}>
            <div className={styles["tool-bar__input-select-wrapper"]}>
              <Form.Item className={styles["news-page__form-item"]} name="note">
                <Select
                  placeholder="Выбирите запись"
                  className={classNames(
                    "tool-bar__select",
                    styles["tool-bar__select"]
                  )}
                  onChange={handleSelectChange}
                  value={note}
                >
                  {noteList.map((item) => (
                    <Option key={item?.id} value={item?.value}>
                      {item?.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className={styles["news-page__form-item"]}
                name="searchNews"
              >
                <Input
                  className={styles["tool-bar__input"]}
                  placeholder="Поиск новости"
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
            <Button
              type={buttonElemType.Primary}
              htmlType="button"
              className={styles["tool-bar__button"]}
            >
              Добавить новость
            </Button>
          </div>
          <Table
              rowClassName={styles["admin-table__row"]}
              className={styles["admin-table"]}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
        </Form>
        {/* <Modal
          title={`Удаление "${chosenNews}"`}
          className={classNames("delete-modal", styles["delete-modal"])}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <ButtonElem
              className={styles["return-btn"]}
              key="back"
              onClick={handleCancel}
            >
              Вернуться
            </ButtonElem>,
            <ButtonElem
              className={styles["submit-btn"]}
              key="submit"
              type={buttonElemType.Primary}
              loading={loading}
              onClick={handleOk}
            >
              Подтвердить
            </ButtonElem>,
          ]}
        >
          <span>Вы действительно хотите удалить "{chosenNews}"?</span>
        </Modal> */}
        <AdminModal
          isModalVisible={isModalVisible}
          loading={loading}
          chosenNews={chosenNews}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
        >
          <span>Вы действительно хотите удалить "{chosenNews}"?</span>
        </AdminModal>
      </div>
    );
}

export default memo(NewsPage);