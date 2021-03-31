import { memo, useEffect } from "react";
import Navigation from 'components/modules/Navigation';
import styles from './OurPartnersPage.module.scss';
import { getUserInfo } from "components/common/commonHelper";
import { NavigationType } from "components/modules/Navigation/constants";
import ContactUs from "components/modules/ContactUs";
import OurPartnersItem from "./OurPartnersPageItem";
import { newspaperItems, partnersItems } from "./constants";
import classNames from 'classnames';
import FrequentlyAskedQuestions from "components/modules/FrequentlyAskedQuestions";
import { useHomePage } from "../HomePage/useHomePage";
import Loader from 'components/uiKit/Loader';

function OurPartnersPage() {
  const userInfo = getUserInfo(); 
  const { questions, getFaqQuestions } = useHomePage();

  useEffect(() => {
    getFaqQuestions();
  }, []);

  return <>
    <div className="container">
      <Navigation userInfo={userInfo!} navigationType={NavigationType.HEADER} />
      <div className={styles['our-partners-page']}>
        <div className={styles['our-partners-page__title']}>
          Наши партнёры
        </div>
        <div className={styles['our-partners-page__items-wrapper']}>
          {
            partnersItems.map((item) => {
              return <OurPartnersItem {...item} />
            })
          }
        </div>
        <div className={classNames(
          styles['our-partners-page__title'], styles['our-partners-page__newspaper'])
        }>
          Газеты
        </div>
        <div className={styles['our-partners-page__items-wrapper']}>
          {
            newspaperItems.map((item) => {
              return <OurPartnersItem {...item} />
            })
          }
        </div>
        {
          questions.length ? <FrequentlyAskedQuestions questions={questions} />
            : <Loader className={'partners-loader'} />
        }
        <ContactUs />
        <Navigation navigationType={NavigationType.FOOTER} />
      </div>
    </div>
  </>
}

export default memo(OurPartnersPage);
