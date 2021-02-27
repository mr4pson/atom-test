import classNames from 'classnames';
import { memo, useEffect, useState } from "react";
import styles from './DictationTimer.module.scss';
import { getPadTime, getRemainingSeconds, getTimeObjectFromSeconds, pad } from './helper';
import { TypeTime } from "./types";

function DictationTimer(): JSX.Element {
    const dictantDateString: string = '2021-03-10T10:00:00.000Z';
    const seconds = getRemainingSeconds(dictantDateString);
    const time = getTimeObjectFromSeconds(seconds);
    const [remainingTime, setTime] = useState<TypeTime>(getPadTime(time));
    useEffect(() => {
        const timer = () => {
            const time = getTimeObjectFromSeconds(seconds);
            setTime(getPadTime(time));
        }
        if (seconds === 0) {
            return;
        }
        setTimeout(timer, 1000);
    });

    return (
        <div className={styles['dictation-timer']}>
            <div className={styles['dictation-timer__avatar']}></div>
            <div className={styles['dictation-timer__footer']}>
                <div className={styles['dictation-timer__body']}>
                    <div className={classNames(styles['dictation-timer__days'], styles['days'])}>
                        <div className={styles['days__value']}>{remainingTime.days}</div>
                        <div className={styles['days__title']}>Дней</div>
                    </div>
                    <div className={styles['dictation-timer__time']}>
                        <div className={classNames(styles['dictation-timer__period'], styles['period'])}>
                            <div className={styles['period__value']}>{remainingTime.hours}</div>
                            <div className={styles['period__title']}>Часов</div>
                        </div>
                        <div className={classNames(styles['dictation-timer__delimiter'], styles['dots'])}>
                            <div className={classNames(styles['dot'], styles['dot__top'])}></div>
                            <div className={classNames(styles['dot'], styles['dot__bottom'])}></div>
                        </div>
                        <div className={classNames(styles['dictation-timer__period'], styles['period'])}>
                            <div className={styles['period__value']}>{remainingTime.minutes}</div>
                            <div className={styles['period__title']}>минут</div>
                        </div>
                        <div className={classNames(styles['dictation-timer__delimiter'], styles['dots'])}>
                            <div className={classNames(styles['dot'], styles['dot__top'])}></div>
                            <div className={classNames(styles['dot'], styles['dot__bottom'])}></div>
                        </div>
                        <div className={classNames(styles['dictation-timer__period'], styles['period'])}>
                            <div className={styles['period__value']}>{remainingTime.seconds}</div>
                            <div className={styles['period__title']}>секунд</div>
                        </div>
                    </div>
                </div>
                <div className={styles['dictation-timer__title']}>До начала диктанта</div>
            </div>
        </div>
    );
}

export default memo(DictationTimer);