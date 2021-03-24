import { memo, useEffect, useRef, useState } from 'react';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import styles from './LoginPage.module.scss';
import { Form, Input, Button, FormInstance, notification } from 'antd';
import { Page, paths } from 'routes/constants';
import { Link } from "react-router-dom";
import { useAuth } from './useAuth';
// import { loginPage } from 'i18n'

function LoginPage(): JSX.Element {
    const formRef = useRef<FormInstance>(null);
    const { loading, login, errorInfo } = useAuth();
    const [errorNotification, setErrorNotification] = useState<boolean>(false);

    const close = () => {
        console.log(
          'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
    };

    const openNotification = (type: string) => {
        const key = `open${Date.now()}`;  
        notification[type]({
          message: errorInfo.message,
          key,
          onClose: close,
        });
    };

    async function onSubmit (): Promise<any> {
        const formValues = formRef.current?.getFieldsValue();
        console.log(formValues);
        login(formValues)
        setErrorNotification(true);
        // errorInfo && openNotification();
    };

    useEffect(() => {
        if (errorNotification) {
            setErrorNotification(false);
            openNotification('error');
        }
    }, [errorInfo])

    return (
        <>
            <div className='container'>
                <Navigation navigationType={NavigationType.HEADER}/>
                <Form
                    name="basic"
                    initialValues={{}}
                    onFinish={onSubmit}
                    className={styles['login-page']}
                    ref={formRef}
                >
                    <span className={styles['login-page__title']}>Вход</span>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your login!' }]}
                    >
                        <Input className={styles['login-page__input']} placeholder='Логин' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password className={styles['login-page__input']} placeholder='Пароль' />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            className={styles['login-page__button']}
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <Link to={paths[Page.FORGOT_PASSWORD]} className={styles['login-page__forgot-password']}>
                        Забыли пароль?
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

export default memo(LoginPage);