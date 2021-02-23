import { memo } from 'react';
import Navigation from 'components/modules/Navigation';
import { NavigationType } from 'components/modules/Navigation/constants';
import styles from './HomePage.module.scss';
import { homePage } from 'i18n'

function HomePage(): JSX.Element {
    return (
        <div className={styles["home-page"]}>
            <div className="container">
                <Navigation navigationType={NavigationType.HEADER}/>
                <div className={styles['about-project']}>
                    <div className={styles['about-project__title']}>
                        {homePage.aboutProject.title}
                    </div>
                    <div className={styles['about-project__sub-title']}>
                        {homePage.aboutProject.subTitle}
                    </div>
                    <div className={styles['dictant']}>
                        <div className={styles['dictant__example-image']}>
                            {homePage.aboutProject.body.exampleImage}
                        </div>
                        <div className={styles['dictant__info']}>
                            <div className={styles['dictant__paragraphs']}>
                                <span>{homePage.aboutProject.body.firstParagraph}</span>
                                <ul>
                                    <li>{homePage.aboutProject.body.firstListItem}</li>
                                    <li>{homePage.aboutProject.body.secondListItem}</li>
                                </ul>
                                <span>{homePage.aboutProject.body.secondParagraph}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles['about-project__footer']}>
                        <span>{homePage.aboutProject.footer}</span>
                    </div>
                </div>
                <Navigation navigationType={NavigationType.FOOTER}/>
            </div>
        </div>
    );
}

export default memo(HomePage);