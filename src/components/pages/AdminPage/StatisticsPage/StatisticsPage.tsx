import { Tabs } from 'antd';
import { useCheckRole } from 'components/hooks/useCheckRole';
import AccomplishedDictation from "components/pages/AdminPage/StatisticsPage/AccomplishedDictation";
import RegistratedUsers from "components/pages/AdminPage/StatisticsPage/RegistratedUsers";
import { memo, ReactNode } from 'react';
import styles from './StatisticsPage.module.scss';

type TypeTabPane = {
    title: string;
    content: ReactNode;
}

function StatisticsPage(): JSX.Element {

    const { TabPane } = Tabs;
    const tabs: TypeTabPane[] = [
        {
            title: 'Зарегистрированные пользователи',
            content: <RegistratedUsers />
        },
        {
            title: 'Прошли диктант',
            content: <AccomplishedDictation />
        }
    ]

    useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

    return (
        <div className={styles['statistics-page']}>
            <Tabs className="statistics-tabs">
                {tabs.map((tab, index) => (
                    <TabPane tab={tab.title} key={index}>
                        {tab.content}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
}

export default memo(StatisticsPage);
