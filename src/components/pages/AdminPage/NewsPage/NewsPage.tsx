import { Form, FormInstance, Input, Select, Space, Table } from 'antd';
import classNames from 'classnames';
import AdminModal from 'components/pages/AdminPage/AdminModal';
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import Icon from 'components/uiKit/Icon';
import { deleteIcon, editIcon, searchIcon } from 'icons';
import { memo, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { AdminsPage, paths } from 'components/pages/AdminPage/routes/constants';
import { noteList } from './constants';
import styles from './NewsPage.module.scss';
import { TypeNewsPageData } from './types';
import { useRemoveNews } from './useRemoveNews';
import { connect } from "react-redux";
import { setCurrentIdToState } from 'redux/reducers/AdminPages.reducer';
import { useCheckRole } from 'components/hooks/useCheckRole';

function NewsPage(props: {
  currentId: string;
  setCurrentIdToState: (id: string) => void;
}): JSX.Element { 
  const history = useHistory();

  const formRef = useRef<FormInstance>(null);
  const { Option } = Select;
  const [note, setNote] = useState<string>(noteList[0].value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chosenNews, setChosenNews] = useState<string>('');

  const { loading, getNews, news, deleteNews } = useRemoveNews();

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
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Рубрика',
      dataIndex: 'subcategory',
      key: 'subcategory',
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
            onClick={() => handleEditNews(itemData)}
            title="AtomTest"
          />
        </Space>
      ),
    },
  ];

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

  const showModal = (itemData: TypeNewsPageData) => {
    setChosenNews(itemData.name);
    props.setCurrentIdToState(itemData.id);
    setIsModalVisible(true);
    console.log(itemData.id);
  };

  const handleDelete = async () => {
    await deleteNews(props.currentId);
    await getNews();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateNews = () => {
    history.push(paths[AdminsPage.NEWS_CREATE]);
  }

  const handleEditNews = (itemData: TypeNewsPageData) => {
    history.push(`${paths[AdminsPage.NEWS_EDIT]}/${itemData.id}`)
  }

  function onSubmit(): void {
    //TODO: after creation necessary servers API methods
    console.log(formRef.current?.getFieldsValue());
  };

  useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

  useEffect(() => {
    (async () => {
      await getNews();
    })();
  }, []);

  console.log(news);

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
          <ButtonElem
            type={buttonElemType.Primary}
            htmlType="button"
            className={styles["tool-bar__button"]}
            onClick={handleCreateNews}
          >
            Добавить страницу
            </ButtonElem>
        </div>
        <Table
          rowClassName={styles["admin-table__row"]}
          className={styles["admin-table"]}
          columns={columns}
          dataSource={news}
          pagination={false}
          loading={loading}
        />
      </Form>
      <AdminModal
        className={'delete-modal'}
        title={`Удаление "${chosenNews}"`}
        isModalVisible={isModalVisible}
        loading={loading}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
      >
        <span>Вы действительно хотите удалить "{chosenNews}"?</span>
      </AdminModal>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
      currentId: state.adminPages?.currentId,
  }
}

export default connect(mapStateToProps, { setCurrentIdToState })(memo(NewsPage));
