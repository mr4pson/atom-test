import { memo, useEffect, useState } from "react";
import styles from "./MenuPage.module.scss";
import { Form, Input } from "antd";
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import ButtonElem from "components/uiKit/ButtomElem";
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import axios from "axios";
import { useCheckRole } from "components/hooks/useCheckRole";
import {
  TypeAction,
  TypeCollapseConfig,
} from "components/uiKit/AdminCollapse/types";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { ReactComponent as EditIcon } from "../../../../assets/images/admin/edit.svg";
import { ReactComponent as DoneIcon } from '../../../../assets/images/admin/done.svg';
import { ReactComponent as VisibleIcon } from "../../../../assets/images/admin/visible.svg";
import { ReactComponent as InvisibleIcon } from "../../../../assets/images/admin/invisible.svg";
import { ReactComponent as TrashIcon } from "../../../../assets/images/admin/trash.svg";
import { TypeMenu } from "./types";
import { useHistory } from "react-router";
import Loader from 'components/uiKit/Loader';

const { TextArea } = Input;

function MenuPage(): JSX.Element {
  const [menuElems, setMenuElems] = useState<TypeMenu[]>([]);
  const history = useHistory();

  const curJwtPair: string = getJwtPair();
  const options = {
    headers: {
      Authorization: `Bearer ${curJwtPair}`,
      withCredentials: true,
    },
  };

  const getActions = (
    isEditing: boolean = false,
    menu: TypeMenu | null,
    setMenuElems: React.Dispatch<React.SetStateAction<TypeMenu[]>>,
    menuElems: TypeMenu[],
  ): TypeAction[] => {
    const actions: TypeAction[] = [
      {
        id: "visible",
        icon: (menu && !menu?.visible) ? <InvisibleIcon /> : <VisibleIcon />,
        callback: async (action: TypeAction, config: TypeCollapseConfig) => {
          const payload = {
            title: config?.title,
            visible: !config?.visible,
            editable: config?.editable,
            deletable: config?.deletable,
          }
          const menuResponse = await axios.put<TypeMenu[]>('/api/menus/' + config.id, payload, options);

          setMenuElems([
            ...menuResponse.data.map((menu) => ({
              ...menu,
              id: menu._id,
              isEditing: false,
              actions: getActions(false, menu, setMenuElems, menuElems)
            })),
          ]);
        },
      }
    ];
    if (menu?.editable || !menu) {
      actions.push({
        id: "edit",
        icon: !isEditing ? <EditIcon /> : <DoneIcon />,
        callback: async (action: TypeAction, config: any, formValues: Object) => {
          if (!config.isEditing) {
            history.push('/admin/menu/' + config.id);
            action.icon = <DoneIcon />;
          } else {
            action.icon = <EditIcon />;
            Object.assign(config, formValues);
            if (!config.id) {
            //   console.log('update');
            //   const payload = {
            //     _id: config.id,
            //     title: config.title,
            //     visible: config.visible,
            //   }
            //   await axios.put<TypeMenu>('/api/menus/' + config.id, payload, options);
            // } else {
              console.log('create');
              const payload = {
                title: config.title,
                editable: config.editable,
                deletable: config.deletable,
                url: '',
                visible: config.visible,
              }
              const menuResponse = await axios.post<TypeMenu>('/api/menus', payload, options);
              setMenuElems(menuElems.concat([{
                ...menuResponse.data,
                id: menuResponse.data._id,    
                isEditing: false,
                actions: getActions(false, menu, setMenuElems, menuElems)
              }]));
            }
          }
        }
      });
    }
    if (menu?.deletable || !menu) {
      actions.push({
        id: "Delete",
        icon: <TrashIcon />,
        callback: async (action: TypeAction, config: TypeCollapseConfig) => {
          if (!config.id) {
            return;
          } 
          if (window.confirm(`Вы уверены, что хотите удалить меню №${config.id}`)) {
            const response = await axios.delete<TypeMenu[]>('/api/menus/' + config.id, options);
            setMenuElems(response.data.map((menu) => {
              menu.actions = getActions(false, menu, setMenuElems, menuElems);
              return menu;
            }));
          }
        },
      });
    }
    console.log(menu, actions);
    return actions;
  };

  const getMenuPageData = async () => {
    const menuElemsResponse = await axios.get<TypeMenu[]>('/api/menus');
    const newMenus = menuElemsResponse.data.map((menu) => ({
      ...menu,
      actions: getActions(false, menu, setMenuElems, menuElemsResponse.data),
    }));
    setMenuElems(newMenus);
  };

  const handleCreate = () => {
    setMenuElems(menuElems.concat([{
      title: '',
      isEditing: true,
      visible: true,
      editable: true,
      deletable: true,
      actions: getActions(
        true,
        null,
        setMenuElems,
        menuElems,
      ),
  }]));
  }

  useCheckRole(
    "У вас нет доступа к панели администратора, т.к. вы обычный пользователь!"
  );

  useEffect(() => {
    getMenuPageData();
  }, []);

  return (
    <>
      {
        menuElems.length ? <div className={styles["menu-page"]}>
          <div className={styles["menu-page__create-wrap"]}>
            <ButtonElem
              type={buttonElemType.Primary}
              htmlType="button"
              className={styles["menu-page__create-btn"]}
              onClick={handleCreate}
            >
              Добавить меню
            </ButtonElem>
          </div>
          <div className={styles["menu-page__items"]}>
            {menuElems.map((menuElem, index) => (
              <AdminCollapseElem className={menuElem.actions.length === 1 ? 'menu-elem-collapse' : ''} key={index} config={menuElem}>
                <Form.Item name="description">
                  <TextArea placeholder="Введите ответ" rows={1} />
                </Form.Item>
              </AdminCollapseElem>
            ))}
          </div>
        </div> 
        : <Loader />}
    </>
  );
}

export default memo(MenuPage);
