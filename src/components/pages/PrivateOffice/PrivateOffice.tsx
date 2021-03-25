import { memo, useRef, useState } from 'react';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import styles from './PrivateOffice.module.scss';
import { Form, Input, Select } from 'antd';
import classNames from 'classnames';
import ManFrameIcon from 'icons/components';
import { Row, Col } from 'antd';
import { inititalFormState, phoneNumberMask, sexItems } from './constants';
import { TypeSelectOption } from 'components/common/types';
import MaskedInput from 'antd-mask-input';
import Icon from 'components/uiKit/Icon';
import { editIcon } from 'icons';
import { connect } from "react-redux";
import { setJwtPairToState } from 'redux/reducers/Auth.reducer';
import { ReactComponent as ShareIn } from './../../../assets/images/share-in.svg';
import { ReactComponent as VkIcon } from './../../../assets/images/vk.svg';
import { ReactComponent as OdnoklassikiIcon } from './../../../assets/images/odnoclassniki.svg';
import { ReactComponent as FacebookIcon } from './../../../assets/images/facebook.svg';
import { ReactComponent as InstagramIcon } from './../../../assets/images/instagram.svg';
import { ReactComponent as TelegramIcon } from './../../../assets/images/telegram.svg';


// import { loginPage } from 'i18n'

function PrivateOffice(props): JSX.Element {
    const formRef = useRef<any>(null);

    const { Option } = Select;

    // const [boolFormState, setBoolFormState] = useState<any>(initialBoolFormValue);
    const [boolFullName, setBoolFullName] = useState<boolean>(false);
    const [boolCity, setBoolCity] = useState<boolean>(false);
    const [boolSex, setBoolSex] = useState<boolean>(false);
    const [boolPhoneNumber, setBoolPhoneNumber] = useState<boolean>(false);
    const [boolEmail, setBoolEmail] = useState<boolean>(false);


    // const [formState, setFormState] = useState<any>(inititalFormState);
    const [fullName, setFullName] = useState<string>(inititalFormState.fullName);
    const [city, setCity] = useState<string>(inititalFormState.city);
    const [sex, setSex] = useState<any>(inititalFormState.sex);
    const [phoneNumber, setPhoneNumber] = useState<string>(inititalFormState.phoneNumber);
    const [email, setEmail] = useState<string>(inititalFormState.email);
    
    const [avatar, setAvatar] = useState<any>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    function handleChange(e) {
        setSex(e);
        setBoolSex(false);
        findSexItemText();
    };

    function onSubmit (): void {
        console.log(formRef.current.getFieldValue());
    };

    function findSexItemText() {
        const sexObject = sexItems.find((elem: any) => {
            if (elem.value === sex) {
                return elem
            }
        }) as TypeSelectOption;
        return sexObject.text;
    };

    function uploadAvatar(e: any): any {
        const files = Array.from(e.target.files);
        setIsUploading(true);

        const formData = new FormData()
        files.forEach((file: any, i: any) => {
            formData.append(i, file)
        })

        setAvatar(files);

        console.log(files);
        console.log(avatar)

        //promise
        setIsUploading(false);

    }

    console.log(props);

    return (
        <>
            <div className='container'>
                <Navigation navigationType={NavigationType.HEADER}/>
                <Form
                    name="basic"
                    onFinish={onSubmit}
                    className={styles['private-office']}
                    ref={formRef}
                    initialValues={inititalFormState}
                >
                    <div className={styles['private-office__user-info']}>
                        <div className={classNames(
                                styles['private-office__photo'],
                                styles['user-photo'],
                            )}
                        >
                            <div className={styles['user-photo__img']}>
                                <ManFrameIcon />
                                <img src={avatar?.length ? avatar[0].secure_url : ''} alt='' />
                            </div>
                            <label className={styles['user-photo__action-name']}>
                                Загрузить фото
                                <input className={styles['user-photo__file-input']} name="Загрузить фото" type='file' id='multi' onChange={uploadAvatar} />
                            </label>
                        </div>
                        <div className={styles['user-info']}>
                            <Form.Item
                                name="fullName"
                                rules={[{ required: true, message: 'Пожалуйста, заполните Ф.И.О.!' }]}
                                className={styles['row-item__full-name']}
                            >
                                {
                                    boolFullName === false ?
                                    <div
                                        className={styles['user-info__full-name']}
                                    >
                                        <span>{fullName}</span>
                                        <Icon
                                            className={styles['user-info__edit-icon']}
                                            path={editIcon.path}
                                            viewBox={editIcon.viewBox}
                                            title="AtomTest"
                                            onClick={() => setBoolFullName(true)}
                                        />
                                    </div>
                                    : <div className={styles['input-wrapper']}>
                                        <Input
                                            className={styles['user-info__input']}
                                            placeholder='Логин'
                                            onBlur={() => setBoolFullName(false)}
                                            onChange={(e) => setFullName(e.target.value)}
                                            onPressEnter={() => setBoolFullName(false)}
                                            value={fullName}
                                            autoFocus
                                        />
                                    </div>
                                }
                            </Form.Item>
                            <div className={styles['user-info__divider']} />
                            <Form.Item
                                name="city"
                                rules={[{ required: true, message: 'Пожалуйста, введите название города!' }]}
                                className={styles['row-item']}
                            >
                                <Row className={styles['user-info__row']}>
                                    <Col span={3} className={styles['user-info__column-name']}>Город:</Col>
                                    {
                                        boolCity === false ?
                                        <Col 
                                            span={12}
                                            className={styles['user-info__column-value']}
                                        >
                                            <span>{city}</span>
                                            <Icon
                                                className={styles['user-info__edit-icon']}
                                                path={editIcon.path}
                                                viewBox={editIcon.viewBox}
                                                title="AtomTest"
                                                onClick={() => setBoolCity(true)}
                                            />
                                        </Col>
                                        : <Col 
                                            span={12}
                                            className={styles['user-info__column-value']}
                                            onClick={() => setBoolCity(true)}
                                        >
                                            <Input
                                                className={styles['user-info__input']}
                                                placeholder='Логин'
                                                onBlur={() => setBoolCity(false)}
                                                onChange={(e) => {
                                                    setCity(e.target.value)
                                                }}
                                                onPressEnter={() => setBoolCity(false)}
                                                value={city}
                                                autoFocus
                                            />
                                        </Col>
                                    }
                                </Row>
                            </Form.Item>
                            <Form.Item
                                name="sex"
                                rules={[{ required: true, message: 'Пожалуйста, введите название города!' }]}
                                className={styles['row-item']}
                            >
                                <Row className={styles['user-info__row']}>
                                    <Col span={3} className={styles['user-info__column-name']}>Пол:</Col>
                                    {
                                        boolSex === false ?
                                        <Col 
                                            span={12}
                                            className={styles['user-info__column-value']}
                                        >
                                            <span>{findSexItemText()}</span>
                                            <Icon
                                                className={styles['user-info__edit-icon']}
                                                path={editIcon.path}
                                                viewBox={editIcon.viewBox}
                                                title="AtomTest"
                                                onClick={() => setBoolSex(true)}
                                            />
                                        </Col>
                                        : <Col 
                                            span={12}
                                            className={styles['user-info__column-value']}
                                        >
                                            <Select 
                                                placeholder='Пол' 
                                                className={styles['user-info__input']} 
                                                onChange={handleChange}
                                                value={sex}
                                            >
                                                {
                                                    sexItems.map((item: TypeSelectOption) => (
                                                        <Option key={item?.value} 
                                                            value={item?.value}
                                                        >
                                                            {item?.text}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        </Col>
                                    }
                                </Row>
                            </Form.Item>
                            <Form.Item
                                name="city"
                                rules={[{ required: true, message: 'Пожалуйста, введите название города!' }]}
                                className={styles['row-item']}
                            >
                                <Row className={styles['user-info__row']}>
                                    <Col span={3} className={styles['user-info__column-name']}>Телефон:</Col>
                                    {
                                        boolPhoneNumber === false ?
                                        <Col 
                                            span={12}
                                            className={styles['user-info__column-value']}
                                        >
                                            <span>{phoneNumber}</span>
                                            <Icon
                                                className={styles['user-info__edit-icon']}
                                                path={editIcon.path}
                                                viewBox={editIcon.viewBox}
                                                title="AtomTest"
                                                onClick={() => setBoolPhoneNumber(true)}
                                            />
                                        </Col>
                                        : <Col
                                            span={12}
                                            className={styles['user-info__column-value']}
                                            onClick={() => setBoolPhoneNumber(true)}
                                        >
                                            <MaskedInput 
                                                className={styles['user-info__input']}
                                                mask={phoneNumberMask}
                                                placeholder='Телефон'
                                                onBlur={() => setBoolPhoneNumber(false)}
                                                onChange={(e) => {
                                                    setPhoneNumber(e.target.value)
                                                }}
                                                onPressEnter={() => setBoolPhoneNumber(false)}
                                                value={phoneNumber}
                                                autoFocus
                                            />
                                        </Col>
                                    }
                                </Row>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Пожалуйста, введите email!' }]}
                                className={styles['row-item']}
                            >
                                <Row className={styles['user-info__row']}>
                                    <Col span={3} className={styles['user-info__column-name']}>Email:</Col>
                                    {
                                        boolEmail === false ?
                                        <Col
                                            span={12}
                                            className={styles['user-info__column-value']}
                                        >
                                            <span>{email}</span>
                                            <Icon
                                                className={styles['user-info__edit-icon']}
                                                path={editIcon.path}
                                                viewBox={editIcon.viewBox}
                                                title="AtomTest"
                                                onClick={() => setBoolEmail(true)}
                                            />
                                        </Col>
                                        : <Col
                                            span={12}
                                            className={styles['user-info__column-value']}
                                            onClick={() => setBoolEmail(true)}
                                        >
                                            <Input
                                                type="email"
                                                className={styles['user-info__input']}
                                                placeholder='Логин'
                                                onBlur={() => setBoolEmail(false)}
                                                onChange={(e) => {
                                                    setEmail(e.target.value)
                                                }}
                                                onPressEnter={() => setBoolEmail(false)}
                                                value={email}
                                                autoFocus
                                            />
                                        </Col>
                                    }
                                </Row>
                            </Form.Item>
                        </div>
                    </div>
                    <div className={styles['diploma-info']}>
                        <div className={styles['diploma-info__title']}>Диплом</div>
                        <div className={styles['diploma-info__frame']}>
                            <div className={styles['diploma-info__image']}>
                                <span className={styles['diploma-info__name']}>Диплом</span>
                            </div>
                            <div className={classNames(styles['diploma-info__share-in'], styles['share-in'])}>
                                <ShareIn />
                                <span className={styles['share-in__title']}>Поделиться в:</span>
                                <div className={styles['share-in__icons']}>
                                    <a rel="noreferrer" target="_blank" href="https://vk.com/">
                                        <VkIcon className={styles['share-in__icon']} />
                                    </a>
                                    <a rel="noreferrer" target="_blank" href="https://ok.ru/">
                                        <OdnoklassikiIcon className={styles['share-in__icon']} />
                                    </a>
                                    <a rel="noreferrer" target="_blank" href="https://facebook.com/">
                                        <FacebookIcon className={styles['share-in__icon']} />
                                    </a>
                                    <a rel="noreferrer" target="_blank" href="https://www.instagram.com/">
                                        <InstagramIcon className={styles['share-in__icon']} />
                                    </a>
                                    <a rel="noreferrer" target="_blank" href="https://web.telegram.org/">
                                        <TelegramIcon className={styles['share-in__icon']} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <button className={styles['diploma-info__download']}>Скачать диплом</button>
                    </div>
                </Form>
                <Navigation navigationType={NavigationType.FOOTER}/>
            </div>
        </>
    );
}

const mapStateToProps = (state: any) => {
    return {
        jwtPair: state.auth?.jwtPair,
    }
}

export default connect(mapStateToProps, 
    { setJwtPairToState })(memo(PrivateOffice));