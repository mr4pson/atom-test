import { Menu } from "antd";
import classNames from "classnames";
import Navigation from "components/modules/Navigation";
import { NavigationType } from "components/modules/Navigation/constants";
import Icon from "components/uiKit/Icon";
import {
  chartOutlineIcon,
  clockIcon,
  listPlusIcon,
  menuIcon,
  newFileIcon,
  partnersIcon,
  questionMarkIcon,
  userIcon,
  userPlusIcon,
} from "icons";
import { memo } from "react";
import { useHistory, useLocation } from "react-router";
import styles from "./AdminPage.module.scss";
import AppRoutes from "./routes/AppRoutes";
import { AdminsPage, paths } from "./routes/constants";

function AdminPage(): JSX.Element {
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      key: paths[AdminsPage.NEWS],
      title: "Добавить/изменить страницу",
      icon: (
        <Icon
          className={styles["menu__icon"]}
          path={newFileIcon.path}
          viewBox={newFileIcon.viewBox}
          title="AtomTest"
        />
      ),
      onClick: () => {
        history.push(paths[AdminsPage.NEWS]);
      },
    },
    {
      key: paths[AdminsPage.MENU],
      title: "Добавить/изменить категорию",
      icon: (
        <Icon
          className={styles["menu__icon"]}
          path={menuIcon.path}
          viewBox={menuIcon.viewBox}
          title="AtomTest"
        />
      ),
      onClick: () => {
        history.push(paths[AdminsPage.MENU]);
      },
    },
    {
      key: paths[AdminsPage.TEST_QUESTUIONS],
      title: "Вопросы теста",
      icon: (
        <Icon
          className={styles["menu__icon"]}
          path={questionMarkIcon.path}
          viewBox={questionMarkIcon.viewBox}
          title="AtomTest"
        />
      ),
      onClick: () => {
        history.push(paths[AdminsPage.TEST_QUESTUIONS]);
      },
    },
    {
      key: paths[AdminsPage.PARTNERS],
      title: "Партнёры",
      icon: (
        <Icon
          className={styles["menu__icon"]}
          path={partnersIcon.path}
          viewBox={partnersIcon.viewBox}
          title="AtomTest"
        />
      ),
      onClick: () => {
        history.push(paths[AdminsPage.PARTNERS]);
      },
    },
    {
      key: paths[AdminsPage.PARTICIPANTS],
      title: "Список участников",
      icon: (
        <Icon
          className={styles["menu__icon"]}
          path={userIcon.path}
          viewBox={userIcon.viewBox}
          title="AtomTest"
        />
      ),
      onClick: () => {
        history.push(paths[AdminsPage.PARTICIPANTS]);
      },
    },
    {
      key: paths[AdminsPage.COUNTER],
      title: "Задать параметры счетчика",
      icon: (
        <Icon
          className={styles["menu__icon"]}
          path={clockIcon.path}
          viewBox={clockIcon.viewBox}
          title="AtomTest"
        />
      ),
      onClick: () => {
        history.push(paths[AdminsPage.COUNTER]);
      },
    },
    {
      key: paths[AdminsPage.FAQ],
      title: "Добавить/изменить FAQ",
      icon: (
        <Icon
          className={styles["menu__icon"]}
          path={listPlusIcon.path}
          viewBox={listPlusIcon.viewBox}
          title="AtomTest"
        />
      ),
      onClick: () => {
        history.push(paths[AdminsPage.FAQ]);
      },
    },
    {
      key: paths[AdminsPage.STATISTICS],
      title: "Статистика",
      icon: (
        <Icon
          className={styles["menu__icon"]}
          path={chartOutlineIcon.path}
          viewBox={chartOutlineIcon.viewBox}
          title="AtomTest"
        />
      ),
      onClick: () => {
        history.push(paths[AdminsPage.STATISTICS]);
      },
    },
  ];

  return (
    <div className="container">
      <div className={styles["admin-page"]}>
        <Menu
          className={classNames("menu", styles["menu"])}
          defaultSelectedKeys={[
            location.pathname === "/admin" ||
            location.pathname === paths[AdminsPage.NEWS_CREATE] ||
            location.pathname.includes(paths[AdminsPage.NEWS_EDIT])
              ? paths[AdminsPage.NEWS]
              : location.pathname === paths[AdminsPage.ADD_PARTNER] ||
                location.pathname.includes(paths[AdminsPage.EDIT_PARTNER])
              ? paths[AdminsPage.PARTNERS]
              : location.pathname,
          ]}
          mode="inline"
          theme="light"
        >
          {menuItems.map((item) => {
            return (
              <Menu.Item
                className={styles["menu__item"]}
                key={item.key}
                icon={item.icon}
                onClick={item.onClick}
              >
                {item.title}
              </Menu.Item>
            );
          })}
        </Menu>
        <AppRoutes />
      </div>
    </div>
  );
}

export default memo(AdminPage);
