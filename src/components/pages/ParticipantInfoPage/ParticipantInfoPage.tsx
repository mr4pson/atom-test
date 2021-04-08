import { memo, useEffect, useState } from "react";
import styles from './ParticipantInfoPage.module.scss';
import { ManFrameIcon, WomanFrameIcon } from 'icons/components';
import classNames from 'classnames';
import { Row, Col } from 'antd';
import { ReactComponent as ShareIn } from './../../../assets/images/share-in.svg';
import { useGetParticipant } from "../PrivateOffice/useGetParticipant";
import Loader from 'components/uiKit/Loader';
import { useParams } from "react-router";
import { sharingLinks } from "components/modules/ContactUs/constants";

function ParticipantInfoPage(): JSX.Element {
  const { loading, currentParticipant, getCurrentParticipant } = useGetParticipant();
  const [avatar, setAvatar] = useState<any>(null);
  const [isSaveDiplomaVisible, setIsSaveDiplomaVisible] = useState<any>(null);

  const { id } = useParams<{ id: string }>();

  function getUserPhoto(): JSX.Element | null {
    if (avatar) {
      return <div
        className={styles['user-photo__img']}
        style={{ backgroundImage: `url(${avatar})` }}
      />
    } else {
      if (currentParticipant?.sex === 'male') {
        return <ManFrameIcon />;
      } else if (currentParticipant?.sex === 'female') {
        return <WomanFrameIcon />;
      } else {
        return null;
      }
    }
  }

  const downloadDiploma = () => {
    setIsSaveDiplomaVisible(true);
  }

  useEffect(() => {
    getCurrentParticipant(id);
  }, [])

  useEffect(() => {
    setAvatar(currentParticipant?.avatar);
  }, [currentParticipant])

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
              <div className={styles['user-photo__img-container']}>
                {getUserPhoto()}
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
                <div className={styles['diploma-info__full-name']}>{currentParticipant?.fullName}</div>
                <div className={styles['diploma-info__percentage']}>99%</div>
                <img width={707} src="diploma.png" />
              </div>
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
                      />
                    ))
                  }
                </div>
              </div>
            </div>
            <button
              onClick={downloadDiploma}
              type="button"
              className={styles['diploma-info__download']}
            >Скачать диплом</button>
          </div>
        </div>
        : <Loader className={'default-loader'} />
      }
    </div>
  </>
}

export default memo(ParticipantInfoPage);