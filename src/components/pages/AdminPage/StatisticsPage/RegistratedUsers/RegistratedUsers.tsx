import { memo } from 'react';
import styles from './RegistratedUsers.module.scss';
import DatePickerElem from 'components/uiKit/DatePickerElem/DatePickerElem';
import classNames from 'classnames';
import {
    Chart,
    Area,
    Point,
    Axis,
    Geom
} from 'bizcharts';

function RegistratedUsers(): JSX.Element {
    const data = [
        { year: 'Декабрь', value: 0 },
        { year: 'Январь', value: 750 },
        { year: 'Февраль', value: 950 },
        { year: 'Март', value: 650 },
        { year: 'Апрель', value: 300 },
      ];
      
      const scale = {
        value: {
          min: 0,
          nice: true,
        },
        year: {
          range: [0, 1],
        },
      };
    return (
        <div className={styles['registrated-users']}>
            <div className={styles['registrated-users__period']}>
                <DatePickerElem />
            </div>
            <div className={styles['registrated-users__features']}>
                <div className={styles['registrated-users__left']}>
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
                <div className={styles['registrated-users__right']}>
                    <Chart scale={scale} height={160} data={data} autoFit>
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