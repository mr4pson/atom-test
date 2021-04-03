import { Col, FormInstance, Input, Row } from 'antd';
import classNames from 'classnames';
import ContactUs from 'components/modules/ContactUs';
import DictationTimer from 'components/modules/DictationTimer';
import FrequentlyAskedQuestions from 'components/modules/FrequentlyAskedQuestions';
import ButtonElem from 'components/uiKit/ButtomElem';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import { homePage } from 'i18n';
import { memo, useEffect, useRef } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { ReactComponent as Ellipse1 } from './../../../assets/images/home-page/ellipse1.svg';
import { ReactComponent as Ellipse2 } from './../../../assets/images/home-page/ellipse2.svg';
import { ReactComponent as Ellipse3 } from './../../../assets/images/home-page/ellipse3.svg';
import { ReactComponent as HowToParticipate1 } from './../../../assets/images/home-page/how-to-participate1.svg';
import { ReactComponent as HowToParticipate2 } from './../../../assets/images/home-page/how-to-participate2.svg';
import { ReactComponent as HowToParticipate3 } from './../../../assets/images/home-page/how-to-participate3.svg';
import { ReactComponent as HowToParticipate4 } from './../../../assets/images/home-page/how-to-participate4.svg';
import { supporters } from './constants';
import { cutArrayByThree, renderSwitch } from './helpers';
import styles from './HomePage.module.scss';
import { TypeSupporter } from './types';
import { useHomePage } from './useHomePage';

// const { TextArea } = Input;

function HomePage(): JSX.Element {
    const getSupporterClasses = (index): string => {
        return classNames(styles['supporter'], {
            [styles['supporter--left']]: index % 3 === 0,
            [styles['supporter--center']]: index % 3 === 1,
            [styles['supporter--right']]: index % 3 === 2,
        });
    };

    const supporterRows = cutArrayByThree(supporters);
    // const formRef = useRef<FormInstance>(null);
    
    const { questions, counterParameters, getFaqQuestions, getCounterParameters } = useHomePage();

    // const onSubmit = (e) => {
    //     console.log(e);
    // }

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        Promise.all([
            getFaqQuestions(),
            getCounterParameters(),
        ]).then(() => {
            console.log('loaded');
        });
    }, []);

    return (
        <div className={styles["home-page"]}>
            <div className="container">
                <div className={styles['main-section']}>
                    <div className="left-bar">
                        <div className={styles['main-section__title']}>Атомный диктант</div>
                        <div className={styles['main-section__desc']}>Проводится с целью проверить свои знания<br />и привлечь внимание широкой общественности <br /> к атомной отрасли</div>
                        <div className={styles['main-section__buttons']}>
                            <ButtonElem type={buttonElemType.Primary}>О проекте</ButtonElem>
                            <ButtonElem type={buttonElemType.Default}>Организаторы</ButtonElem>
                        </div>
                    </div>
                    <div className="right-bar">
                        {counterParameters?.data && <DictationTimer dictantDateString={counterParameters?.data as string} />}
                    </div>
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
                            {ReactHtmlParser(homePage.aboutProject.body.exampleImage)}
                            <div className={styles['expample-image__wing']}>
                                <div className={styles['expample-image__body']}>
                                    <div className={styles['expample-image__title']}>2021</div>
                                    <div className={styles['expample-image__description']}>Пример Диплома<br/>об окончании диктанта</div>
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
                            <ButtonElem type={buttonElemType.Primary}>{ReactHtmlParser(homePage.organizators.button.toOrganizationSiteBtn)}</ButtonElem>
                        </div>
                        <div className={styles['organizators__right-bar']}>
                            <div className={styles['organizators__image']}></div>
                        </div>
                    </div>
                </div>
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
                                            <div className={styles['supporter__bg']}>
                                                {renderSwitch(i)}
                                            </div>
                                            <div className={styles['supporter__avatar']} style={{ backgroundImage: 'url(supporters/'+ supporter.avatar +')' }}></div>
                                            <div className={styles['supporter__name']}>{ReactHtmlParser(supporter.fullName)}</div>
                                            <div className={styles['supporter__position']}>{ReactHtmlParser(supporter.position)}</div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        ))}
                    </div>
                </div>
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
                                <Ellipse1 />
                            </div>
                        </div>
                        <div className={styles['participant-step']}>
                            <div className={styles['participant-step__bg']}>
                                <HowToParticipate2 />
                            </div>
                            <div className={styles['participant-step__body']}>
                                <div className={styles['participant-step__number']}>2</div>
                                <div className={styles['participant-step__text']}>{ReactHtmlParser(homePage.howToParticipate.steps.second)}</div>
                            </div>
                            <div className={styles['participant-step__ellipse']}>
                                <Ellipse2 />
                            </div>
                        </div>
                        <div className={styles['participant-step']}>
                            <div className={styles['participant-step__bg']}>
                                <HowToParticipate3 />
                            </div>
                            <div className={styles['participant-step__body']}>
                                <div className={styles['participant-step__number']}>3</div>
                                <div className={styles['participant-step__text']}>{ReactHtmlParser(homePage.howToParticipate.steps.third)}</div>
                            </div>
                            <div className={styles['participant-step__ellipse']}>
                                <Ellipse3 />
                            </div>
                        </div>
                        <div className={styles['participant-step']}>
                            <div className={styles['participant-step__bg']}>
                                <HowToParticipate4 />
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