import { userTest } from "i18n/userTest";
import { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { setStateIsTimerFinishedToState } from 'redux/reducers/UserTest.reducer';
import { Page, paths } from "routes/constants";
import { ReactComponent as TimerBg } from './../../../assets/images/user-test/timer-bg.svg';
import { getPadTime } from "./helper";
import { initialMinutes } from "./mocks";
import styles from './TestTimer.module.scss';
import { TypeTime } from "./types";

type TestTimerProps = {
    setStateIsTimerFinishedToState: (arg: boolean) => void
}

function TestTimer(props: TestTimerProps): JSX.Element {
    const remainingMiliseconds = 60 * initialMinutes * 1000;
    const [countdown, setCountdown] = useState<number>(remainingMiliseconds);
    const [time, setTime] = useState<TypeTime>(getPadTime(countdown));
    const history = useHistory();
    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1000);
                setTime(getPadTime(countdown));
            }
            if (countdown === 0) {
                props.setStateIsTimerFinishedToState(true);
                clearInterval(timer);
                setTime(getPadTime(countdown));
                history.push(paths[Page.USER_TEST_COMPLETE]);
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

const mapStateToProps = (state: any) => {
    return {
        answers: state.userTest?.answers,
    }
}

export default connect(mapStateToProps,
    { setStateIsTimerFinishedToState })(memo(TestTimer));