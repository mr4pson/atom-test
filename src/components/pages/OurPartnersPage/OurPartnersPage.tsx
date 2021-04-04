import classNames from 'classnames';
import ContactUs from "components/modules/ContactUs";
import FrequentlyAskedQuestions from "components/modules/FrequentlyAskedQuestions";
import Loader from 'components/uiKit/Loader';
import { memo, useEffect } from "react";
import { useGetOrganizationTypes } from "../AdminPage/AddPartnerPage/useGetOrganizationTypes";
import { useRemovePartner } from "../AdminPage/PartnersPage/useRemovePartner";
import { useHomePage } from "../HomePage/useHomePage";
import styles from './OurPartnersPage.module.scss';
import OurPartnersItem from "./OurPartnersPageItem";

function OurPartnersPage() {
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
  
  console.log(partners);

  return <>
    <div className="container">
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
                visible={item.visible}
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
              visible={item.visible}
            />
            })
          }
        </div>
        {
          questions.length ? <FrequentlyAskedQuestions questions={questions} />
            : <Loader className={'partners-loader'} />
        }
        <ContactUs />
      </div>
    </div>
  </>
}

export default memo(OurPartnersPage);
