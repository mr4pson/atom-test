import { Form, Input } from 'antd';
import axios from 'axios';
import { getJwtPair } from 'components/pages/LoginPage/helpers';
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
import Loader from 'components/uiKit/Loader';
import { useCheckRole } from 'components/hooks/useCheckRole';

const { TextArea } = Input;

function FaqPage(): JSX.Element {
    const [faqQuestions, setFaqQuestions] = useState<TypeFaqQuestion[]>([]);

    const getQuestions = async () => {
        const questionsResponse = await axios.get<TypeFaqQuestion[]>('/api/faqs');
        const questions = questionsResponse.data.map((question) => ({
            ...question,
            actions: getActions(false),
            body: question.description as string,
            isEditing: false,
            collapseOn: 'edit'
        }));
        setFaqQuestions(questions);
    }

    const curJwtPair = getJwtPair();
    const options = {
        headers: {
            'Authorization': `Bearer ${curJwtPair}`,
            'withCredentials': true
        },
    }


    useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

    useEffect(() => {
        getQuestions();
    }, []);

    const getActions = (isEditing: boolean = false): TypeAction[] => {
        return [
            {
                id: 'edit',
                icon: !isEditing ? <EditIcon /> : <DoneIcon />,
                callback: async (action: TypeAction, config: TypeCollapseConfig, formValues: Object) => {
                    config.isEditing = !config.isEditing;

                    if (config.isEditing) {
                        action.icon = <DoneIcon />;
                    } else {
                        action.icon = <EditIcon />;
                        Object.assign(config, formValues);
                        if (config.id) {
                            await axios.put(
                                '/api/faqs/' + config.id, 
                                { description: config.description, title: config.title }, 
                                options
                            );
                            
                            console.log('Updated');
                        } else {
                            const response = await axios.post(
                                '/api/faqs', 
                                { description: config.description, title: config.title }, 
                                options
                            );

                            console.log('Created', response.data);
                            config.id = response.data._id;
                        }
                    }
                },
            },
            {
                id: 'Delete',
                icon: <TrashIcon />,
                callback: (action: TypeAction, config: TypeCollapseConfig) => {
                    console.log(faqQuestions);
                    if (!config.id) {
                        return;
                    }
                    if (window.confirm(`Вы уверены, что хотите удалить вопрос №${config.id}`)) {
                        axios.delete('/api/faqs/' + config.id, options).then((response) => {
                            console.log(response.data);
                            setFaqQuestions(response.data.map((question) => ({
                                ...question,
                                actions: getActions(false),
                                body: question.description as string,
                                isEditing: false,
                                collapseOn: 'edit'
                            })));
                        });
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

    console.log(faqQuestions);

    return (
        <>
        {faqQuestions.length ? <div className={styles['faq-page']}>
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
        </div> : <Loader />}
        </>
    );
}

export default memo(FaqPage);
