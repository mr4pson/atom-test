import { Col, Row } from 'antd';
import classNames from 'classnames';
import ContactUs from 'components/modules/ContactUs';
import DictationTimer from 'components/modules/DictationTimer';
import FrequentlyAskedQuestions from 'components/modules/FrequentlyAskedQuestions';
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import { homePage } from 'i18n';
import { memo, ReactNode, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useUpdateSupporters } from '../AdminPage/SupportersPage/useUpdateSupporters';
import { ReactComponent as Ellipse1 } from './../../../assets/images/home-page/ellipse1.svg';
import { ReactComponent as Ellipse2 } from './../../../assets/images/home-page/ellipse2.svg';
import { ReactComponent as Ellipse3 } from './../../../assets/images/home-page/ellipse3.svg';
import { ReactComponent as HowToParticipate1 } from './../../../assets/images/home-page/how-to-participate1.svg';
import { ReactComponent as HowToParticipate2 } from './../../../assets/images/home-page/how-to-participate2.svg';
import { ReactComponent as HowToParticipate21 } from './../../../assets/images/home-page/how-to-participate2.1.svg';
import { ReactComponent as HowToParticipate3 } from './../../../assets/images/home-page/how-to-participate3.svg';
import { ReactComponent as HowToParticipate31 } from './../../../assets/images/home-page/how-to-participate3.1.svg';
import { ReactComponent as HowToParticipate4 } from './../../../assets/images/home-page/how-to-participate4.svg';
import { ReactComponent as HowToParticipate41 } from './../../../assets/images/home-page/how-to-participate4.1.svg';
// import { supporters } from './constants';
import { cutArrayByThree } from './helpers';
import styles from './HomePage.module.scss';
import { useHomePage } from './useHomePage';
import Loader from 'components/uiKit/Loader';
import { getImageUrl } from 'components/common/commonHelper';
import { TypeSupporter } from '../AdminPage/SupportersPage/types';
import '@brainhubeu/react-carousel/lib/style.css';
import CarouselWithDots from 'components/uiKit/CarouselWithDots';

// const { TextArea } = Input;

function HomePage(): JSX.Element {
  const getSupporterClasses = (index): string => {
    return classNames(styles['supporter'], {
      [styles['supporter--left']]: index % 3 === 0,
      [styles['supporter--center']]: index % 3 === 1,
      [styles['supporter--right']]: index % 3 === 2,
    });
  };

  const screenWidth = window.screen.width;
  const { loading, supporters, getSupporters } = useUpdateSupporters();

  const supporterRows = cutArrayByThree(supporters ?? []);
  // const formRef = useRef<FormInstance>(null);

  const { questions, counterParameters, getFaqQuestions, getCounterParameters } = useHomePage();

  // const onSubmit = (e) => {
  //     console.log(e);
  // }

  function getBoldName(name?: string | null): ReactNode {
    return <b>{name}</b>;
  }

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    Promise.all([
      getFaqQuestions(),
      getCounterParameters(),
      getSupporters()
    ])
  }, []);

  return (
    <div className={styles["home-page"]}>
      <div className="container">
        <div className={styles['main-section']}>
          <div className="left-bar">
            <div className={styles['main-section__title']}>Атомный диктант</div>
            <div className={styles['main-section__desc']}>
              Проводится с целью проверить свои знания<br />и привлечь внимание широкой общественности <br /> к атомной отрасли
            </div>
            <div className={styles['main-section__buttons-normal']}>
              <a href="/#about"><ButtonElem type={buttonElemType.Primary}>О проекте</ButtonElem></a>
              <a href="/#organizators"><ButtonElem type={buttonElemType.Default}>Организаторы</ButtonElem></a>
            </div>
          </div>
          <div className="right-bar">
            {counterParameters?.data && <DictationTimer dictantDateString={counterParameters?.data as string} />}
          </div>
        </div>
        <div className={styles['main-section-buttons-small']}>
          <a style={{ display: 'block', marginRight: 30 }} href="/#about"><ButtonElem className={styles['button-small']} type={buttonElemType.Primary}>О проекте</ButtonElem></a>
          <a style={{ display: 'block' }} href="/#organizators"><ButtonElem className={styles['button-small']} type={buttonElemType.Default}>Организаторы</ButtonElem></a>
        </div>
        <div id="about" className={styles['about-project']}>
          <div className={styles['about-project__title']}>
            {ReactHtmlParser(homePage.aboutProject.title)}
          </div>
          <div className={styles['about-project__sub-title']}>
            {ReactHtmlParser(homePage.aboutProject.subTitle)}
          </div>
          <div className={styles['dictant']}>
            <div className={classNames(styles['dictant__example-image'], styles['expample-image'])}>
              <div className={styles['expample-image__wing']}>
                <div className={styles['expample-image__body']}>
                  <div className={styles['expample-image__title']}>2021</div>
                  <div className={styles['expample-image__description']}>Пример Диплома<br />об окончании диктанта</div>
                </div>
              </div>
            </div>
            <div className={styles['dictant__info']}>
              <div className={styles['dictant__paragraphs']}>
                <span>{ReactHtmlParser(homePage.aboutProject.body.firstParagraph)}</span>
                <ul className={styles['dictant__paragraphs-list']}>
                  <li>{ReactHtmlParser(homePage.aboutProject.body.firstListItem)}</li>
                  <li>{ReactHtmlParser(homePage.aboutProject.body.secondListItem)}</li>
                </ul>
                <span>{ReactHtmlParser(homePage.aboutProject.body.secondParagraph)}</span>
              </div>
            </div>
          </div>
          <div className={styles['about-project__footer']}>
            <span>{ReactHtmlParser(homePage.aboutProject.footer)}</span>
          </div>
        </div>
        <div id="organizators" className={styles['organizators']}>
          <div className={styles['organizators__title']}>
            {ReactHtmlParser(homePage.organizators.title)}
          </div>
          <div className={styles['organizators__body']}>
            <div className={classNames(styles['organizators__left-bar'], styles['organizator'])}>
              <div className={styles['organizator__type']}>{ReactHtmlParser(homePage.organizators.type)}</div>
              <div className={styles['organizator__name']}>{ReactHtmlParser(homePage.organizators.name)}</div>
              <div className={styles['organizator__desc']}>{ReactHtmlParser(homePage.organizators.desc)}</div>
              <a className={styles['organizator__button-normal']} href="https://atomgoroda.ru/" rel="noreferrer" target="_blank">
                <ButtonElem type={buttonElemType.Primary}>
                  {ReactHtmlParser(homePage.organizators.button.toOrganizationSiteBtn)}
                </ButtonElem>
              </a>
            </div>
            <div className={styles['organizators__right-bar']}>
              <div className={styles['organizators__image']}></div>
            </div>
            <a className={styles['organizator__button-small']} href="https://atomgoroda.ru/" rel="noreferrer" target="_blank">
              <ButtonElem type={buttonElemType.Primary}>
                {ReactHtmlParser(homePage.organizators.button.toOrganizationSiteBtn)}
              </ButtonElem>
            </a>
          </div>
        </div>
        {
          !loading ?
            <div className={styles['supporters']}>
              <div className={styles['supporters__title']}>
                {ReactHtmlParser(homePage.supporters.title)}
              </div>
              <div className={styles['supporters__body']}>
                {supporterRows.map((supporterRow: TypeSupporter[], index) => (
                  <Row key={index}>
                    {supporterRow.map((supporter: TypeSupporter, i) => (
                      <Col key={i} span={8} className={styles['gutter-row']}>
                        <div className={getSupporterClasses(i)}>
                          {/* <div className={styles['supporter__bg']}>
                            {renderSwitch(i)}
                          </div> */}
                          <div
                            className={styles['supporter__avatar']}
                            style={{ backgroundImage: `url(${getImageUrl(supporter.uploadFile)})` }}
                          />
                          <div className={styles['supporter__name']}>{ReactHtmlParser(supporter.fullName)}</div>
                          <div className={styles['supporter__position']}>
                            <span>{supporter.position}</span>&nbsp;
                            <span>{getBoldName(supporter.organization)}</span>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                ))}
              </div>

              <CarouselWithDots className={styles['supporter__carousel']} items={supporters?.map((supporter: TypeSupporter, index) => (
                <Col key={index} span={8} className={styles['gutter-row']}>
                  <div className={getSupporterClasses(index)}>
                    <div
                      className={styles['supporter__avatar']}
                      style={{ backgroundImage: `url(${getImageUrl(supporter.uploadFile)})` }}
                    />
                    <div className={styles['supporter__name']}>{ReactHtmlParser(supporter.fullName)}</div>
                    <div className={styles['supporter__position']}>
                      <span>{supporter.position}</span>&nbsp;
                            <span>{getBoldName(supporter.organization)}</span>
                    </div>
                  </div>
                </Col>
              ))} />
              <div className={styles['supporter__swipe-info']}>Свайпайте влево чтобы посмотреть отсальных спонсоров.</div>
            </div>
            : <Loader className={'default-loader'} />
        }
        <div className={styles['how-to-participate']}>
          <div className={styles['how-to-participate__title']}>
            {ReactHtmlParser(homePage.howToParticipate.title)}
          </div>
          <div className={styles['how-to-participate__body']}>
            <div className={styles['participant-step']}>
              <div className={styles['participant-step__bg']}>
                <HowToParticipate1 />
              </div>
              <div className={styles['participant-step__body']}>
                <div className={styles['participant-step__number']}>1</div>
                <div className={styles['participant-step__text']}>{ReactHtmlParser(homePage.howToParticipate.steps.first)}</div>
              </div>
              <div className={styles['participant-step__ellipse']}>
                <Ellipse1 className={styles['elipse-small']} />
              </div>
            </div>
            <div className={styles['participant-step']}>
              <div className={styles['participant-step__bg']}>
                {
                  screenWidth >= 768
                    ? <HowToParticipate2 />
                    : <HowToParticipate21 />
                }
              </div>
              <div className={styles['participant-step__body']}>
                <div className={styles['participant-step__number']}>2</div>
                <div className={styles['participant-step__text']}>{ReactHtmlParser(homePage.howToParticipate.steps.second)}</div>
              </div>
              <div className={styles['participant-step__ellipse']}>
                <Ellipse2 className={styles['elipse-small']} />
              </div>
            </div>
            <div className={styles['participant-step']}>
              <div className={styles['participant-step__bg']}>
                {
                  screenWidth >= 768
                    ? <HowToParticipate3 />
                    : <HowToParticipate31 />
                }
              </div>
              <div className={styles['participant-step__body']}>
                <div className={styles['participant-step__number']}>3</div>
                <div className={styles['participant-step__text']}>{ReactHtmlParser(homePage.howToParticipate.steps.third)}</div>
              </div>
              <div className={styles['participant-step__ellipse']}>
                <Ellipse3 className={styles['elipse-small']} />
              </div>
            </div>
            <div className={styles['participant-step']}>
              <div className={styles['participant-step__bg']}>
                {
                  screenWidth >= 768
                    ? <HowToParticipate4 />
                    : <HowToParticipate41 />
                }
              </div>
              <div className={styles['participant-step__body']}>
                <div className={styles['participant-step__number']}>4</div>
                <div className={styles['participant-step__text']}>{ReactHtmlParser(homePage.howToParticipate.steps.fourth)}</div>
              </div>
            </div>
          </div>
        </div>
        <FrequentlyAskedQuestions questions={questions} />
        <ContactUs />
      </div>
    </div>
  );
}

export default memo(HomePage);