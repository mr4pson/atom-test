import { Checkbox, Form, FormInstance, Input, Radio } from 'antd';
import classNames from 'classnames';
import { memo, useRef, useState } from "react";
import { QuestionOptionType, TypeTestQuestionOption } from "../types";
import styles from "./TestQuestionsOption.module.scss";
import { TypeAction } from './types';

const { TextArea } = Input;


type Props = {
    config: TypeTestQuestionOption,
    type: QuestionOptionType,
}

function TestQuestionsOption(props: Props): JSX.Element {
    const [rerender, setRerender] = useState<boolean>(false);
    const formRef = useRef<FormInstance>(null);

    const onActionClick = (action: TypeAction) => {
        action.callback(action, props.config, formRef.current?.getFieldsValue());
        // Just for rerendering component when editing state is true to show textarea
        setRerender(!rerender);
    }

    return(
        <div className={classNames(styles['test-questions-option'], 'test-questions-option')}>
            <Form
                initialValues={props.config}
                className="admin-collapse-elem-form"
                ref={formRef}
            >
                {props.type === QuestionOptionType.CHECKBOX && <Checkbox disabled={true}>
                    {!props.config.isEditing 
                        ? props.config.title
                        : <Form.Item name="title">
                            <TextArea
                                placeholder="Введите вопрос"
                                rows={1}
                            />
                        </Form.Item>
                }</Checkbox>}
                {props.type === QuestionOptionType.RADIO && <Radio disabled={true}>
                    {!props.config.isEditing 
                        ? props.config.title
                        : <Form.Item name="title">
                            <TextArea
                                placeholder="Введите вопрос"
                                rows={1}
                            />
                        </Form.Item>
                }</Radio>}
            </Form>
            <div className={styles['test-questions-option__actions']}>
                {props.config.actions.map((action, index) => (
                        <button 
                            key={index}
                            className={styles['test-questions-option__action-btn']}
                            onClick={() => onActionClick(action)}
                        >{action.icon}</button>
                    )
                )}
            </div>
        </div>
    );
}

export default memo(TestQuestionsOption);
