import { Checkbox, FormInstance } from 'antd';
import { memo, useRef, useState } from "react";
import { QuestionOptionType, TypeTestQuestion } from "../types";
import styles from "./TestQuestionsOption.module.scss";
import classNames from 'classnames';
import { TypeAction } from './types';

type Props = {
    config: TypeTestQuestion
}

function TestQuestionsOption(props: Props): JSX.Element {
    const [rerender, setRerender] = useState<boolean>(false);
    const formRef = useRef<FormInstance>(null);

    const onActionClick = (action: TypeAction) => {
        action.callback(action, props.config, formRef.current?.getFieldsValue());
        // Just for rerender component when editing state is true to show textarea
        setRerender(!rerender);
    }

    return(
        <div className={classNames(styles['test-questions-option'], 'test-questions-option')}>
            <Checkbox disabled={true}>{props.config?.title}</Checkbox>
            <div className={styles['test-questions-option__actions']}>
                {props.config.actions.map((action, index) => (
                    <button 
                        key={index}
                        className={styles['test-questions-option__action-btn']}
                        onClick={() => onActionClick(action)}
                    >{action.icon}</button>)
                )}
            </div>
        </div>
    );
}

export default memo(TestQuestionsOption);
