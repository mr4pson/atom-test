import axios from 'axios';
import { getUserInfo } from 'components/common/commonHelper';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import { userTestComplete } from 'i18n/userTestComplete';
import { memo, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { getJwtPair } from '../LoginPage/helpers';
import { TypeUserTestQuestion } from '../UserTest/types';
import styles from './UserTestComplete.module.scss';

type UserTestCompleteProps = {
    answers: Object;
    isTimerFinished: boolean;
}

function UserTest(props: UserTestCompleteProps): JSX.Element {
    const [questionsNumber, setQuestionsNumber] = useState<number>();

    const userInfo = getUserInfo();

    const curJwtPair: string = getJwtPair();
    const options = {
        headers: {
            'Authorization': `Bearer ${curJwtPair}`,
            'withCredentials': true
        },
    }

    const getQuestions = async () => {
        const response = await axios.get<TypeUserTestQuestion[]>('/api/questions', options);
        const questions = response.data;
        setQuestionsNumber(questions.length);
    }

    useEffect(() => {
        getQuestions();
    }, []);

    const answeredQuiestionsNumber = Object.keys(props.answers).length;
    const quiestionsNumber = questionsNumber;
    return(
        <div className={styles['user-test-complete']}>
            <div className="container">
                <Navigation userInfo={userInfo!} navigationType={NavigationType.HEADER}/>
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