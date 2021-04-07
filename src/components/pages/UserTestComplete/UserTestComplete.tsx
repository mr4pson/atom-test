import axios from 'axios';
import { userTestComplete } from 'i18n/userTestComplete';
import { memo, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { getJwtPair } from '../LoginPage/helpers';
import { QuestionType, TypeUserTestQuestion } from '../UserTest/types';
import styles from './UserTestComplete.module.scss';
import { ReactComponent as InfoSheetSvg } from './../../../assets/images/user-test/info-sheet.svg';
import { ReactComponent as TrueIcon } from '../../../assets/images/admin/circle-check.svg';
import { ReactComponent as FalseOption } from '../../../assets/images/user-test/false-option.svg';
import { ReactComponent as GoodCheck } from '../../../assets/images/user-test/good-check.svg';
import classNames from 'classnames';

type UserTestCompleteProps = {
    answers: Object;
    isTimerFinished: boolean;
}

function UserTest(props: UserTestCompleteProps): JSX.Element {
    // const [questionsNumber, setQuestionsNumber] = useState<number>();
    const [questions, setQuestions] = useState<TypeUserTestQuestion[]>([]);

    const curJwtPair = getJwtPair();

    const getQuestions = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${await curJwtPair}`,
                'withCredentials': true
            },
        }
        const response = await axios.get<TypeUserTestQuestion[]>('/api/questions', options);
        setQuestions(response.data);
        // const questions = response.data;
        // setQuestionsNumber(questions.length);
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
                    {questions.map((question, questionIndex) => (
                        <div key={questionIndex} className={styles['test-question']}>
                            <div className={styles['test-question__title']}>{question.title}</div>
                            <div className={styles['test-question__info']}>{question.type === ('CHECKBOX' as any) ? 'несколько вариантов ответа' : 'один вариант ответа'}</div>
                            <div className={styles['test-question__options']}>
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className={styles['test-option']}>
                                        <div className={styles['test-option__icon']}>
                                            {option.trueOption 
                                                ? <TrueIcon />
                                                : <FalseOption className={styles['false']}/>
                                            }
                                        </div>
                                        <div className={styles['test-option__title']}>{option.title}</div>
                                        <div className={styles['test-option__selection-icon']}>
                                            <GoodCheck />
                                        </div>
                                    </div>)
                                )}
                            </div>
                        </div>)
                    )}
                </div>
                <div className={classNames(styles['user-test-complete__info-sheet'], styles['info-sheet'])}>
                    <InfoSheetSvg />
                    <div className={styles['info-sheet__content']}>
                        <div className={styles['info-sheet__title']}>Определения</div>
                        <div className={styles['info-sheet__row']}>
                            <div className={styles['info-sheet__icon']}>
                                <FalseOption />
                            </div>
                            <span className={styles['info-sheet__name']}>Неправильный ответ</span>
                        </div>
                        <div className={styles['info-sheet__row']}>
                            <div className={styles['info-sheet__icon']}>
                                <TrueIcon />
                            </div>
                            <span className={styles['info-sheet__name']}>Правильный ответ</span>
                        </div>
                        <div className={styles['info-sheet__row']}>
                            <div className={styles['info-sheet__icon']}>
                                <GoodCheck />
                            </div>
                            <span className={styles['info-sheet__name']}>Ваш ответ</span>
                        </div>
                    </div>
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