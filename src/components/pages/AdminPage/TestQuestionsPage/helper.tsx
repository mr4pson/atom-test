
import { ReactComponent as DoneIcon } from '../../../../assets/images/admin/done.svg';
import { ReactComponent as EditIcon } from '../../../../assets/images/admin/edit.svg';
import { ReactComponent as TrueIcon } from '../../../../assets/images/admin/circle-check.svg';
import { ReactComponent as ImageIcon } from '../../../../assets/images/admin/image.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/images/admin/trash.svg';
import { TypeTestQuestion, TypeTestQuestionOption } from "./types";
import styles from "./TestQuestionsPage.module.scss";
import { TypeAction } from './TestQuestionsOption/types';
import { TypeCollapseConfig } from 'components/uiKit/AdminCollapse/types';

export const getQuestionActions = (
    isEditing: boolean = false,
    setTestQuestions: React.Dispatch<React.SetStateAction<TypeTestQuestion[]>>,
    testQuestions: TypeTestQuestion[]
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
            id: 'Delete',
            icon: <TrashIcon />,
            callback: (action: TypeAction, config: TypeCollapseConfig) => {
                if (!config.id) {
                    return;
                } 
                if (window.confirm(`Вы уверены, что хотите удалить вопрос №${config.id}`)) {
                    // TODO request to backend
                    setTestQuestions(testQuestions.filter(faqQuestion => faqQuestion.id !== config.id));
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
                    activeOption.trueOption = false;
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