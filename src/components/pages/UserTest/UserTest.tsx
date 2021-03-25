import { Form, FormInstance } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import classNames from 'classnames';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from "components/modules/Navigation/constants";
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
import { ReactComponent as QuestionsInfoBg } from './../../../assets/images/user-test/questions-info-bg.svg';
import { getNextQuestionLink } from './helper';
import { questions } from './mocks';
import { UserTestProps } from './types';
import styles from './UserTest.module.scss';

function UserTest(props: UserTestProps): JSX.Element {
    const { questionNumber } = useParams() as any;
    const questionsNumber = questions.length;
    const questionIndex = questions.findIndex((question) => question.id === +questionNumber);
    const question = questions[questionIndex];
    const formRef = useRef<FormInstance>(null);
    const history = useHistory();
    const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        return () => {
            formRef.current?.resetFields();
            setNextButtonDisabled(true);
        }
    }, [props.answers])

    useEffect(() => {
        props.setStateIsTimerFinishedToState(false);
    }, [])

    const onFinish = () => {
        const formValue = formRef.current?.getFieldsValue();
        const answers = { ...props.answers, [question.id]: formValue.answer };
        props.setStateAnswersToState(answers);
        console.log(answers);

        if (+questionNumber === questionsNumber) {
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
    }

    console.log(props);
    return (
        <div className={styles['user-test']}>
            <div className="container">
                <Navigation navigationType={NavigationType.HEADER}/>
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
                        className={classNames(styles['user-test__stop-test'], styles['stop-test__btn'])}
                        type={buttonElemType.Primary}
                        htmlType={htmlType.SUBMIT}
                    >{userTest.buttons.stopTest}</ButtonElem>
                </div>
                <Navigation navigationType={NavigationType.FOOTER}/>
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
    { setStateAnswersToState, setStateIsTimerFinishedToState })(memo(UserTest))