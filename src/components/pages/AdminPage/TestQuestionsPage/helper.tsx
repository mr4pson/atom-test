
import { ReactComponent as DoneIcon } from '../../../../assets/images/admin/done.svg';
import { ReactComponent as EditIcon } from '../../../../assets/images/admin/edit.svg';
import { ReactComponent as TrueIcon } from '../../../../assets/images/admin/circle-check.svg';
import { ReactComponent as ImageIcon } from '../../../../assets/images/admin/image.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/images/admin/trash.svg';
import { TypeTestQuestion, TypeTestQuestionOption } from "./types";
import { TypeAction } from './TestQuestionsOption/types';
import { TypeCollapseConfig } from 'components/uiKit/AdminCollapse/types';
import axios from 'axios';
import { getJwtPair } from 'components/pages/LoginPage/helpers';

const curJwtPair: string = getJwtPair();
const options = {
    headers: {
        'Authorization': `Bearer ${curJwtPair}`,
        'withCredentials': true
    },
}

export const getQuestionActions = (
    isEditing: boolean = false,
    setTestQuestions: React.Dispatch<React.SetStateAction<TypeTestQuestion[]>>,
    testQuestions: TypeTestQuestion[],
    setRerender: React.Dispatch<React.SetStateAction<boolean>>,
): TypeAction[] => {
    return [
        {
            id: 'image',
            icon: <ImageIcon />,
            callback: (action: TypeAction, config: TypeCollapseConfig) => {
                console.log(config.data);
            },
        },
        {
            id: 'edit',
            icon: !isEditing ? <EditIcon /> : <DoneIcon />,
            callback: async (action: TypeAction, config: any, formValues: Object) => {
                config.isEditing = !config.isEditing;

                if (config.isEditing) {
                    action.icon = <DoneIcon />;
                } else {
                    action.icon = <EditIcon />;
                    Object.assign(config, formValues);
                    // TODO request to backend
                    if (config.id) {
                        console.log('update');
                        console.log(config);
                        const payload = {
                            _id: config.id,
                            options: config.options.map((option) => ({
                                id: option._id,
                                title: option.title,
                                image: option.image,
                                trueOption: option.trueOption,
                            })),
                            title: config.title,
                            type: config.type,
                            image: config.image,
                        }
                        const questionResponse = await axios.put<TypeTestQuestion>('/api/questions/' + config.id, payload, options);
                        console.log(questionResponse);
                        // questionResponse.data.m
                        // setTestQuestions();
                    } else {
                        console.log('create');
                        // TODO remove and replace with requested ID
                        // config.id = Math.round(Math.random() * 100);
                        const payload = {
                            options: config.options.map((option) => ({
                                id: option._id,
                                title: option.title,
                                image: option.image,
                                trueOption: option.trueOption,
                            })),
                            title: config.title,
                            type: config.type,
                            image: config.image,
                        }
                        const questionResponse = await axios.post<TypeTestQuestion[]>('/api/questions', payload, options);

                        const questions = questionResponse.data.map((question) => {
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
                        console.log(questions);
                    }
                    console.log(config);
                }
            },
        },
        {
            id: 'Delete',
            icon: <TrashIcon />,
            callback: (action: TypeAction, config: TypeCollapseConfig) => {
                if (!config.id) {
                    return;
                } 
                if (window.confirm(`Вы уверены, что хотите удалить вопрос №${config.id}`)) {
                    // TODO request to backend
                    axios.delete('/api/questions/' + config.id, options).then((response) => {
                        console.log(response.data);
                        setTestQuestions(response.data.map((question) => {
                            question.actions = getQuestionActions(question.isEditing, setTestQuestions, testQuestions, setRerender);
                            question.options = question.options.map((option) => (
                                {
                                    ...option,
                                    actions: getQuestionOptionActions(option.isEditing, setTestQuestions, option.trueOption, question, setRerender)
                                }
                            ));
                            question.body = <div></div>;
                            return question;
                        }));
                    });
                }
            },
        }
    ]
}

export const getQuestionOptionActions = (
    isEditing: boolean = false,
    setTestQuestions: React.Dispatch<React.SetStateAction<TypeTestQuestion[]>>,
    isTrueOption: boolean,
    question: TypeTestQuestion,
    setRerender: React.Dispatch<React.SetStateAction<boolean>>,
): TypeAction[] => {
    return [
        {
            id: 'image',
            icon: <ImageIcon />,
            callback: (action: TypeAction, config: TypeCollapseConfig) => {
                console.log(config);
            },
        },
        {
            id: 'edit',
            icon: !isEditing ? <EditIcon /> : <DoneIcon />,
            callback: (action: TypeAction, config: TypeCollapseConfig, formValues: Object) => {
                config.isEditing = !config.isEditing;

                if (config.isEditing) {
                    action.icon = <DoneIcon />;
                } else {
                    action.icon = <EditIcon />;
                    Object.assign(config, formValues);
                    // TODO request to backend
                    if (config.id) {
                        console.log('update');
                    } else {
                        console.log('create');
                        // TODO remove and replace with requested ID
                        config.id = Math.round(Math.random() * 100);
                    }
                    console.log(config);
                }
            },
        },
        {
            id: 'makeTrue',
            icon: isTrueOption ? <TrueIcon className="test-questions-option__action_active" /> : <TrueIcon />,
            callback: (action: TypeAction, config: any) => {
                setTestQuestions((prevStateQuestions) => {
                    const questions = [...prevStateQuestions];
                    const curQuestion = questions.find(curQuestion => curQuestion.id === question.id) as TypeTestQuestion;
                    const activeOption = curQuestion.options.find((option) => option.trueOption) as TypeTestQuestionOption;
                    if (activeOption) {
                        activeOption.trueOption = false;
                    }
                    action.icon = <TrueIcon className="test-questions-option__action_active" />;
                    config.trueOption = true;

                    return questions;
                });
                setRerender(true);
            },
        },
        {
            id: 'Delete',
            icon: <TrashIcon />,
            callback: (action: TypeAction, config: TypeCollapseConfig) => {
                if (!config.id) {
                    return;
                } 
                if (window.confirm(`Вы уверены, что хотите удалить вопрос №${config.id}`)) {
                    // TODO request to backend
                    setTestQuestions((prevStateQuestions) => {
                        const questions = [...prevStateQuestions];
                        const curQuestion = questions.find(curQuestion => curQuestion.id === question.id) as TypeTestQuestion;
                        curQuestion.options = curQuestion.options.filter(option => option.id !== config.id);

                        return questions;
                    });
                }
            },
        }
    ]
}