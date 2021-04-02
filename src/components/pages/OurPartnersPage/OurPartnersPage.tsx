import { memo, useEffect } from "react";
import Navigation from 'components/modules/Navigation';
import styles from './OurPartnersPage.module.scss';
import { getUserInfo } from "components/common/commonHelper";
import { NavigationType } from "components/modules/Navigation/constants";
import ContactUs from "components/modules/ContactUs";
import OurPartnersItem from "./OurPartnersPageItem";
import classNames from 'classnames';
import FrequentlyAskedQuestions from "components/modules/FrequentlyAskedQuestions";
import { useHomePage } from "../HomePage/useHomePage";
import Loader from 'components/uiKit/Loader';
import { useRemovePartner } from "../AdminPage/PartnersPage/useRemovePartner";
import { useGetOrganizationTypes } from "../AdminPage/AddPartnerPage/useGetOrganizationTypes";

function OurPartnersPage() {
  const userInfo = getUserInfo();
  const { questions, getFaqQuestions } = useHomePage();
  const { loading, getPartners, partners, getMagazines, magazines } = useRemovePartner();
  const { organizationTypes, getOrganizationTypes } = useGetOrganizationTypes();

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    (async () => {
      await Promise.all([
        getFaqQuestions(),
        getPartners(),
        getOrganizationTypes(),
      ])
    })();
  }, []);

  useEffect(() => {
    const magazineObject = organizationTypes.find(
      organizationType => organizationType.title === 'Газета'
    );
    if (magazineObject) {
      getMagazines(magazineObject?.id);
    }
  }, [organizationTypes])

  return <>
    <div className="container">
      <Navigation userInfo={userInfo!} navigationType={NavigationType.HEADER} />
      <div className={styles['our-partners-page']}>
        <div className={styles['our-partners-page__title']}>
          Наши партнёры
        </div>
        <div className={styles['our-partners-page__items-wrapper']}>
          {
            !loading ?
              partners.map((item) => {
                return <OurPartnersItem
                id={item?.id!}
                title={item.title}
                link={item.link}
                organizationType={item.organizationType}
                uploadFile={item?.uploadFile!}
              />
              }) : <Loader className={'partners-loader'} />
          }
        </div>
        <div className={classNames(
          styles['our-partners-page__title'], styles['our-partners-page__newspaper'])
        }>
          Газеты
        </div>
        <div className={styles['our-partners-page__items-wrapper']}>
          {
            magazines.map((item) => {
              return <OurPartnersItem
              id={item?.id!}
              title={item.title}
              link={item.link}
              organizationType={item.organizationType}
              uploadFile={item?.uploadFile!}
            />
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
