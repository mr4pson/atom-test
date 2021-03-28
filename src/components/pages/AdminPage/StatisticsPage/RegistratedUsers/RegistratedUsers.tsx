import { memo, useEffect, useState } from 'react';
import styles from './RegistratedUsers.module.scss';
import DatePickerElem from 'components/uiKit/DatePickerElem/DatePickerElem';
import {
    Chart,
    Area,
    Point,
    Axis,
} from 'bizcharts';
import axios from 'axios';
import { getJwtPair } from 'components/pages/LoginPage/helpers';
import { scale } from './constants';
import moment from "moment";
import { months, TypeRegisteredUsers, TypeRegisteredUsersFormated } from './type';

function RegistratedUsers(): JSX.Element {
    const [registeredUsers, setRegisteredUsers] = useState<TypeRegisteredUsersFormated>();
    const initialDatePickerValue = { dateFrom: moment('01.01.2020').format('DD.MM.YY'), dateTo: moment().format('DD.MM.YY') };
    const curJwtPair: string = getJwtPair();
    const options = {
        headers: {
            'Authorization': `Bearer ${curJwtPair}`,
            'withCredentials': true
        },
    }
    const getRegisteredUsers = async (dateFrom: string, dateTo: string) => {
        const payload = {
            dateFrom,
            dateTo,
        }
        const response = await axios.get<TypeRegisteredUsers>('/api/statistics/registered-users', {
            ...options,
            params: payload
        });
        console.log(response.data);
        setRegisteredUsers({
            ...response.data,
            userStats: response.data.userStats.map((userStat) => ({
                value: userStat.total,
                year: months[userStat.month],
            }))
        });
    }
    const onValuesChange = (dates: moment.Moment[]) => {
        if (Array.isArray(dates)) {
            const [dateFrom, dateTo] = dates;
            getRegisteredUsers(dateFrom.format('DD.MM.YYYY'), dateTo.format('DD.MM.YYYY'));
        }
    };

    useEffect(() => {
        getRegisteredUsers(moment(initialDatePickerValue.dateFrom).format('DD.MM.YYYY'), moment().format('DD.MM.YYYY'));
    }, []);

    return (
        <div className={styles['registrated-users']}>
            <div className={styles['registrated-users__period']}>
                <DatePickerElem
                    initialValue={initialDatePickerValue}
                    onChange={onValuesChange}
                    placeholder="Период статистики"
                />
            </div>
            <div className={styles['registrated-users__features']}>
                <div className={styles['registrated-users__left']}>
                    <div className={styles['user-feature']}>
                        <span className={styles['user-feature__number']}>{registeredUsers?.weekNumber ? registeredUsers?.weekNumber : 0}</span>
                        <span className={styles['user-feature__label']}>На этой неделе</span>
                    </div>
                    <div className={styles['user-feature']}>
                        <span className={styles['user-feature__number']}>{registeredUsers?.monthNumber ? registeredUsers?.monthNumber : 0}</span>
                        <span className={styles['user-feature__label']}>За последний месяц</span>
                    </div>
                    <div className={styles['user-feature']}>
                        <span className={styles['user-feature__number']}>{registeredUsers?.allTimeNumber ? registeredUsers?.allTimeNumber : 0}</span>
                        <span className={styles['user-feature__label']}>За всё время</span>
                    </div>
                </div>
                <div className={styles['registrated-users__right']}>
                    <Chart scale={scale} height={160} data={registeredUsers?.userStats} autoFit>
                        <Area color="#0089ff" position="year*value" />
                        <Point
                            color="#5057b1"
                            position="year*value"
                            size={3}
                            shape="circle"
                        />
                        <Axis
                            name='year'
                            grid={{
                                line: {
                                    style: {
                                        stroke: '#e3e3e3'
                                    }
                                }
                            }}
                            label={{
                                style: {
                                    fontSize: 12,
                                    color: '#000',
                                }
                            }} />
                    </Chart>
                </div>
            </div>
        </div>
    );
}

export default memo(RegistratedUsers);