import { memo, useRef, useState } from 'react';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import styles from '../LoginPage/LoginPage.module.scss';
import { Form, Input, Button, Select, FormInstance } from 'antd';
import { useHistory } from 'react-router';
import { Page, paths } from 'routes/constants';
import { Link } from "react-router-dom";
import { cityItems, formItemRulse, inititalFormValue, phoneNumberMask, sexItems } from './constants';
import classNames from 'classnames';
import MaskedInput from 'antd-mask-input'
import { englishLimiter } from 'components/common/constants';
import { openNotification } from 'components/common/commonHelper';
import { useSignUp } from './useSignUp';
// import { loginPage } from 'i18n'

function SignUp(): JSX.Element {
    const formRef = useRef<FormInstance>(null);
    const history = useHistory();
    const [form] = Form.useForm();
    const [hasRusLetters, setHasRusLetters] = useState<string>('');

    const { Option } = Select;

    const { loading, status, regUser } = useSignUp();

    async function onSubmit(): Promise<void> {
        const userFormData = formRef.current?.getFieldsValue();

        if (hasRusLetters) {
            openNotification('error', 'Логин содержит русские символы!');
        } else {
            await regUser({...userFormData, avatar: ''});
            if (status && (status !== 200 && status !== 201)) {
                openNotification('error', 'Внутрення ошибка сервера');
            }
            form.resetFields();
            openNotification('success', 'Вы были успешно зарегистрированны, редирект на авторизацию.');
            setTimeout(() => {
                history.push(paths[Page.LOGIN]);
            }, 2000)
        }
    };

    function handleLoginChange(event): void {
        if (englishLimiter.test(event.target.value)) {
            setHasRusLetters('');
        } else {
            setHasRusLetters(event.target.value);
        }
    }

    return (
        <>
            <div className='container'>
                <Form
                    form={form}
                    name="signUpForm"
                    initialValues={inititalFormValue}
                    onFinish={onSubmit}
                    className={styles['login-page']}
                    ref={formRef}
                >
                    <span className={classNames(
                        styles['login-page__title'],
                        styles['login-page__sign-up-title']
                    )}>
                        Регистрация
                    </span>
                    <Form.Item
                        name="fullName"
                        rules={[formItemRulse[0]]}
                    >
                        <Input className={styles['login-page__input']} placeholder='Ф.И.О.' />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[formItemRulse[1]]}
                    >
                        <Input type="email" className={styles['login-page__input']} placeholder='Email*' />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[formItemRulse[2]]}
                    >
                        <MaskedInput
                            className={styles['login-page__input']}
                            mask={phoneNumberMask}
                        />
                    </Form.Item>
                    <Form.Item name="city">
                        <Select
                            placeholder='Город'
                            className={styles['login-page__select']}
                        >
                            {
                                cityItems.map((item) => (
                                    <Option key={item.value} value={item.value}>{item.text}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="sex">
                        <Select
                            placeholder='Пол'
                            className={styles['login-page__select']}
                        >
                            {
                                sexItems.map((item) => (
                                    <Option key={item.value} value={item.value}>{item.text}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[formItemRulse[3]]}
                    >
                        <Input
                            className={styles['login-page__input']}
                            onKeyUp={handleLoginChange}
                            placeholder='Логин'
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[formItemRulse[4]]}
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
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                    <div className={styles['login-page__sign-up-btn-info']}>Нажимая кнопку “Зарегистрироваться” Вы соглашаетесь на обработку Ваших данных</div>
                    <Link
                        to={paths[Page.LOGIN]}
                        className={classNames(
                            styles['login-page__already-have'],
                            styles['login-page__sign-up-already-have'],
                        )}
                    >
                        У меня уже есть аккаунт
                    </Link>
                </Form>
            </div>
        </>
    );
}

export default memo(SignUp);
