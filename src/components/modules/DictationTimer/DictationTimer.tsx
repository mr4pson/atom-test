import classNames from 'classnames';
import { memo, useEffect, useState } from "react";
import styles from './DictationTimer.module.scss';
import { getPadTime, getRemainingSeconds, getTimeObjectFromSeconds } from './helper';
import { i18n } from './i18n';
import { TypeTime } from "./types";

type Props = {
    dictantDateString: string;
}

function DictationTimer(props: Props): JSX.Element {
    const seconds = getRemainingSeconds(props.dictantDateString);
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
                        <div className={styles['days__title']}>{i18n.days}</div>
                    </div>
                    <div className={styles['dictation-timer__time']}>
                        <div className={classNames(styles['dictation-timer__period'], styles['period'])}>
                            <div className={styles['period__value']}>{remainingTime.hours}</div>
                            <div className={styles['period__title']}>{i18n.hours}</div>
                        </div>
                        <div className={classNames(styles['dictation-timer__delimiter'], styles['dots'])}>
                            <div className={classNames(styles['dot'], styles['dot__top'])}></div>
                            <div className={classNames(styles['dot'], styles['dot__bottom'])}></div>
                        </div>
                        <div className={classNames(styles['dictation-timer__period'], styles['period'])}>
                            <div className={styles['period__value']}>{remainingTime.minutes}</div>
                            <div className={styles['period__title']}>{i18n.minutes}</div>
                        </div>
                        <div className={classNames(styles['dictation-timer__delimiter'], styles['dots'])}>
                            <div className={classNames(styles['dot'], styles['dot__top'])}></div>
                            <div className={classNames(styles['dot'], styles['dot__bottom'])}></div>
                        </div>
                        <div className={classNames(styles['dictation-timer__period'], styles['period'])}>
                            <div className={styles['period__value']}>{remainingTime.seconds}</div>
                            <div className={styles['period__title']}>{i18n.seconds}</div>
                        </div>
                    </div>
                </div>
                <div className={styles['dictation-timer__title']}>{i18n.beforeStart}</div>
            </div>
        </div>
    );
}

export default memo(DictationTimer);