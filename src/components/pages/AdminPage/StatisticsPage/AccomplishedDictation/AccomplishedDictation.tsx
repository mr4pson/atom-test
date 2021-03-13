import { memo } from 'react';
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
    const userData = [
        { type: '40%', value: 40 },
        { type: '60%', value: 60 },
    ];
    const userDv = new DataView();
    userDv.source(userData).transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        as: 'percent',
    });
    return (
        <div className={styles['accomplished-dictation']}>
            <div className={styles['accomplished-dictation__period']}>
                <DatePickerElem />
            </div>
            <div className={styles['accomplished-dictation__features']}>
                <div className={styles['accomplished-dictation__left']}>
                    <div className={styles['user-feature']}>
                        <span className={styles['user-feature__number']}>452</span>
                        <span className={styles['user-feature__label']}>На этой неделе</span>
                    </div>
                    <div className={styles['user-feature']}>
                        <span className={styles['user-feature__number']}>652</span>
                        <span className={styles['user-feature__label']}>За последний месяц</span>
                    </div>
                    <div className={styles['user-feature']}>
                        <span className={styles['user-feature__number']}>8000</span>
                        <span className={styles['user-feature__label']}>За всё время</span>
                    </div>
                </div>
                <div className={styles['accomplished-dictation__right']}>
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
                </div>
            </div>
        </div>
    );
}

export default memo(AccomplishedDictation);