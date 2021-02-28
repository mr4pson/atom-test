import { memo, useRef } from 'react';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import styles from './PrivateOffice.module.scss';
import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router';
import { Page, paths } from 'routes/constants';
import { Link } from "react-router-dom";
// import { loginPage } from 'i18n'

function PrivateOffice(): JSX.Element {
    const formRef = useRef<any>(null);
    const history = useHistory();

    function onSubmit (values: any): void {
        // console.log('Success:', values);
        console.log(formRef.current.getFieldValue());
        history.push(paths[Page.HOME])
    };

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
                  <div>Photo</div>
                  <div className={styles['']}>Иванов Андрей Павлович</div>
                  Личный кабинет!
                </Form>
                <Navigation navigationType={NavigationType.FOOTER}/>
            </div>
        </>
    );
}

export default memo(PrivateOffice);