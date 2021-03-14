import { Form, FormInstance, Input, Select, Space, Table } from 'antd';
import classNames from 'classnames';
import AdminModal from 'components/pages/AdminPage/AdminModal';
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import Icon from 'components/uiKit/Icon';
import { deleteIcon, editIcon, searchIcon } from 'icons';
import { memo, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Page, paths } from 'components/pages/AdminPage/routes/constants';
import { noteList } from './constants';
import styles from './NewsPage.module.scss';
import { TypeNewsPageData } from './types';
import axios from 'axios';

function NewsPage(): JSX.Element {
    const history = useHistory();

    const formRef = useRef<FormInstance>(null);
    const { Option } = Select;
    const [note, setNote] = useState<string>(noteList[0].value);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chosenNews, setChosenNews] = useState<string>('');
    const [data, setData] = useState<TypeNewsPageData[]>([]);

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
              onClick={() => redirectToEditPage(itemData)}
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
    // console.log(note);

    const showModal = (itemData: TypeNewsPageData) => {
      setChosenNews(itemData.name);
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

    const handleCreateNews = () => {
      history.push(paths[Page.NEWS_CREATE])
    }

    const redirectToEditPage = (itemData: TypeNewsPageData) => {
      history.push(`${paths[Page.NEWS_CREATE]}/${itemData.id}`)
    }

    function onSubmit (): void {
      // console.log('Success:', values);
      console.log(formRef.current?.getFieldsValue());
    };

    async function getNewsPageData() {
      const response = await axios.get<TypeNewsPageData[]>('/mocks/getNewsPageData.json');
      const responseWithKey = response.data.map((item, index) => (
        {
          ...item,
          key: index,
        }
      ))
      setData(responseWithKey);
    }
  
    useEffect(() => {
      getNewsPageData();
    }, [])

    console.log(data);

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
              Добавить новость
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
          title={`Удаление "${chosenNews}"`}
          isModalVisible={isModalVisible}
          loading={loading}
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