import { memo, useEffect, useState } from 'react';
import styles from './AccomplishedDictation.module.scss';
import {
    Chart,
    Interval,
    Coordinate,
    Legend,
    View,
    registerShape,
} from "bizcharts";
import DatePickerElem from 'components/uiKit/DatePickerElem/DatePickerElem';
import DataSet from "@antv/data-set";
import axios from 'axios';
import { TypePassedDictation } from './type';
import moment from 'moment';
import { getJwtPair } from 'components/pages/LoginPage/helpers';

const registerShapeNew = registerShape as any;

const sliceNumber = 0.003;
registerShapeNew("interval", "sliceShape", {
    draw(cfg, container) {
        const points = cfg.points as any[];
        let path: any[] = [];
        path.push(["M", points[0].x, points[0].y]);
        path.push(["L", points[1].x, points[1].y - sliceNumber]);
        path.push(["L", points[2].x, points[2].y - sliceNumber]);
        path.push(["L", points[3].x, points[3].y]);
        path.push("Z");
        path = this.parsePath(path);
        return container.addShape("path", {
            attrs: {
                fill: cfg.color,
                path: path
            }
        });
    }
});

function AccomplishedDictation(): JSX.Element {
    const { DataView } = DataSet;
    const [passedDictation, setPassedDictation] = useState<TypePassedDictation>();
    const [userDv, setUserDv] = useState<any>();
    const initialDatePickerValue = { dateFrom: moment('01.01.2020').format('DD.MM.YY'), dateTo: moment().format('DD.MM.YY') };
    const curJwtPair = getJwtPair();

    const getPassedDictation = async (dateFrom: string, dateTo: string) => {
        const payload = {
            dateFrom,
            dateTo,
        }
        const options = {
            headers: {
                'Authorization': `Bearer ${await curJwtPair}`,
                'withCredentials': true
            },
        };
        const response = await axios.get<TypePassedDictation>('/api/statistics/passed-dictation', {
            ...options,
            params: payload
        });
        setPassedDictation({
            ...response.data
        });
        const passedDictationNumber = Math.round(response.data.passedDictation / (response.data.notPassedDictation + response.data.passedDictation) * 100);
        const notPassedDictation = 100 - passedDictationNumber;
        const userData = [
            { type: passedDictationNumber + '%', value: passedDictationNumber },
            { type: notPassedDictation + '.0%', value: notPassedDictation },
        ];
        
        const userDv = new DataView();
        userDv.source(userData).transform({
            type: 'percent',
            field: 'value',
            dimension: 'type',
            as: 'percent',
        });
        setUserDv(userDv);
    };

    const onValuesChange = (dates: moment.Moment[]) => {
        if (Array.isArray(dates)) {
            const [dateFrom, dateTo] = dates;
            getPassedDictation(dateFrom.format('DD.MM.YYYY'), dateTo.format('DD.MM.YYYY'));
        }
    };

    useEffect(() => {
        getPassedDictation(moment(initialDatePickerValue.dateFrom).format('DD.MM.YYYY'), moment().format('DD.MM.YYYY'));
    }, []);

    return (
        <div className={styles['accomplished-dictation']}>
            <div className={styles['accomplished-dictation__period']}>
                <DatePickerElem
                    initialValue={initialDatePickerValue}
                    onChange={onValuesChange}
                    placeholder="Период статистики"
                />
            </div>
            <div className={styles['accomplished-dictation__features']}>
                <div className={styles['accomplished-dictation__left']}>
                    <div className={styles['user-feature']}>
                        <span className={styles['user-feature__number']}>{passedDictation?.weekNumber ? passedDictation?.weekNumber : 0}</span>
                        <span className={styles['user-feature__label']}>На этой неделе</span>
                    </div>
                    <div className={styles['user-feature']}>
                        <span className={styles['user-feature__number']}>{passedDictation?.monthNumber ? passedDictation?.monthNumber : 0}</span>
                        <span className={styles['user-feature__label']}>За последний месяц</span>
                    </div>
                    <div className={styles['user-feature']}>
                        <span className={styles['user-feature__number']}>{passedDictation?.allTimeNumber ? passedDictation?.allTimeNumber : 0}</span>
                        <span className={styles['user-feature__label']}>За всё время</span>
                    </div>
                </div>
                {userDv && <div className={styles['accomplished-dictation__right']}>
                    <Chart placeholder={false} height={200} padding={10} autoFit>
                        <Legend visible={false} />
                        <View data={userDv.rows} scale={{
                            percent: {
                                formatter: (val) => {
                                    return (val * 100).toFixed(2) + '%';
                                },
                            }
                        }}>
                            <Coordinate type="theta" innerRadius={0.7} />
                            <Interval
                                position="percent"
                                adjust="stack"
                                color={["type", ['#61a6ff', '#abcdf9']]}
                                shape="sliceShape"
                                label={['type', { offset: 20, style: { fontSize: 14, fontWeight: 'bold' } }]}
                            />
                        </View>
                    </Chart>
                </div>}
            </div>
        </div>
    );
}

export default memo(AccomplishedDictation);