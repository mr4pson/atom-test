import axios from 'axios';
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import ExpansionSelectButton from 'components/uiKit/ExpansionSelectButton';
import { TypeExpansionOption } from 'components/uiKit/ExpansionSelectButton/types';
import { memo, useEffect, useState } from "react";
import { getQuestionActions, getQuestionOptionActions } from './helper';
import TestQuestionsOption from "./TestQuestionsOption/TestQuestionsOption";
import styles from "./TestQuestionsPage.module.scss";
import { QuestionOptionType, TypeTestQuestion } from './types';

function TestQuestionsPage(): JSX.Element {
    const [testQuestions, setTestQuestions] = useState<TypeTestQuestion[]>([]);

    const getQuestions = async () => {
        const questionsResponse = await axios.get<TypeTestQuestion[]>('/mocks/getTestPageQuestions.json');
        const questions = questionsResponse.data.map((question) => ({
            ...question,
            actions: getQuestionActions(false, setTestQuestions, testQuestions),
            // optionActions: getQuestionOptionActions(true, 1, setTestQuestions, []),
            options: question.options.map((option) => (
                {
                    ...option,
                    actions: getQuestionOptionActions(false, setTestQuestions, option.trueOption, [])
                }
            )),
            body: <div></div>
        }));
        setTestQuestions(questions);
    }

    useEffect(() => {
        getQuestions();
    }, []);

    const handleCreate = (type: QuestionOptionType) => {
        // TODO add http create request
        setTestQuestions(testQuestions.concat([{
            title: '',
            type: type,
            body: <div></div>,
            isEditing: true,
            collapseOn: 'edit',
            actions: getQuestionActions(true, setTestQuestions, testQuestions),
            options: [],
        }]));
    }

    const onOptionPick = (type: QuestionOptionType) => {
        handleCreate(type);
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
        <div className={styles['test-questions-page']}>
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
                            {question.options && <TestQuestionsOption config={question.options[0]} />}
                            {/* <Form.Item name="description">
                                <TextArea
                                    placeholder="Введите ответ"
                                    rows={1}
                                />
                            </Form.Item> */}
                        </AdminCollapseElem>
                    )
                )}
            </div>
        </div>
    );
}

export default memo(TestQuestionsPage);
