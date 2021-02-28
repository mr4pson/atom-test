import { memo } from 'react';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import ButtonElem from 'components/uiKit/ButtomElem';
import styles from './HomePage.module.scss';
import { homePage } from 'i18n'
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import DictationTimer from 'components/modules/DictationTimer';
import ReactHtmlParser from 'react-html-parser';
import { Row, Col } from 'antd';
import classNames from 'classnames';
import { supporters } from './constants';
import { TypeSupporter } from './types';
import { cutArrayByThree } from './helpers';
import { ReactComponent as SupporterLeft } from './../../../assets/images/supporter-left.svg';
import { ReactComponent as SupporterCenter } from './../../../assets/images/supporter-center.svg';
import { ReactComponent as SupporterRight } from './../../../assets/images/supporter-right.svg';

function HomePage(): JSX.Element {
    const getSupporterClasses = (index): string => {
        return classNames(styles['supporter'], {
            [styles['supporter--left']]: index % 3 == 0,
            [styles['supporter--center']]: index % 3 == 1,
            [styles['supporter--right']]: index % 3 == 2,
        });
    };

    const supporterRows = cutArrayByThree(supporters);

    const renderSwitch = (index: number): JSX.Element => {
        switch(index % 3) {
            case 0:
                return <SupporterLeft/>;
            case 1:
                return <SupporterCenter/>;
            case 2:
                return <SupporterRight/>;
            default:
                return <SupporterLeft/>;
        }
    }

    return (
        <div className={styles["home-page"]}>
            <div className="container">
                <Navigation navigationType={NavigationType.HEADER} />
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
                        <DictationTimer />
                    </div>
                </div>
                <div className={styles['about-project']}>
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
                <div className={styles['organizators']}>
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
                            <Row>
                                {supporterRow.map((supporter: TypeSupporter, index) => (
                                    <Col span={8} className={styles['gutter-row']}>
                                        <div key={index} className={getSupporterClasses(index)}>
                                            <div className={styles['supporter__bg']}>
                                                {renderSwitch(index)}
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
                <Navigation navigationType={NavigationType.FOOTER} />
            </div>
        </div>
    );
}

export default memo(HomePage);