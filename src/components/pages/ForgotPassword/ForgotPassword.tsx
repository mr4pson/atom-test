import { memo, useRef } from 'react';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import styles from '../LoginPage/LoginPage.module.scss';
import { Form, Input, Button, notification } from 'antd';
import { Page, paths } from 'routes/constants';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
// import { loginPage } from 'i18n'

function ForgotPassword(): JSX.Element {
    const formRef = useRef<any>(null);
    let history = useHistory();
    const [form] = Form.useForm();

    const close = () => {
      console.log(
        'Notification was closed. Either the close button was clicked or duration time elapsed.',
      );
    };

    const openNotification = () => {
      const key = `open${Date.now()}`;
      function onBackToLogin(): void {
        notification.close(key);
        history.push(paths[Page.LOGIN]);
      }

      const btn = (
        <Button className={styles['login-page__notification-btn']} type="primary" size="small" onClick={onBackToLogin}>
          К логину
        </Button>
      );
      notification.open({
        message: 'Сообщение было отправлено на ваш почтовый ящик',
        // description:
        //   'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
        btn,
        key,
        onClose: close,
      });
    };

    function onSubmit (values: any): void {
      // console.log('Success:', values);
      console.log(formRef.current.getFieldValue());
      openNotification();
      form.resetFields();
    };

    return (
        <>
            <div className='container'>
                <Navigation navigationType={NavigationType.HEADER}/>
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ email: '' }}
                    onFinish={onSubmit}
                    className={styles['login-page']}
                    ref={formRef}
                >
                    <span className={styles['login-page__title']}>Восстановление пароля</span>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please, input your email!' }]}
                    >
                        <Input type="email" className={styles['login-page__input']} placeholder='Email' />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            className={styles['login-page__button']}
                            type="primary"
                            htmlType="submit"
                        >
                            Отправить
                        </Button>
                    </Form.Item>
                    <Link to={paths[Page.LOGIN]} className={styles['login-page__back']}>
                        Назад
                    </Link>
                    <Link to={paths[Page.SIGN_UP]} className={styles['login-page__sign-up']}>
                        Зарегистрироваться
                    </Link>
                </Form>
                <Navigation navigationType={NavigationType.FOOTER}/>
            </div>
        </>
    );
}

export default memo(ForgotPassword);