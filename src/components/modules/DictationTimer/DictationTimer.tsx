import { memo } from "react";
import styles from './DictationTimer.module.scss';

function DictationTimer(): JSX.Element {
    return (
        <div className={styles['dictation-timer']}>
            <div className={styles['dictation-timer__avatar']}></div>
            <div className={styles['dictation-timer__footer']}>
                <div className={styles['dictation-timer__body']}>
                    <div className={styles['dictation-timer__days days']}>
                        <div className="days__value">363</div>
                        <div className="days__desc">Дней</div>
                    </div>
                    <div className={styles['dictation-timer__time']}>
                        <div className={styles['dictation-timer__period period']}>
                            <div className={styles['time__value']}>10</div>
                            <div className={styles['time__title']}>Часов</div>
                        </div>
                        <div className={styles['dictation-timer__delimiter dots']}>
                            <div className={styles['dots__top']}></div>
                            <div className={styles['dots__bottom']}></div>
                        </div>
                        <div className={styles['dictation-timer__period period']}>
                            <div className={styles['time__value']}>5</div>
                            <div className={styles['time__title']}>минут</div>
                        </div>
                        <div className={styles['dictation-timer__delimiter dots']}>
                            <div className={styles['dots__top']}></div>
                            <div className={styles['dots__bottom']}></div>
                        </div>
                        <div className={styles['dictation-timer__period period']}>
                            <div className={styles['time__value']}>58</div>
                            <div className={styles['time__title']}>секунд</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(DictationTimer);