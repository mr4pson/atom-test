import { chartOutlineIcon, clockIcon, listPlusIcon, menuIcon, newFileIcon, partnersIcon, questionMarkIcon, userIcon, userPlusIcon } from 'icons';
import styles from './AdminPage.module.scss';
import Icon from 'components/uiKit/Icon';

export const noteList = [
  {
    id: 'all',
    title: 'Все записи',
    value: 'all',
  },
  {
    id: '#1',
    title: 'Запись #1',
    value: 'note1',
  },
  {
    id: '#2',
    title: 'Запись #2',
    value: 'note2',
  }
]

export const data = [
  {
    key: '1',
    name: 'Новость 1',
    createdDate: '01.03.2021',
    heading: 'Заголовок 1',
  },
  {
    key: '2',
    name: 'Новость 2',
    createdDate: '02.03.2021',
    heading: 'Заголовок 2',
  },
  {
    key: '3',
    name: 'Название новости',
    createdDate: '03.03.2021',
    heading: 'Название рубрики',
  },
  {
    key: '4',
    name: 'Название новости',
    createdDate: '03.03.2021',
    heading: 'Название рубрики',
  },
  {
    key: '5',
    name: 'Название новости',
    createdDate: '03.03.2021',
    heading: 'Название рубрики',
  },
  {
    key: '6',
    name: 'Название новости',
    createdDate: '03.03.2021',
    heading: 'Название рубрики',
  },
  {
    key: '7',
    name: 'Название новости',
    createdDate: '03.03.2021',
    heading: 'Название рубрики',
  },
  {
    key: '8',
    name: 'Название новости',
    createdDate: '03.03.2021',
    heading: 'Название рубрики',
  },
  {
    key: '9',
    name: 'Название новости',
    createdDate: '03.03.2021',
    heading: 'Название рубрики',
  },
  {
    key: '10',
    name: 'Название новости',
    createdDate: '03.03.2021',
    heading: 'Название рубрики',
  },
];

export const menuItems = [
  {
    key: 'addChangeNew',
    title: 'Добавить/изменить новость',
    icon: <Icon
      className={styles['menu__icon']}
      path={newFileIcon.path}
      viewBox={newFileIcon.viewBox}
      title="AtomTest"
    />
  },
  {
    key: 'addChangeMenu',
    title: 'Добавить/изменить меню',
    icon: <Icon
      className={styles['menu__icon']}
      path={menuIcon.path}
      viewBox={menuIcon.viewBox}
      title="AtomTest"
    />
  },
  {
    key: 'testQuestions',
    title: 'Вопросы теста',
    icon: <Icon
      className={styles['menu__icon']}
      path={questionMarkIcon.path}
      viewBox={questionMarkIcon.viewBox}
      title="AtomTest"
    />
  },
  {
    key: 'partners',
    title: 'Партнёры',
    icon: <Icon
      className={styles['menu__icon']}
      path={partnersIcon.path}
      viewBox={partnersIcon.viewBox}
      title="AtomTest"
    />
  },
  {
    key: 'participantsList',
    title: 'Список участников',
    icon: <Icon
      className={styles['menu__icon']}
      path={userIcon.path}
      viewBox={userIcon.viewBox}
      title="AtomTest"
    />
  },
  {
    key: 'addProjectParticipant',
    title: 'Добавить лиц проекта',
    icon: <Icon
      className={styles['menu__icon']}
      path={userPlusIcon.path}
      viewBox={userPlusIcon.viewBox}
      title="AtomTest"
    />
  },
  {
    key: 'setCounterParametrs',
    title: 'Задать параметры счетчика',
    icon: <Icon
      className={styles['menu__icon']}
      path={clockIcon.path}
      viewBox={clockIcon.viewBox}
      title="AtomTest"
    />
  },
  {
    key: 'addChangeFAQ',
    title: 'Добавить/изменить FAQ',
    icon: <Icon
      className={styles['menu__icon']}
      path={listPlusIcon.path}
      viewBox={listPlusIcon.viewBox}
      title="AtomTest"
    />
  },
  {
    key: 'statistics',
    title: 'Статистика',
    icon: <Icon
      className={styles['menu__icon']}
      path={chartOutlineIcon.path}
      viewBox={chartOutlineIcon.viewBox}
      title="AtomTest"
    />
  },
]