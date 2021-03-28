import axios from 'axios';
import { getJwtPair } from 'components/pages/LoginPage/helpers';
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import ButtonElem from 'components/uiKit/ButtomElem';
import ExpansionSelectButton from 'components/uiKit/ExpansionSelectButton';
import { TypeExpansionOption } from 'components/uiKit/ExpansionSelectButton/types';
import { memo, useEffect, useState } from "react";
import { getQuestionActions, getQuestionOptionActions } from './helper';
import TestQuestionsOption from "./TestQuestionsOption/TestQuestionsOption";
import styles from "./TestQuestionsPage.module.scss";
import { QuestionOptionType, TypeTestQuestion } from './types';
import Loader from 'components/uiKit/Loader';

function TestQuestionsPage(): JSX.Element {
    const [testQuestions, setTestQuestions] = useState<TypeTestQuestion[]>([]);
    const [rerender, setRerender] = useState<boolean>(true);
    const curJwtPair: string = getJwtPair();
    const options = {
        headers: {
            'Authorization': `Bearer ${curJwtPair}`,
            'withCredentials': true
        },
    }

    const getQuestions = async () => {
        const questionsResponse = await axios.get<TypeTestQuestion[]>('/api/questions', options);
        return questionsResponse.data.map((question) => ({
            ...question,
            collapseOn: 'edit',
        }));
    }

    function transformQuestionData(data: TypeTestQuestion[]) {
        const questions = data.map((question) => {
            question.actions = getQuestionActions(question.isEditing, setTestQuestions, testQuestions, setRerender);
            question.options = question.options.map((option) => (
                {
                    ...option,
                    actions: getQuestionOptionActions(option.isEditing, setTestQuestions, option.trueOption, question, setRerender)
                }
            ));
            question.body = <div></div>;
            return question;
        });
        setTestQuestions(questions);
        setRerender(false);
    }

    const getNewQuestions = async () => {
        let questions;
        if (testQuestions.length === 0) {
            questions = await getQuestions();
        } else {
            questions = testQuestions;
        }
        if (rerender) {
            transformQuestionData(questions);
        }
    }

    useEffect(() => {
        getNewQuestions();
    })

    const handleCreate = (type: QuestionOptionType) => {
        // TODO add http create request
        setTestQuestions(testQuestions.concat([{
            title: '',
            type: type,
            body: <div></div>,
            isEditing: true,
            collapseOn: 'edit',
            actions: getQuestionActions(true, setTestQuestions, testQuestions, setRerender),
            options: [],
        }]));
    }

    const onOptionPick = (type: QuestionOptionType) => {
        handleCreate(type);
    }

    const onOptionCreate = (question: TypeTestQuestion) => {
        setTestQuestions((prevStateQuestions) => {
            question.options.push();
            const questions = [...prevStateQuestions];
            const curQuestion = questions.find((curQuestion) => curQuestion.id === question.id) as TypeTestQuestion;
            curQuestion.options.push({
                id: Math.round(Math.random() * 100),
                isEditing: true,
                title: '',
                trueOption: false,
                actions: getQuestionOptionActions(true, setTestQuestions, false, question, setRerender)
            });

            return questions;
        });
    }

    const expansionOptions: TypeExpansionOption[] = [
        {
            title: 'Checkbox',
            value: QuestionOptionType.CHECKBOX
        },
        {
            title: 'Radio',
            value: QuestionOptionType.RADIO
        }
    ];
    return (
        <>
            {
                testQuestions.length ? <div className={styles['test-questions-page']}>
                    <div className={styles['test-questions-page__create-wrap']}>
                        <ExpansionSelectButton
                            options={expansionOptions}
                            onOptionPick={onOptionPick}
                        >Добавить</ExpansionSelectButton>
                    </div>
                    <div className={styles['test-questions-page__questions']}>
                        {testQuestions.map((question, index) => (
                            <AdminCollapseElem
                                key={index}
                                config={question}
                            >
                                {question.options.map((option, index) => (
                                    <TestQuestionsOption
                                        key={index}
                                        config={option}
                                    />
                                ))}
                                <ButtonElem
                                    className={styles['test-questions-page__add-btn']}
                                    onClick={() => onOptionCreate(question)}
                                >Добавить вариант ответа</ButtonElem>
                            </AdminCollapseElem>
                        )
                        )}
                    </div>
                </div> : <Loader />
            }
        </>
    );
}

export default memo(TestQuestionsPage);
