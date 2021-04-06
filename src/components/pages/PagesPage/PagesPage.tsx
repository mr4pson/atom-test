// import { Pagination } from 'antd';
import axios from 'axios';
import ContactUs from "components/modules/ContactUs";
import { memo, useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router';
import { getJwtPair } from '../LoginPage/helpers';
import PageItem from './PageItem';
import styles from './PagesPage.module.scss';
import { TypePage } from './types';
import Loader from 'components/uiKit/Loader';
import { TypeMenu } from '../AdminPage/MenuPage/types';

function PagesPage() {

  const { categoryLink, subcategoryLink } = useParams<{ categoryLink: string, subcategoryLink: string }>();
  const curJwtPair: string = getJwtPair();
  const [pages, setPages] = useState<TypePage[]>([]);
  const [menu, setMenu] = useState<TypeMenu>();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const options = {
    headers: {
        'Authorization': `Bearer ${curJwtPair}`,
        'withCredentials': true
    },
  }

  const getPages = async () => {
    const response = await axios.get<TypePage[]>('/api/news/' + categoryLink + '/' + subcategoryLink, options);
    setPages(response.data.map((page) => ({
      ...page,
      description: page.description.slice(0, 300),
    })));
  }

  const getMenuByLink = async () => {
    const response = await axios.get<TypeMenu>('/api/subcategories/byLink/' + subcategoryLink, options);
    setMenu(response.data);
  }

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setIsLoading(true);
    Promise.all([
      getMenuByLink(),
      getPages(),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [location]);

  return <>
    <div className="container">
      {!isLoading ? 
        <div className={styles["pages-page"]}>
          <div className={styles["pages-page__title"]}>
            {menu?.title}
          </div>
          {pages.length ? 
            <>
              <div className={styles['pages-page__items-wrapper']}>
                {
                  pages.map((item) => {
                    return <PageItem {...item} />
                  })
                }
              </div>
              {/* <Pagination
                className={styles['pages-page__pagination']}
                defaultCurrent={1}
                total={pages.length}
                pageSize={1}
              /> */}
              <ContactUs />
            </>
          : <h3>Список пуст</h3>}
          </div>
        : <Loader className={'default-loader'} />
      }
    </div>
  </>
}

export default memo(PagesPage);
