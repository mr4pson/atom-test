import { Form, Input } from 'antd';
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import { memo } from "react";
import { useHistory } from "react-router";
import { Page, paths } from "../routes/constants";
import styles from "./FaqPage.module.scss";
import { questions } from './mocks';

const { TextArea } = Input;

function FaqPage(): JSX.Element {
    const history = useHistory();
  
    const handleCreate = () => {
        history.push(paths[Page.FAQ_CREATE]);
    }

    const faqQuestions = questions;

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
                {faqQuestions.map((question, index) => (<AdminCollapseElem
                        key={index}
                        config={question}
                    >
                        <Form.Item name="description">
                            <TextArea
                                placeholder="Введите ответ"
                                rows={1}
                            />
                        </Form.Item>
                    </AdminCollapseElem>)
                )}
            </div>
        </div>
    );
}

export default memo(FaqPage);
