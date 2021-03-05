import { userTest } from "i18n/userTest";
import { memo, useEffect, useState } from "react";
import { ReactComponent as TimerBg } from './../../../assets/images/user-test/timer-bg.svg';
import { getPadTime } from "./helper";
import { initialMinutes } from "./mocks";
import styles from './TestTimer.module.scss';
import { TypeTime } from "./types";

function TestTimer(): JSX.Element {
    const remainingMiliseconds = 60 * initialMinutes * 1000;
    const [countdown, setCountdown] = useState<number>(remainingMiliseconds);
    const [time, setTime] = useState<TypeTime>(getPadTime(countdown));
    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1000);
                setTime(getPadTime(countdown));
            }
            if (countdown === 0) {
                clearInterval(timer);
                setTime(getPadTime(countdown));
            }
        }, 1000)
        return () => {
            clearInterval(timer);
        };
    });
    return(
        <div className={styles['test-timer']}>
            <div className={styles['test-timer__bg']}>
                <TimerBg/>
                <div className={styles['test-timer__atom']}></div>
            </div>
            <div className={styles['test-timer__body']}>
                <div className={styles['test-timer__title']}>{userTest.testStartsIn}</div>
                <div className={styles['test-timer__time']}>{time.minutes}:{time.seconds}</div>
            </div>
        </div>
    );
}

export default memo(TestTimer);