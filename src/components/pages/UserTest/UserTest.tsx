import { Form, FormInstance } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import axios from 'axios';
import classNames from 'classnames';
import TestTimer from 'components/modules/TestTimer';
import UserTestQuestion from 'components/modules/UserTestQuestion';
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType, htmlType } from "components/uiKit/ButtomElem/types";
import { userTest } from 'i18n/userTest';
import { memo, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { setStateAnswersToState, setStateIsTimerFinishedToState } from 'redux/reducers/UserTest.reducer';
import { Page, paths } from 'routes/constants';
import { getJwtPair } from '../LoginPage/helpers';
import { ReactComponent as QuestionsInfoBg } from './../../../assets/images/user-test/questions-info-bg.svg';
import { getNextQuestionLink } from './helper';
import { QuestionType, TypeUserTestQuestion, UserTestProps } from './types';
import styles from './UserTest.module.scss';

function UserTest(props: UserTestProps): JSX.Element {
    const { questionNumber } = useParams() as any;
    const [questions, setQuestions] = useState<TypeUserTestQuestion[]>([]);
    const [question, setQuestion] = useState<TypeUserTestQuestion>();
    const [questionsNumber, setQuestionsNumber] = useState<number>();
    const formRef = useRef<FormInstance>(null);
    const history = useHistory();
    const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
    const [curCheckboxValue, setCurCheckboxValue] = useState<string[]>();

    const curJwtPair = getJwtPair();

    const getQuestions = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${await curJwtPair}`,
                'withCredentials': true
            },
        }
        const response = await axios.get<TypeUserTestQuestion[]>('/api/questions', options);
        const questions = response.data.map((question) => ({
            ...question,
            type: question.type === ('CHECKBOX' as QuestionType) && !question.options.find((option) => option.image) ? QuestionType.SINGLE :
            question.type === ('CHECKBOX' as QuestionType) && question.options.find((option) => option.image) ? QuestionType.SENGLE_PICTURE :
            question.type === ('RADIO' as QuestionType) && !question.options.find((option) => option.image) ? QuestionType.MULTIPLE :
            question.type === ('RADIO' as QuestionType) && question.options.find((option) => option.image) ? QuestionType.MULTIPLE_PICTURE : QuestionType.SINGLE,
        }));
        setQuestions(questions);
        setQuestionsNumber(questions.length);
        setQuestion(questions[questionNumber - 1]);
    }

    useEffect(() => {
        return () => {
            // formRef.current?.resetFields();
            setNextButtonDisabled(true);
        }
    }, [props.answers])

    useEffect(() => {
        props.setStateIsTimerFinishedToState(false);
        getQuestions();
    }, [])

    const onFinish = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${await curJwtPair}`,
                'withCredentials': true
            },
        }
        setQuestion(questions[questionNumber]);
        const formValue = formRef.current?.getFieldsValue();
        const answers = { ...props?.answers, [question?._id as string]: formValue?.answer ? formValue?.answer : curCheckboxValue };
        props.setStateAnswersToState(answers);
        console.log(answers);
        if (+questionNumber === questionsNumber) {
            const trueAnswersNumber = questions.reduce((accum, current) => {
                const curOption = current.options.find((option) => option._id === answers[current._id]);
                if (curOption?.trueOption)
                accum++;
                return accum;
            }, 0);
            const payload = {
                answers: JSON.stringify(JSON.stringify(answers)),
                percentage: Math.round((trueAnswersNumber / questionsNumber) * 100),
            };
            await axios.post('/api/answers', payload, options);
            history.push(paths[Page.USER_TEST_COMPLETE]);
            return;
        }

        history.push(getNextQuestionLink(questionNumber));
        formRef.current?.resetFields();
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onValuesChange = (e) => {
        setNextButtonDisabled(Array.isArray(e.answer) ? !!!e.answer.length : !!!e.answer);
    }

    const onCheckboxGroupChange = (value: CheckboxValueType[]) => {
        setNextButtonDisabled(Array.isArray(value) ? !!!value.length : !!!value);
        formRef.current?.setFieldsValue({
            answer: value,
        });
        setCurCheckboxValue(value as string[]);
    }

    const handleStopTest = () => {
        history.push(paths[Page.USER_TEST_COMPLETE]);
    }

    return (
        <div className={styles['user-test']}>
            {question && <div className="container">
                <div className={styles['user-test__body']}>
                    <div className={styles['user-test__left-col']}>
                        <Form
                            name="basic"
                            ref={formRef}
                            onValuesChange={onValuesChange}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <UserTestQuestion
                                question={question}
                                nextButtonDisabled={nextButtonDisabled}
                                onCheckboxGroupChange={onCheckboxGroupChange}
                            />
                        </Form>
                    </div>
                    <div className={classNames(styles['user-test__stop-test'], styles['stop-test-small'])}>
                        <ButtonElem
                            onClick={handleStopTest}
                            className={classNames(styles['user-test__stop-test'], styles['stop-test-small__btn'])}
                            type={buttonElemType.Primary}
                            htmlType={htmlType.SUBMIT}
                        >{userTest.buttons.stopTest}</ButtonElem>
                    </div>
                    <div className={styles['user-test__right-col']}>
                        <TestTimer/>
                        <div className={styles['questions-info']}>
                            <div className={styles['questions-info__bg']}>
                                <QuestionsInfoBg/>
                            </div>
                            <div className={styles['questions-info__body']}>{questionNumber}/{questionsNumber}</div>
                        </div>
                    </div>
                </div>
                <div className={classNames(styles['user-test__stop-test'], styles['stop-test'])}>
                    <ButtonElem
                        onClick={handleStopTest}
                        className={classNames(styles['user-test__stop-test'], styles['stop-test__btn'])}
                        type={buttonElemType.Primary}
                        htmlType={htmlType.SUBMIT}
                    >{userTest.buttons.stopTest}</ButtonElem>
                </div>
            </div>}
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        answers: state.userTest?.answers,
    }
}

export default connect(mapStateToProps,
    { setStateAnswersToState, setStateIsTimerFinishedToState })(memo(UserTest))