import { memo, useRef } from 'react';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import styles from '../LoginPage/LoginPage.module.scss';
import { Form, Input, Button, Select, notification, FormInstance } from 'antd';
import { useHistory } from 'react-router';
import { Page, paths } from 'routes/constants';
import { Link } from "react-router-dom";
import { cityItems, formItemRulse, inititalFormValue, phoneNumberMask } from './constants';
import { TypeSelectOption } from 'components/common/types';
import MaskedInput from 'antd-mask-input'
// import { loginPage } from 'i18n'

function SignUp(): JSX.Element {
    const formRef = useRef<FormInstance>(null);
    const history = useHistory();
    const [form] = Form.useForm();

    const { Option } = Select;

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
          message: 'Вы были успешно зарегистрированны',
          // description:
          //   'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
          btn,
          key,
          onClose: close,
        });
      };

    function onSubmit (values: any): void {
        // console.log('Success:', values);
        console.log(formRef.current?.getFieldsValue());
        openNotification();
        form.resetFields();
};

    function handleChange(value) {
        console.log(`selected ${value}`);
    };

    return (
        <>
            <div className='container'>
                <Navigation navigationType={NavigationType.HEADER}/>
                <Form
                    form={form}
                    name="signUpForm"
                    initialValues={inititalFormValue}
                    onFinish={onSubmit}
                    className={styles['login-page']}
                    ref={formRef}
                >
                    <span className={styles['login-page__title']}>Регистрация</span>
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
                        <Input className={styles['login-page__input']} placeholder='Email*' />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        rules={[formItemRulse[2]]}
                    >
                        <MaskedInput 
                            className={styles['login-page__input']}
                            mask={phoneNumberMask}
                        />
                    </Form.Item>
                    <Form.Item
                        name="city"
                    >
                        <Select 
                            placeholder='Город' 
                            className={styles['login-page__select']} 
                            onChange={handleChange}
                        >
                            {
                                cityItems.map((item: TypeSelectOption) => (
                                    <Option key={item.value} value={item.value}>{item.text}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            className={styles['login-page__button']}
                            type="primary"
                            htmlType="submit"
                        >
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                    <div className={styles['login-page__sign-up-btn-info']}>Нажимая кнопку “Зарегистрироваться” Вы соглашаетесь на обработку Ваших данных</div>
                    <Link to={paths[Page.LOGIN]} className={styles['login-page__already-have']}>
                        У меня уже есть аккаунт
                    </Link>
                </Form>
                <Navigation navigationType={NavigationType.FOOTER}/>
            </div>
        </>
    );
}

export default memo(SignUp);