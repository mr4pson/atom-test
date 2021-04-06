import axios from 'axios';
import { userTestComplete } from 'i18n/userTestComplete';
import { memo, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { getJwtPair } from '../LoginPage/helpers';
import { TypeUserTestQuestion } from '../UserTest/types';
import styles from './UserTestComplete.module.scss';
import { ReactComponent as InfoSheetSvg } from './../../../assets/images/user-test/info-sheet.svg';
import classNames from 'classnames';

type UserTestCompleteProps = {
    answers: Object;
    isTimerFinished: boolean;
}

function UserTest(props: UserTestCompleteProps): JSX.Element {
    const [questionsNumber, setQuestionsNumber] = useState<number>();

    const curJwtPair = getJwtPair();

    const getQuestions = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${await curJwtPair}`,
                'withCredentials': true
            },
        }
        const response = await axios.get<TypeUserTestQuestion[]>('/api/questions', options);
        const questions = response.data;
        setQuestionsNumber(questions.length);
    }

    useEffect(() => {
        getQuestions();
    }, []);

    // const answeredQuiestionsNumber = Object.keys(props.answers).length;
    // const quiestionsNumber = questionsNumber;
    return(
        <div className={styles['user-test-complete']}>
            <div className={classNames('container', styles['container'])}>
                <h1 className={styles['user-test-complete__title']}>Правильные ответы</h1>
                <div className={styles['user-test-complete__body']}>
                    
                </div>
                <div className={classNames(styles['user-test-complete__info-sheet'], styles['info-sheet'])}>
                    <InfoSheetSvg />
                    <div className="user-test-complete__info-sheet"></div>
                </div>
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