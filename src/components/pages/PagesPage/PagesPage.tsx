import { memo, useEffect } from "react";
import Navigation from 'components/modules/Navigation';
import styles from './PagesPage.module.scss';
import { getUserInfo } from "components/common/commonHelper";
import { NavigationType } from "components/modules/Navigation/constants";
import ContactUs from "components/modules/ContactUs";
import PageItem from './PageItem';
import { pages } from "./constants";
import { Pagination } from 'antd';

function PagesPage() {
  const userInfo = getUserInfo();

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return <>
    <div className="container">
      <Navigation userInfo={userInfo!} navigationType={NavigationType.HEADER} />
      <div className={styles["pages-page"]}>
        <div className={styles["pages-page__title"]}>
          Новости
        </div>
        <div className={styles['pages-page__items-wrapper']}>
          {
            pages.map((item) => {
              return <PageItem {...item} />
            })
          }
        </div>
        <Pagination
          className={styles['pages-page__pagination']}
          defaultCurrent={1}
          total={pages.length}
          pageSize={1}
        />
        <ContactUs />
        <Navigation navigationType={NavigationType.FOOTER} />
      </div>
    </div>
  </>
}

export default memo(PagesPage);
