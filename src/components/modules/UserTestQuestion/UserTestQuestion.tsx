import { Checkbox, Form, Radio } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { QuestionType, TypeUserTestQuestion } from "components/pages/UserTest/types";
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType, htmlType } from "components/uiKit/ButtomElem/types";
import UserTestOption from 'components/uiKit/UserTestOption';
import { userTest } from "i18n/userTest";
import { memo, useEffect, useState } from "react";
import styles from './UserTestQuestion.module.scss';

type TypeUserTestQuestionProps = {
    question: TypeUserTestQuestion;
    nextButtonDisabled: boolean;
    onCheckboxGroupChange: (value: CheckboxValueType[]) => void;
}

function UserTestQuestion(props: TypeUserTestQuestionProps): JSX.Element {
    const onCheckboxGroupChange = (value: CheckboxValueType[]) => {
        props.onCheckboxGroupChange(value);
    }
    const [rerender, setRerender] = useState<boolean>(false);
    useEffect(() => {
        setRerender(true);
    });
    const onNextClick = () => {
        setRerender(false);
    }
    return (
        <>
            <div className={styles['user-test-question__title']}>{props.question.title}</div>
            <div className={styles['user-test-question__desc']}>{
                [QuestionType.SINGLE, QuestionType.SENGLE_PICTURE].includes(props.question.type) 
                    ? userTest.selectOneOption
                    : userTest.selectMultipleOptions
            }</div>
            {props.question.image &&
                <div className={styles['user-test-question__image-container']}>
                    <div
                        className={styles['user-test-question__image']}
                        style={{backgroundImage: 'url('+props.question.image+')'}}
                    ></div>
                </div>
            }
            <div className={styles['user-test-question__options']}>
                {[QuestionType.SINGLE, QuestionType.SENGLE_PICTURE].includes(props.question.type) && 
                    <Form.Item
                        name="answer"
                    >
                        <Radio.Group>
                            <div className={QuestionType.SENGLE_PICTURE === props.question.type ? styles['user-test-question__options-container'] : ''}>
                                {props.question.options.map((option, index) => (
                                    <UserTestOption
                                        key={index}
                                        type={props.question.type}
                                        value={option.value}
                                    >{option.title}</UserTestOption>)
                                )}
                            </div>
                        </Radio.Group>
                    </Form.Item>
                }
                {[QuestionType.MULTIPLE, QuestionType.MULTIPLE_PICTURE].includes(props.question.type) &&
                    <>
                        <Form.Item
                            name="answer"
                        ></Form.Item>

                        {rerender && <Checkbox.Group style={{ width: '100%' }} onChange={onCheckboxGroupChange}>
                            <div className={QuestionType.MULTIPLE_PICTURE === props.question.type ? styles['user-test-question__options-container'] : ''}>
                                {props.question.options.map((option, index) => (
                                    <UserTestOption
                                        key={index}
                                        type={props.question.type}
                                        value={option.value}
                                    >{option.title}</UserTestOption>)
                                )}
                            </div>
                        </Checkbox.Group>}
                    </>
            }
            </div>
            <ButtonElem
                onClick={onNextClick}
                className={styles['user-test-question__next-btn']}
                disabled={props.nextButtonDisabled}
                type={buttonElemType.Primary}
                htmlType={htmlType.SUBMIT}
            >{userTest.buttons.next}</ButtonElem>
        </>
    );
}

export default memo(UserTestQuestion);