import { memo, useEffect, useRef, useState } from "react";
import styles from './AdminCollapseElem.module.scss';
import classNames from 'classnames';
import { Props, TypeAction } from "./types";
import { Form, FormInstance } from 'antd';
import { Input } from 'antd';

const { TextArea } = Input;

function AdminCollapseElem(props: Props): JSX.Element {
    const [collapsed, setCollapsed] = useState<boolean>(props.config.isEditing);
    const [rerender, setRerender] = useState<boolean>(false);
    const formRef = useRef<FormInstance>(null);
    const componentRef = useRef(null);
    
    const getCollapseElemClassNames = () => {
        const classes = [styles['admin-collapse-elem']];
        if (collapsed) {
            classes.push(styles['admin-collapse-elem--collapsed']);
        }
        return classNames(...classes);
    }
    const changeButtonCollapse = () => {
        setCollapsed(!collapsed);
    }
    const onActionClick = (action: TypeAction) => {
        if (action.id === props.config.collapseOn) {
            changeButtonCollapse();
        }
        action.callback(action, props.config, formRef.current?.getFieldsValue());
        // Just for rerender component when editing state is true to show textarea
        setRerender(!rerender);
    }

    function OnInput(this: any) {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    }
    useEffect(() => {
        // Adding rows automatically for a textarea
        if (props.config.isEditing) {
            const ref = componentRef?.current as any;
            const tx = ref.getElementsByTagName('textarea');
            for (let i = 0; i < tx.length; i++) {
                tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
                tx[i].addEventListener("input", OnInput, false);
            }
        }
    });
    return (
        <div ref={componentRef} className={getCollapseElemClassNames()}>
            <Form
                initialValues={props.config}
                className="admin-collapse-elem-form"
                ref={formRef}
            >
                <div className={styles['admin-collapse-elem__body']}>
                    <div className={styles['admin-collapse-elem__title']}>
                        {!props.config.isEditing 
                            ? props.config.title
                            : <Form.Item name="title">
                                <TextArea
                                    placeholder="Введите вопрос"
                                    rows={1}
                                />
                            </Form.Item>
                        }
                    </div>
                    <div className={styles['admin-collapse-elem__actions']}>
                        {props.config.actions.map((action, index) => (
                            <button 
                                key={index}
                                className={styles['admin-collapse-elem__action-btn']}
                                onClick={() => onActionClick(action)}
                            >{action.icon}</button>)
                        )}
                    </div>
                </div>
                <div className={styles['admin-collapse-elem__content']}>{props.children}</div>
            </Form>
        </div>
    );
}

export default memo(AdminCollapseElem);