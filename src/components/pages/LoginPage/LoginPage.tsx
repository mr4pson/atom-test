import { memo } from 'react';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import styles from './LoginPage.module.scss';
// import { loginPage } from 'i18n'

function LoginPage(): JSX.Element {
    return (
        <>
            <div className='container'>
                <Navigation navigationType={NavigationType.HEADER}/>
                <div className={styles['login-page']}>
                    <span className={styles['login-page__title']}>Вход</span>
                    <input className={styles['login-page__input']} placeholder='Логин' />
                    <input className={styles['login-page__input']} placeholder='Пароль' />
                    <button className={styles['login-page__button']}>Войти</button>
                    <span className={styles['login-page__forgot-password']}>Забыли пароль</span>
                    <span className={styles['login-page__sign-up']}>Зарегистрироваться</span>
                </div>
                <Navigation navigationType={NavigationType.FOOTER}/>
            </div>
        </>
    );
}

export default memo(LoginPage);