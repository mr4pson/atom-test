import { memo, useEffect, useState } from "react";
import styles from "./MenuPage.module.scss";
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import ButtonElem from "components/uiKit/ButtomElem";
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import { editIcon, trashIcon, unVisibleIcon, visibleIcon } from "icons";
import Icon from "components/uiKit/Icon";
import axios from "axios";
import { TypeAction } from "../TestQuestionsPage/TestQuestionsOption/types";
import { TypeMenu } from "./types";
import { useHistory } from "react-router";
import { Page, paths } from "../routes/constants";

function MenuPage(): JSX.Element {
  const [menuElems, setMenuElems] = useState<TypeMenu[]>([]);

  const getMenuPageData = async () => {
    const menuElemsResponse = await axios.get<TypeMenu[]>(
      "/mocks/getMenuPageData.json"
    );
    const menuItems = menuElemsResponse.data.map((menuItem) => ({
      ...menuItem,
      actions: getActions(menuItem)
    }));
    setMenuElems(menuItems);
  };

  const history = useHistory();

  const getActions = (itemData: TypeMenu): TypeAction[] => {
    return [
      {
        id: "watch",
        icon: itemData.visible ? (
          <Icon
            className={styles["action-icon__watch"]}
            path={visibleIcon.path}
            viewBox={visibleIcon.viewBox}
          />
        ) : (
          <Icon
            className={styles["action-icon__delete"]}
            path={unVisibleIcon.path}
            viewBox={unVisibleIcon.viewBox}
          />
        ),
        callback: (action: TypeAction, config: any, formValues: Object) => {
          console.log(config);
          config.visible = !config.visible;
          action.icon = config.visible ? (
            <Icon
              className={styles["action-icon__watch"]}
              path={visibleIcon.path}
              viewBox={visibleIcon.viewBox}
            />
          ) : (
            <Icon
              className={styles["action-icon__delete"]}
              path={unVisibleIcon.path}
              viewBox={unVisibleIcon.viewBox}
            />
          );
        },
      },
      {
        id: "edit",
        icon: (
          <Icon
            className={styles["action-icon__edit"]}
            path={editIcon.path}
            viewBox={editIcon.viewBox}
          />
        ),
        callback: () => redirectToEditPage(itemData),
      },
      {
        id: "delete",
        icon: (
          <Icon
            className={styles["action-icon__delete"]}
            path={trashIcon.path}
            viewBox={trashIcon.viewBox}
          />
        ),
        callback: () =>  {
          // showModal(itemData)
        },
      },
    ];
  };

  const redirectToEditPage = (itemData: TypeMenu) => {
    history.push(`${paths[Page.MENU]}/${itemData.id}`)
  };

  useEffect(() => {
    getMenuPageData();
  }, []);

  return (
    <div className={styles["menu-page"]}>
      <div className={styles["menu-page__create-wrap"]}>
        <ButtonElem
          type={buttonElemType.Primary}
          htmlType="button"
          className={styles["menu-page__create-btn"]}
          onClick={() => {}}
        >
          Добавить меню
        </ButtonElem>
      </div>
      <div className={styles["menu-page__items"]}>
        {menuElems.map((menuElem, index) => (
          <AdminCollapseElem key={index} config={menuElem}> </AdminCollapseElem>
        ))}
      </div>
    </div>
  );
}

export default memo(MenuPage);
