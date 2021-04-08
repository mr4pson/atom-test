import { memo, useEffect, useState } from "react";
import styles from "./MenuDetailPage.module.scss";
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import { Form, Input, Checkbox } from "antd";
import { useParams } from "react-router";
import axios from "axios";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { TypeMenu } from "../MenuPage/types";
import { TypeAction, TypeCollapseConfig } from "components/uiKit/AdminCollapse/types";
import Loader from 'components/uiKit/Loader';
import { ReactComponent as EditIcon } from "../../../../assets/images/admin/edit.svg";
import { ReactComponent as DoneIcon } from '../../../../assets/images/admin/done.svg';
import { ReactComponent as ChevronSvg } from "../../../../assets/images/admin/chevron.svg";
import { TypeSubCategory } from "./types";
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import { ReactComponent as TrashIcon } from '../../../../assets/images/admin/trash.svg';

const { TextArea } = Input;

function MenuDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [menuElem, setMenuElem] = useState<TypeMenu | null>(null);
  const curJwtPair = getJwtPair();

  const getActions = (isEditing: boolean = false): TypeAction[] => {
    return [
      {
        id: "edit",
        icon: !isEditing ? <EditIcon /> : <DoneIcon />,
        callback: async (action: TypeAction, config: any, formValues: Object) => {
          config.isEditing = !config.isEditing;
          if (config.isEditing) {
            action.icon = <DoneIcon />;
          } else {
            action.icon = <EditIcon />;
            Object.assign(config, formValues);
            console.log('update');
              const payload = {
                _id: config.id,
                title: config.title,
                url: config.url,
                subcategories: config.subcategories
                  .filter((subcategory) => subcategory.id)
                  .map((subcategory) => subcategory.id),
                editable: config.editable,
                deletable: config.deletable,
                visible: config.visible,
              }
              const options = {
                headers: {
                  Authorization: `Bearer ${await curJwtPair}`,
                  withCredentials: true,
                },
              };
              await axios.put<TypeMenu>('/api/menus/' + config.id, payload, options);
              // config.isEditing = false;
              setMenuElem({
                ...config,
                actions: getActions(config.isEditing)
              });
          }
        }
      }
    ];
  }

  const getMenu = async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${await curJwtPair}`,
        withCredentials: true,
      },
    };
    const response = await axios.get<TypeMenu>('/api/menus/' + id, options);
    setMenuElem({
      ...response.data,
      isEditing: false,
      collapseOn: 'edit',
      actions: getActions(),
      subcategories: response.data.subcategories?.map((subcategory) => ({
        ...subcategory,
        collapseOn: 'edit',
        actions: getSubCategoryActions(false, subcategory),
      })),
    });
  }

  const getSubCategoryActions = (isEditing: boolean = false, subCategory: TypeSubCategory | undefined): TypeAction[] => {
    const actions: TypeAction[] = [
      {
        id: "edit",
        icon: <div className={'sub-category'}>
          <span className={'title'}>Произвольная ссылка</span>
          <ChevronSvg className={'svg'} />
        </div>,
        callback: async (action: TypeAction, config: TypeCollapseConfig) => {
          config.isEditing = !config.isEditing;
        }
      },
    ];
    if (subCategory?.id) {
      actions.push({
        id: "Delete",
        icon: <TrashIcon />,
        callback: async (action: TypeAction, config: TypeCollapseConfig) => {
          if (!config.id) {
            return;
          } 
          const options = {
            headers: {
              Authorization: `Bearer ${await curJwtPair}`,
              withCredentials: true,
            },
          };
          if (window.confirm(`Вы уверены, что хотите удалить подкатегорию №${subCategory.id}`)) {
            const response = await axios.delete<TypeMenu>('/api/subcategories/' + subCategory.id, options);
            const newMenuElem = {
              ...response.data,
              isEditing: false,
              collapseOn: 'edit',
              actions: getActions(),
              subcategories: response.data.subcategories!.map((subcategory) => ({
                ...subcategory,
                collapseOn: 'edit',
                actions: getSubCategoryActions(false, subcategory),
              })),
            } as TypeMenu;

            setMenuElem(newMenuElem);
          }
        },
      });
    }
    return actions;
  }

  const onSubCategorySubmit = async (formValues, curSubCategory: TypeSubCategory) => {
    const curMenuElem = { ...menuElem } as TypeMenu;
    const options = {
      headers: {
        Authorization: `Bearer ${await curJwtPair}`,
        withCredentials: true,
      },
    };
    const newSubcategory = curMenuElem?.subcategories?.find((subcategory) => subcategory.id === curSubCategory.id) as TypeSubCategory;
    newSubcategory.isEditing = false;
    Object.assign(newSubcategory, formValues);
    if (newSubcategory.id) {
      console.log('update');
      const payload = {
        title: newSubcategory.title,
        url: newSubcategory.url,
        news: [],
        menu: curMenuElem?.id,
      };
      await axios.put<TypeSubCategory>('/api/subcategories/' + newSubcategory.id, payload, options);
      const subCategory = curMenuElem?.subcategories?.find((subcategory) => subcategory.id === newSubcategory.id) as TypeSubCategory;
      subCategory.isEditing = false;
    } else {
      console.log('create');
      const payload = {
        title: newSubcategory.title,
        url: newSubcategory.url,
        news: [],
        menu: menuElem?.id,
      };
      const response = await axios.post<TypeSubCategory>('/api/subcategories', payload, options);
      newSubcategory.id = response.data.id;
    }
    const subCategory = curMenuElem?.subcategories?.find((subcategory) => subcategory.id === newSubcategory.id) as TypeSubCategory;
    subCategory.isEditing = false;
    subCategory.actions = getSubCategoryActions(false, subCategory);
    setMenuElem(curMenuElem);
  }

  const handleCreate = () => {
    setMenuElem({
      ...menuElem,
      subcategories: menuElem?.subcategories?.concat([{
        title: '',
        url: '',
        openInNewTab: false,
        collapseOn: 'edit',
        isEditing: true,
        news: [],
        actions: getSubCategoryActions(false, undefined),
    }]),
    } as TypeMenu);
  }

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      {
        menuElem ? <div className={styles["menu-detail-page"]}>
          <div className={styles["menu-detail-page__create-wrap"]}>
            <ButtonElem
              type={buttonElemType.Primary}
              htmlType="button"
              className={styles["menu-detail-page__create-btn"]}
              onClick={handleCreate}
            >
              Добавить подкатегорию
            </ButtonElem>
          </div>
          <AdminCollapseElem
            className={'menu-elem-collapse'}
            config={menuElem as TypeCollapseConfig}
          >
            <Form.Item name="url">
              <TextArea placeholder="Ссылка меню" rows={1} />
            </Form.Item>
          </AdminCollapseElem>
          <div className={styles['menu-detail-page__desc']}>
            Расположите элементы в желаемом порядке путём перетаскивания. Можно также щёлкнуть на стрелку справа от пункта меню,<br/> чтобы открыть дополнительные настройки.
          </div>
          <div className={styles['menu-detail-page__sub-categories']}>
            {menuElem?.subcategories?.map((subCategory, index) => (
              <div key={index} className={styles['sub-category']}>
                <AdminCollapseElem
                  onSubmit={(e) => onSubCategorySubmit.call(MenuDetailPage, e, subCategory)}
                  key={index}
                  className={'menu-sub-category-collapse'}
                  config={subCategory as TypeCollapseConfig}
                >
                  <Form.Item name="url">
                    <Input className={'menu-sub-category-input'} placeholder="Ссылка меню" />
                  </Form.Item>
                  <Form.Item name="openInNewTab" valuePropName='checked'>
                    <Checkbox>
                      Открывать в новом окне
                    </Checkbox>
                  </Form.Item>
                  <div className={'menu-sub-category-btn-wrap'}>
                    <ButtonElem>Сохранить</ButtonElem>
                  </div>
                </AdminCollapseElem>
                <div className={styles['sub-category-news']}>
                  {subCategory.news.map((newsItem, index) => (
                    <div className={styles['sub-category-news__item']}>
                      <AdminCollapseElem
                        key={index}
                        config={newsItem as TypeCollapseConfig}
                      ></AdminCollapseElem>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        : <Loader />
      }
    </>
  )
}

export default memo(MenuDetailPage);