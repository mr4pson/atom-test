import { memo, useRef } from 'react';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import styles from './LoginPage.module.scss';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router';
import { Page, paths } from 'routes/constants';
import { Link } from "react-router-dom";
// import { loginPage } from 'i18n'

function LoginPage(): JSX.Element {
    const formRef = useRef<any>(null);
    const history = useHistory();

    function onSubmit (values: any): void {
        // console.log('Success:', values);
        console.log(formRef.current.getFieldValue());
        history.push(paths[Page.HOME])
    };

    console.log(paths[Page.FORGOT_PASSWORD]);

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
                        name="login"
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