import { Pagination } from 'antd';
import ContactUs from "components/modules/ContactUs";
import { memo, useEffect } from "react";
import { useParams } from 'react-router';
import { pages } from "./constants";
import PageItem from './PageItem';
import styles from './PagesPage.module.scss';

function PagesPage() {

  const { categoryLink, subcategoryLink } = useParams<{ categoryLink: string, subcategoryLink: string }>();
  console.log(categoryLink, subcategoryLink);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return <>
    <div className="container">
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
      </div>
    </div>
  </>
}

export default memo(PagesPage);
