import { memo } from "react";
import Navigation from "components/modules/Navigation";
import { NavigationType } from "components/modules/Navigation/constants";
import styles from "./AdminPage.module.scss";
import { Menu } from "antd";
import classNames from "classnames";
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
import Icon from "components/uiKit/Icon";
import { useHistory } from "react-router";
import { Page, paths } from "./routes/constants";
import AppRoutes from "./routes/AppRoutes";

function AdminPage(): JSX.Element {
  const history = useHistory();

  const menuItems = [
    {
      key: "addChangeNew",
      title: "Добавить/изменить новость",
      icon: (
        <Icon
          className={styles["menu__icon"]}
          path={newFileIcon.path}
          viewBox={newFileIcon.viewBox}
          title="AtomTest"
        />
      ),
      onClick: () => {
        history.push(paths[Page.NEWS]);
      },
    },
    {
      key: "addChangeMenu",
      title: "Добавить/изменить меню",
      icon: (
        <Icon
          className={styles["menu__icon"]}
          path={menuIcon.path}
          viewBox={menuIcon.viewBox}
          title="AtomTest"
        />
      ),
      onClick: () => {
        history.push(paths[Page.MENU]);
      },
    },
    {
      key: "testQuestions",
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
        history.push("");
      },
    },
    {
      key: "partners",
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
        history.push("");
      },
    },
    {
      key: "participants",
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
        history.push(paths[Page.PARTICIPANTS]);
      },
    },
    {
      key: "addProjectParticipant",
      title: "Добавить лиц проекта",
      icon: (
        <Icon
          className={styles["menu__icon"]}
          path={userPlusIcon.path}
          viewBox={userPlusIcon.viewBox}
          title="AtomTest"
        />
      ),
      onClick: () => {
        history.push("");
      },
    },
    {
      key: "setCounterParametrs",
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
        history.push("");
      },
    },
    {
      key: "addChangeFAQ",
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
        history.push("");
      },
    },
    {
      key: "statistics",
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
        history.push(paths[Page.STATISTICS]);
      },
    },
  ];

  return (
    <div className="container">
      <Navigation navigationType={NavigationType.HEADER} />
      <div className={styles["admin-page"]}>
        <Menu
          className={classNames("menu", styles["menu"])}
          defaultSelectedKeys={[menuItems[0].key]}
          mode={"inline"}
          theme={"light"}
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