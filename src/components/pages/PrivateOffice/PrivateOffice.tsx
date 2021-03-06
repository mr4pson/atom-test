import { memo, useEffect, useRef, useState } from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
import MaskedInput from 'antd-mask-input';
import axios from 'axios';
import classNames from 'classnames';
import { getImageUrl, getUserInfo, openNotification } from 'components/common/commonHelper';
import { TypeSelectOption, userType } from 'components/common/types';
import { useUploadFile } from "components/hooks/useUploadFile";
import { sharingLinks } from 'components/modules/ContactUs/constants';
import Icon from 'components/uiKit/Icon';
import Loader from 'components/uiKit/Loader';
import * as htmlToImage from 'html-to-image';
import { editIcon } from 'icons';
import { ManFrameIcon, WomanFrameIcon } from 'icons/components';
import { connect } from "react-redux";
import { ReactComponent as ShareIn } from './../../../assets/images/share-in.svg';
import { useHistory } from 'react-router';
import { setJwtPairToState } from 'redux/reducers/Auth.reducer';
import { Page, paths } from 'routes/constants';
import { getJwtPair } from '../LoginPage/helpers';
import { TypeAnswer } from '../UserTestComplete/types';
import { phoneNumberMask, sexItems } from './constants';
import styles from './PrivateOffice.module.scss';
import { useGetParticipant } from './useGetParticipant';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import ButtonElem from "components/uiKit/ButtomElem";
import { useHomePage } from '../HomePage/useHomePage';

// import { loginPage } from 'i18n'

function PrivateOffice(props): JSX.Element {
  const { loading, currentParticipant, getCurrentParticipant, updateUser } = useGetParticipant();

  const inititalFormState = {
    fullName: '',
    city: '',
    sex: '',
    phoneNumber: '',
    email: '',
  }

  const formRef = useRef<any>(null);

  const { Option } = Select;

  const [boolFullName, setBoolFullName] = useState<boolean>(false);
  const [boolCity, setBoolCity] = useState<boolean>(false);
  const [boolSex, setBoolSex] = useState<boolean>(false);
  const [boolPhoneNumber, setBoolPhoneNumber] = useState<boolean>(false);
  const [boolEmail, setBoolEmail] = useState<boolean>(false);
  const [answer, setAnswer] = useState<TypeAnswer>();

  const [fullName, setFullName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [sex, setSex] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [avatar, setAvatar] = useState<any>(null);
  const [isSaveDiplomaVisible, setIsSaveDiplomaVisible] = useState<any>(null);

  const { uploadMediaFile } = useUploadFile(formRef, undefined, 'avatar');
  const { counterParameters, getCounterParameters } = useHomePage();
  const currentDate = new Date();
  const [dictationDate, setDictationDate] = useState<Date>();

  const userInfo = getUserInfo();
  const history = useHistory();

  const curJwtPair = getJwtPair();

  function handleChange(e) {
    setSex(e);
    findSexItemText();
  };

  const getAnswers = async () => {
    const options = {
        headers: {
            'Authorization': `Bearer ${await curJwtPair}`,
            'withCredentials': true
        },
    }
    const response = await axios.get<TypeAnswer[]>('/api/answers', options);
    const answer = response.data.reverse()[0];
    setAnswer(answer);
}

  function findSexItemText() {
    const sexObject = sexItems.find((elem: any) => {
      if (elem.value === sex) {
        return elem
      }
    }) as TypeSelectOption;
    return sexObject?.text;
  };

  function onRedirectToTestPage(): void {
    history.push(`${paths[Page.USER_TEST]}/${1}`);
  }

  async function handleUpdateUser(
    setBool?: (arg: boolean) => void,
    value?: boolean,
  ): Promise<void> {
    const payload = {
      fullName: fullName,
      city: city,
      sex: sex,
      phone: phoneNumber,
      email: email,
      avatar: avatar,
    }
    await updateUser(payload, userInfo?.id!);
    if (setBool) {
      setBool(value!);
    }
  }

  async function handleFileChange(e): Promise<void> {
    const fileName = await uploadMediaFile(e);
    setAvatar(getImageUrl(fileName));
  }

  const downloadDiploma = () => {
    setIsSaveDiplomaVisible(true);
  }

  useEffect(() => {
    // save diploma html as image
    const node = document.getElementById('diploma');
    if (isSaveDiplomaVisible && node) {
      setTimeout(() => {
        setTimeout(() => {
          setIsSaveDiplomaVisible(false);
        }, 1000);
        htmlToImage.toJpeg(node!).then(function (dataUrl) {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'diploma.jpg';
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
          }, 100);
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
      }, 100);
    }

  }, [isSaveDiplomaVisible])

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (!userInfo?.role) {
      history.push(paths[Page.HOME]);
      openNotification('error', 'У вас нет доступа к этой странице т.к. вы не авторизованны!');
    }
    if (userInfo?.role === userType.ADMIN) {
      history.push(paths[Page.ADMIN]);
      openNotification('error', 'У вас нет доступа к Личному кабинету т.к. вы администратор!');
    }
    (async () => {
      await getCurrentParticipant(userInfo?.id!);
    })();
    getAnswers();
    getCounterParameters();
  }, []);

  useEffect(() => {
    setFullName(currentParticipant?.fullName!);
    setCity(currentParticipant?.city!);
    setSex(currentParticipant?.sex!);
    setPhoneNumber(currentParticipant?.phone!);
    setEmail(currentParticipant?.email!);
    setAvatar(currentParticipant?.avatar);
  }, [currentParticipant]);

  useEffect(() => {
    if (sex && currentParticipant?.sex !== sex) {
      handleUpdateUser(setBoolSex, false);
    }
  }, [sex])

  useEffect(() => {
    if (avatar && currentParticipant?.avatar !== avatar)
    handleUpdateUser();
  }, [avatar])

  useEffect(() => {
    setDictationDate(new Date(counterParameters ? counterParameters?.data : ''));
  }, [counterParameters])

  return (
    <>
      {
        !loading ?
          <div className='container'>
            <Form
              name="basic"
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
                  <div className={styles['user-photo__img-container']}>
                    {avatar ?
                      <div className={styles['user-photo__img']} style={{ backgroundImage: `url(${avatar})` }} />
                      : (sex === 'male' ? <ManFrameIcon /> : <WomanFrameIcon />)}
                  </div>
                  <label className={styles['user-photo__action-name']}>
                    Загрузить фото
                    <input
                      className={styles['user-photo__file-input']}
                      id='multi'
                      name="Загрузить фото"
                      onChange={handleFileChange}
                      type='file'
                    />
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
                            onBlur={() => handleUpdateUser(setBoolFullName, false)}
                            onChange={(e) => setFullName(e.target.value)}
                            onPressEnter={() => handleUpdateUser(setBoolFullName, false)}
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
                              onBlur={() => handleUpdateUser(setBoolCity, false)}
                              onChange={(e) => {
                                setCity(e.target.value)
                              }}
                              onPressEnter={() => handleUpdateUser(setBoolCity, false)}
                              value={city}
                              autoFocus
                            />
                          </Col>
                      }
                    </Row>
                  </Form.Item>
                  <Form.Item
                    name="sex"
                    rules={[{ required: true, message: 'Пожалуйста, выберите пол!' }]}
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
                              autoFocus
                              placeholder='Пол'
                              className={styles['user-info__input']}
                              onChange={handleChange}
                              onBlur={() => handleUpdateUser(setBoolSex, false)}
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
                    name="phone"
                    rules={[{ required: true, message: 'Пожалуйста, введите телефон!' }]}
                    className={classNames(styles['row-item'], styles['row-item__phone'])}
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
                              onBlur={() => handleUpdateUser(setBoolPhoneNumber, false)}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              onPressEnter={() => handleUpdateUser(setBoolPhoneNumber, false)}
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
                              onBlur={() => handleUpdateUser(setBoolEmail, false)}
                              onChange={(e) => setEmail(e.target.value)}
                              onPressEnter={() => handleUpdateUser(setBoolEmail, false)}
                              value={email}
                              autoFocus
                            />
                          </Col>
                      }
                    </Row>
                    {!answer && (dictationDate && dictationDate < currentDate) && <ButtonElem
                      type={buttonElemType.Primary}
                      htmlType="button"
                      className={styles["user-info__redirect-btn"]}
                      onClick={onRedirectToTestPage}
                    >
                      Начать тест
                    </ButtonElem>}
                  </Form.Item>
                </div>
              </div>
              <div className={styles['diploma-info']}>
                <div className={styles['diploma-info__title']}>Диплом</div>
                <div className={styles['diploma-info__frame']}>
                  {answer 
                    ? <div className={styles['diploma-info__image']}>
                    <div className={styles['diploma-info__full-name']}>{fullName}</div>
                    <div className={styles['diploma-info__percentage']}>{+answer?.percentage!}%</div>
                    <img width={707} alt="Диплом" src="diploma.png"/>
                  </div>
                    : <div className={styles['diploma-info__image']}>
                    <span className={styles['diploma-info__name']}>Диплом</span>
                  </div>}
                  <div className={classNames(styles['diploma-info__share-in'], styles['share-in'])}>
                    <ShareIn />
                    <span className={styles['share-in__title']}>Мы в:</span>
                    <div className={styles['share-in__icons']}>
                    {
                      sharingLinks.map((link) => (
                        <a
                          href={link}
                          className={styles['share-in__icon']}
                          rel="noreferrer"
                          target="_blank"
                        > </a>
                      ))
                    }
                    </div>
                  </div>
                </div>
                {answer 
                  ? <button
                    onClick={downloadDiploma}
                    type="button"
                    className={styles['diploma-info__download']}
                  >Скачать диплом</button>
                  : <div
                      className={styles['diploma-info__download']}
                    ></div>
                }
              </div>
            </Form>
          </div>
          : <Loader className={'default-loader'} />
      }
      {isSaveDiplomaVisible && <div id="diploma" className={styles['bottom-diploma']}>
        <div className={styles['bottom-diploma__name']}>{fullName}</div>
        <div className={styles['bottom-diploma__percentage']}>{+answer?.percentage!}%</div>
        <img alt="Диплом" src="diploma.png"/>
      </div>}
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
