import { memo, useEffect, useRef } from "react"
import { Form, FormInstance, Input } from 'antd';
import styles from './ContactUs.module.scss';
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType, htmlType } from 'components/uiKit/ButtomElem/types';
import { homePage } from "i18n";
import { ReactComponent as ContactUsFooter } from './../../../assets/images/home-page/contact-us-footer.svg';
import { useUpdateDictationQuestions } from "components/pages/AdminPage/DictationQuestionsPage/useUpdateDictationQuestions";
import { openNotification } from "components/common/commonHelper";
import { TypeDictationQuestionData } from "components/pages/AdminPage/DictationQuestionsPage/types";
import { sharingLinks } from "./constants";

const { TextArea } = Input;

function ContactUs(): JSX.Element {
  const formRef = useRef<FormInstance>(null);

  const { error, addDictationQuestion } = useUpdateDictationQuestions();

  const onSubmit = async (formData: TypeDictationQuestionData) => {
    if (
      formData?.fullName &&
      formData?.email &&
      formData?.message
    ) {
      await addDictationQuestion({ ...formData })
      if (!error) {
        openNotification('success', 'Сообщение отправлено! Чуть позже мы с вами свяжемся.');
      }
    }
  }

  useEffect(() => {
    if (error) {
      openNotification('error', 'Внутрення ошибка сервера');
    }
  }, [error])

  return <div className={styles['contact-us']}>
    <div className={styles['contact-us__title']}>
      {ReactHtmlParser(homePage.contactUs.title)}
    </div>
    <div className={styles['contact-us__body']}>
      <div className={styles["contact-us__left-bar"]}>
        <div className={styles['contact-us__image']}>
          <div className={styles['contact-us__footer']}>
            <ContactUsFooter />
            <div className={classNames(styles['contact-us__share-in'], styles['share-in'])}>
              <div className={styles['share-in__title']}>{ReactHtmlParser(homePage.contactUs.body.shareTo)}</div>
              <div className={styles['share-in__links']}>
                {
                  sharingLinks.map((link) => (
                    <a
                      href={link}
                      className={styles['share-in__link']}
                      rel="noreferrer"
                      target="_blank"
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames(styles['contact-us__right-bar'], styles['contact-us-form'])}>
        <Form
          name="basic"
          initialValues={{}}
          onFinish={onSubmit}
          ref={formRef}
        >
          <div className={styles['contact-us-form__top']}>
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
            >
              <Input className={styles['contact-us-form__input']} placeholder='Ваше имя' />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Пожалуйста, введите email!' }]}
            >
              <Input type="email" className={styles['contact-us-form__input']} placeholder='Email*' />
            </Form.Item>
          </div>
          <Form.Item
            name="message"
            rules={[{ required: true, message: 'Пожалуйста, введите ваше сообщение!' }]}
          >
            <TextArea
              className={styles['contact-us-form__input']}
              placeholder="Сообщение"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <div className={styles['contact-us-form__controlls']}>
            <ButtonElem
              className={styles['contact-us-form__button']}
              htmlType={htmlType.SUBMIT}
              type={buttonElemType.Primary}>
              {ReactHtmlParser(homePage.contactUs.body.button.sendBtn)}
            </ButtonElem>
            <div className={styles['contact-us-form__info']}>{ReactHtmlParser(homePage.contactUs.body.sendActionInfo)}</div>
          </div>
        </Form>
      </div>
    </div>
  </div>
}

export default memo(ContactUs);