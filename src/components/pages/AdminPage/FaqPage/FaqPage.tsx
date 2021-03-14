import { Form, Input } from 'antd';
import axios from 'axios';
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import { TypeAction, TypeCollapseConfig } from 'components/uiKit/AdminCollapse/types';
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import { memo, useEffect, useState } from "react";
import { ReactComponent as DoneIcon } from '../../../../assets/images/admin/done.svg';
import { ReactComponent as EditIcon } from '../../../../assets/images/admin/edit.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/images/admin/trash.svg';
// import { getActions } from './constants';
import styles from "./FaqPage.module.scss";
import { TypeFaqQuestion } from './types';

const { TextArea } = Input;

function FaqPage(): JSX.Element {
    const [faqQuestions, setFaqQuestions] = useState<TypeFaqQuestion[]>([]);

    const getQuestions = async () => {
        const questionsResponse = await axios.get<TypeFaqQuestion[]>('/mocks/getFaqPageQuestions.json');
        const questions = questionsResponse.data.map((question) => ({
            ...question,
            actions: getActions(false)
        }));
        setFaqQuestions(questions);
    }

    useEffect(() => {
        getQuestions();
    }, []);

    // console.log(faqQuestions);
    const getActions = (isEditing: boolean = false): TypeAction[] => {
        return [
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
                        setFaqQuestions(faqQuestions.filter(faqQuestion => faqQuestion.id !== config.id));
                    }
                },
            }
        ]
    }

    const handleCreate = () => {
        // TODO add http create request
        setFaqQuestions(faqQuestions.concat([{
            title: '',
            body: '',
            isEditing: true,
            collapseOn: 'edit',
            actions: getActions(true)
        }]));
    }
    return (
        <div className={styles['faq-page']}>
            <div className={styles['faq-page__create-wrap']}>
                <ButtonElem
                    type={buttonElemType.Primary}
                    htmlType="button"
                    className={styles['faq-page__create-btn']}
                    onClick={handleCreate}
                >
                    Добавить
                </ButtonElem>
            </div>
            <div className={styles['faq-page__questions']}>
                {faqQuestions.map((question, index) => (
                    <AdminCollapseElem
                        key={index}
                        config={question}
                    >
                        <Form.Item name="description">
                            <TextArea
                                placeholder="Введите ответ"
                                rows={1}
                            />
                        </Form.Item>
                    </AdminCollapseElem>
                )
                )}
            </div>
        </div>
    );
}

export default memo(FaqPage);
