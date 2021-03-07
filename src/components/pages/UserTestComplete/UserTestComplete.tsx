import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import { userTestComplete } from 'i18n/userTestComplete';
import { memo } from 'react';
import { connect } from "react-redux";
import { questions } from '../UserTest/mocks';
import styles from './UserTestComplete.module.scss';

type UserTestCompleteProps = {
    answers: Object;
    isTimerFinished: boolean;
}

function UserTest(props: UserTestCompleteProps): JSX.Element {
    const answeredQuiestionsNumber = Object.keys(props.answers).length;
    const quiestionsNumber = questions.length;
    return(
        <div className={styles['user-test-complete']}>
            <div className="container">
                <Navigation navigationType={NavigationType.HEADER}/>
                <div className={styles['user-test-complete__body']}>
                    <h1 className={styles['user-test-complete__title']}>{!props.isTimerFinished ? 
                        userTestComplete.successfulTitle :
                        userTestComplete.failedTitle
                    }</h1>
                    <div className={styles['user-test-complete__info']}>
                        {userTestComplete.questionsAnswered}: {answeredQuiestionsNumber} {userTestComplete.from} {quiestionsNumber}
                    </div>
                </div>
                <Navigation navigationType={NavigationType.FOOTER}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        answers: state.userTest?.answers,
        isTimerFinished: state.userTest?.isTimerFinished
    }
}

export default connect(mapStateToProps,
    { })(memo(UserTest))