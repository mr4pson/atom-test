import axios from 'axios';
import { useCheckRole } from 'components/hooks/useCheckRole';
import AdminModal from 'components/pages/AdminPage/AdminModal';
import { getJwtPair } from 'components/pages/LoginPage/helpers';
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import ButtonElem from 'components/uiKit/ButtomElem';
import ExpansionSelectButton from 'components/uiKit/ExpansionSelectButton';
import { TypeExpansionOption } from 'components/uiKit/ExpansionSelectButton/types';
import Loader from 'components/uiKit/Loader';
import { memo, useEffect, useRef, useState } from "react";
import { getQuestionActions, getQuestionOptionActions } from './helper';
import TestQuestionsOption from "./TestQuestionsOption/TestQuestionsOption";
import styles from "./TestQuestionsPage.module.scss";
import { QuestionOptionType, TypeTestQuestion, TypeTestQuestionOption } from './types';

function TestQuestionsPage(): JSX.Element {
    const [currentTest, setCurrentTest] = useState<TypeTestQuestion | null>(null);
    const [currentTestOption, setCurrentTestOption] = useState<TypeTestQuestionOption | null>(null);
    const [testQuestions, setTestQuestions] = useState<TypeTestQuestion[]>([]);
    const [rerender, setRerender] = useState<boolean>(true);
    const curJwtPair = getJwtPair();
    const inputFileRef = useRef({} as HTMLInputElement);

    const getQuestions = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${await curJwtPair}`,
                'withCredentials': true
            },
        }    
        const questionsResponse = await axios.get<TypeTestQuestion[]>('/api/questions', options);
        return questionsResponse.data.map((question) => ({
            ...question,
            collapseOn: 'edit',
        }));
    }

    function transformQuestionData(data: TypeTestQuestion[]) {
        const questions = data.map((question) => {
            question.actions = getQuestionActions(
                question.isEditing,
                setTestQuestions,
                question,
                setRerender,
                setCurrentTest,
                setCurrentTestOption
            );
            question.options = question.options.map((option) => (
                {
                    ...option,
                    actions: getQuestionOptionActions(
                        option.isEditing,
                        setTestQuestions,
                        option,
                        question,
                        setRerender,
                        setCurrentTestOption
                    )
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

    const handleCreate = (type: QuestionOptionType) => {
        // TODO add http create request
        setTestQuestions(testQuestions.concat([{
            title: '',
            type: type,
            body: <div></div>,
            isEditing: true,
            collapseOn: 'edit',
            actions: getQuestionActions(
                true,
                setTestQuestions,
                null,
                setRerender,
                setCurrentTest,
                setCurrentTestOption
            ),
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
            const curQuestion = questions.find(
                (curQuestion) => curQuestion.id === question.id
            ) as TypeTestQuestion;
            curQuestion.options.push({
                id: Math.round(Math.random() * 100),
                isEditing: true,
                title: '',
                trueOption: false,
                actions: getQuestionOptionActions(
                    true,
                    setTestQuestions,
                    null,
                    question,
                    setRerender,
                    setCurrentTestOption
                )
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

    const handleCancel = () => {
        setCurrentTest(null);
    }

    const handleUploadButtonClick = () => {
        inputFileRef.current.click();
    }

    const uploadFiles = async (files: FileList ) => {
        const formData = new FormData();
        formData.append("files", files[0]);
        return await axios.post('/api/attachments/addAttachments', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    const handleFileChange = async (event: React.FormEvent<HTMLInputElement>) => {
        setCurrentTest(null);
        const uploadFileResponse = await uploadFiles(event.currentTarget.files as FileList);
        const payload = {
            _id: currentTest?.id,
            options: currentTest?.options.map((option) => ({
                id: option.id,
                title: option.title,
                image: option.image,
                trueOption: option.trueOption,
            })),
            title: currentTest?.title,
            type: currentTest?.type,
            image: uploadFileResponse.data[0].fileName,
        }
        const options = {
            headers: {
                'Authorization': `Bearer ${await curJwtPair}`,
                'withCredentials': true
            },
        }
    
        await axios.put<TypeTestQuestion[]>('/api/questions/' + currentTest?.id, payload, options);

        const newTestQuestions = [...testQuestions];
        const currentTestQuestion = newTestQuestions.find(
            (question) => question.id === currentTest?.id
        ) as TypeTestQuestion;
        currentTestQuestion.image = uploadFileResponse.data[0].fileName;
        currentTestQuestion.actions = getQuestionActions(
            currentTestQuestion.isEditing,
            setTestQuestions,
            currentTestQuestion,
            setRerender,
            setCurrentTest,
            setCurrentTestOption
        );
        currentTestQuestion.options = currentTestQuestion.options.map((option) => (
            {
                ...option,
                actions: getQuestionOptionActions(
                    option.isEditing,
                    setTestQuestions,
                    option,
                    currentTestQuestion,
                    setRerender,
                    setCurrentTestOption
                )
            }
        ));
        setTestQuestions(newTestQuestions);
    }

    const handleOptionCancel = () => {
        setCurrentTestOption(null);
    }

    const handleOptionFileChange = async (event) => {
        let uploadFileResponse;
        try {
            uploadFileResponse = await uploadFiles(event.currentTarget.files as FileList);
        }
        catch {
            console.log('Error');

        }
        const currentTest = testQuestions.find(
            (question) => question.options.find(
                (option) => option.id === currentTestOption?.id
            )
        );
        const payload = {
            _id: currentTest?.id,
            options: currentTest?.options.map((option) => ({
                id: option.id,
                title: option.title,
                image: option.id === currentTestOption?.id ? uploadFileResponse.data[0].fileName : option.image,
                trueOption: option.trueOption,
            })),
            title: currentTest?.title,
            type: currentTest?.type,
            image: currentTest?.image,
        }
        try {
            const options = {
                headers: {
                    'Authorization': `Bearer ${await curJwtPair}`,
                    'withCredentials': true
                },
            }
        
            await axios.put<TypeTestQuestion>('/api/questions/' + currentTest?.id, payload, options);
        } catch {
            console.log('Error');
        }

        setCurrentTestOption(null);
        const newTestQuestions = [...testQuestions];
        const currentTestQuestion = newTestQuestions.find(
            (question) => question.options.find(
                (option) => option.id === currentTestOption?.id
            )
        ) as TypeTestQuestion;
        currentTestQuestion.actions = getQuestionActions(
            currentTestQuestion.isEditing,
            setTestQuestions,
            currentTestQuestion,
            setRerender,
            setCurrentTest,
            setCurrentTestOption
        );
        currentTestQuestion.options = currentTestQuestion.options.map((option) => {
            if (option.id === currentTestOption?.id) {
                option.image = uploadFileResponse.data[0].fileName;
            }
            return {
                ...option,
                actions: getQuestionOptionActions(
                    option.isEditing,
                    setTestQuestions,
                    option,
                    currentTestQuestion,
                    setRerender,
                    setCurrentTestOption
                )
            }
        });
        setTestQuestions(newTestQuestions);
    }
    useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

    useEffect(() => {
        getNewQuestions();
    }, []);

    return (
        <>
            {testQuestions.length || !rerender
                ? <div className={styles['test-questions-page']}>
                    <div className={styles['test-questions-page__create-wrap']}>
                        <ExpansionSelectButton
                            options={expansionOptions}
                            onOptionPick={onOptionPick}
                        >Добавить</ExpansionSelectButton>
                    </div>
                    <div className={styles['test-questions-page__questions']}>
                        {testQuestions.length ? 
                            testQuestions.map((question, index) => (
                                    <AdminCollapseElem
                                        key={index}
                                        config={question}
                                    >
                                        {question.options.map((option, index) => (
                                            <TestQuestionsOption
                                                key={index}
                                                config={option}
                                                type={question.type}
                                            />
                                        ))}
                                        <ButtonElem
                                            className={styles['test-questions-page__add-btn']}
                                            onClick={() => onOptionCreate(question)}
                                        >Добавить вариант ответа</ButtonElem>
                                    </AdminCollapseElem>
                                )
                            ) : 
                            <div className={styles['test-questions-page__empty-list']}>Список вопросов пуст</div>
                        }
                    </div>
                    {currentTest && <AdminModal
                        className={'attachment-modal'}
                        isModalVisible={!!currentTest}
                        handleCancel={handleCancel}
                    >
                        <input
                            hidden
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            ref={inputFileRef}
                        />
                        <ButtonElem onClick={handleUploadButtonClick}>Загрузить изображение</ButtonElem>
                    </AdminModal>}
                    {currentTestOption && <AdminModal
                        className={'attachment-modal'}
                        isModalVisible={!!currentTestOption}
                        handleCancel={handleOptionCancel}
                    >
                        <input
                            hidden
                            type="file"
                            name="file"
                            onChange={handleOptionFileChange}
                            ref={inputFileRef}
                        />
                        <ButtonElem onClick={handleUploadButtonClick}>Загрузить изображение</ButtonElem>
                    </AdminModal>}
                </div>
                : <Loader className={'admin-loader'} />
            }
        </>
    );
}

export default memo(TestQuestionsPage);
