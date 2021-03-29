import { memo, useRef } from "react"
import { Form, FormInstance, Input } from 'antd';
import styles from './ContactUs.module.scss';
import ReactHtmlParser from 'react-html-parser';
import classNames from 'classnames';
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType, htmlType } from 'components/uiKit/ButtomElem/types';
import { homePage } from "i18n";
import { ReactComponent as ContactUsFooter } from './../../../assets/images/home-page/contact-us-footer.svg';

const { TextArea } = Input;

function ContactUs(): JSX.Element {
  const formRef = useRef<FormInstance>(null);

  const onSubmit = (e) => {
    console.log(e);
  }

  return <div className={styles['contact-us']}>
    <div className={styles['contact-us__title']}>
      {ReactHtmlParser(homePage.contactUs.title)}
    </div>
    <div className={styles['contact-us__body']}>
      <div className="contact-us__left-bar">
        <div className={styles['contact-us__image']}>
          <div className={styles['contact-us__footer']}>
            <ContactUsFooter />
            <div className={classNames(styles['contact-us__share-in'], styles['share-in'])}>
              <div className={styles['share-in__title']}>{ReactHtmlParser(homePage.contactUs.body.shareTo)}</div>
              <div className={styles['share-in__links']}>
                <div className={styles['share-in__link']}></div>
                <div className={styles['share-in__link']}></div>
                <div className={styles['share-in__link']}></div>
                <div className={styles['share-in__link']}></div>
                <div className={styles['share-in__link']}></div>
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
              name="name"
              rules={[{ required: true, message: 'Please input your login!' }]}
            >
              <Input className={styles['contact-us-form__input']} placeholder='Ваше имя' />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your login!' }]}
            >
              <Input className={styles['contact-us-form__input']} placeholder='Email*' />
            </Form.Item>
          </div>
          <Form.Item
            name="message"
            rules={[{ required: true, message: 'Please input your login!' }]}
          >
            <TextArea
              className={styles['contact-us-form__input']}
              required={true}
              placeholder="Сообщение"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <div className={styles['contact-us-form__controlls']}>
            <ButtonElem htmlType={htmlType.SUBMIT} type={buttonElemType.Primary}>{ReactHtmlParser(homePage.contactUs.body.button.sendBtn)}</ButtonElem>
            <div className={styles['contact-us-form__info']}>{ReactHtmlParser(homePage.contactUs.body.sendActionInfo)}</div>
          </div>
        </Form>
      </div>
    </div>
  </div>
}

export default memo(ContactUs);