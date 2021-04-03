import { Col, Row } from 'antd';
import classNames from 'classnames';
import Loader from 'components/uiKit/Loader';
import { ManFrameIcon, WomanFrameIcon } from 'icons/components';
import { memo, useEffect } from "react";
import { useParams } from "react-router";
import { useGetParticipant } from "../PrivateOffice/useGetParticipant";
import { ReactComponent as FacebookIcon } from './../../../assets/images/facebook.svg';
import { ReactComponent as InstagramIcon } from './../../../assets/images/instagram.svg';
import { ReactComponent as OdnoklassikiIcon } from './../../../assets/images/odnoclassniki.svg';
import { ReactComponent as ShareIn } from './../../../assets/images/share-in.svg';
import { ReactComponent as TelegramIcon } from './../../../assets/images/telegram.svg';
import { ReactComponent as VkIcon } from './../../../assets/images/vk.svg';
import styles from './ParticipantInfoPage.module.scss';

function ParticipantInfoPage(): JSX.Element {
  const { loading, currentParticipant, getCurrentParticipant } = useGetParticipant();

  const { id } = useParams<{ id: string }>();

  function getHumanFrameIcon(): JSX.Element | null {
    if (currentParticipant?.sex === 'male') {
      return <ManFrameIcon />;
    } else if (currentParticipant?.sex === 'female') {
      return <WomanFrameIcon />;
    } else {
      return null;
    }
  }

  useEffect(() => {
    getCurrentParticipant(id);
  }, [])

  console.log(currentParticipant);

  return <>
    <div className='container'>
      {!loading ?
        <div className={styles['private-office']}>
          <div className={styles['private-office__user-info']}>
            <div className={classNames(
              styles['private-office__photo'],
              styles['user-photo'],
            )}
            >
              <div className={styles['user-photo__img']}>
                {getHumanFrameIcon()}
                {/* <img src={avatar?.length ? avatar[0].secure_url : ''} alt='' /> */}
              </div>
            </div>
            <div className={styles['user-info']}>
              <div className={styles['row-item__full-name']}>
                <div className={styles['user-info__full-name']}>
                  <span>{currentParticipant?.fullName}</span>
                </div>
              </div>
              <div className={styles['user-info__divider']} />
              <div className={styles['row-item']}>
                <Row className={styles['user-info__row']}>
                  <Col span={3} className={styles['user-info__column-name']}>Город:</Col>
                  {
                    <Col
                      span={12}
                      className={styles['user-info__column-value']}
                    >
                      <span>{currentParticipant?.city}</span>
                    </Col>
                  }
                </Row>
              </div>
              <div className={styles['row-item']}>
                <Row className={styles['user-info__row']}>
                  <Col span={3} className={styles['user-info__column-name']}>Пол:</Col>
                  <Col
                    span={12}
                    className={styles['user-info__column-value']}
                  >
                    <span>{
                      currentParticipant?.sex === 'male'
                        ? 'Мужской' : 'Женский'
                    }</span>
                  </Col>
                </Row>
              </div>
              <div className={styles['row-item']}>
                <Row className={styles['user-info__row']}>
                  <Col span={3} className={styles['user-info__column-name']}>Телефон:</Col>
                  <Col
                    span={12}
                    className={styles['user-info__column-value']}
                  >
                    <span>{currentParticipant?.phone}</span>
                  </Col>
                </Row>
              </div>
              <div className={styles['row-item']}>
                <Row className={styles['user-info__row']}>
                  <Col span={3} className={styles['user-info__column-name']}>Email:</Col>
                  <Col
                    span={12}
                    className={styles['user-info__column-value']}
                  >
                    <span>{currentParticipant?.email}</span>
                  </Col>
                </Row>
              </div>
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
        </div>
        : <Loader className={'default-loader'} />
      }
    </div>
  </>
}

export default memo(ParticipantInfoPage);
