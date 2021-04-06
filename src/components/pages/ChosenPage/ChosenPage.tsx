import axios from "axios";
import { getImageUrl } from "components/common/commonHelper";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import ReactHtmlParser from 'react-html-parser';
import { useLocation, useParams } from "react-router";
import { HashLink as Link } from 'react-router-hash-link';
import { TypeNewsPageData } from "../AdminPage/NewsPage/types";
import { getJwtPair } from '../LoginPage/helpers';
import styles from './ChosenPage.module.scss';
import Loader from 'components/uiKit/Loader';

function ChosenPage() {
  const [news, setNews] = useState<TypeNewsPageData>();
  const [recommendedNews, setRecommendedNews] = useState<TypeNewsPageData[]>();
  const { link } = useParams<{ link: string }>();
  const curJwtPair = getJwtPair();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPage = async () => {
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    const response = await axios.get<TypeNewsPageData>('/api/news/getByLink/' + link, options);
    setNews({
      ...response.data,
      createdAt: moment(response.data.createdAt).format('DD.MM.YYYY'),
    });
  }

  const getRecommendedNews = async () => {
    const options = {
      headers: {
          'Authorization': `Bearer ${await curJwtPair}`,
          'withCredentials': true
      },
    }
    const response = await axios.get<TypeNewsPageData[]>('/api/news/getRecommendedList/' + link, options);
    setRecommendedNews(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getPage(),
      getRecommendedNews(),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [location]);

  return <div className="container">
    {!isLoading ? <div className={styles["chosen-page"]}>
      <div className={styles['chosen-page__image-headers-wrapper']}>
        <div style={{ backgroundImage: `url(${getImageUrl(news?.uploadFile)})` }} className={styles['chosen-page__image']} />
        <div className={styles['chosen-page__headers']}>
          {recommendedNews?.map((recommendedNewsItem) => (
            <Link to={'/page/' + recommendedNewsItem.url}>{recommendedNewsItem.name}</Link>
          ))}
        </div>
      </div>
      <div className={styles["chosen-page__title"]}>
        {news?.name}
      </div>
      <div className={styles["chosen-page__creation-time"]}>
        {news?.createdAt}
      </div>
      <div className={styles["chosen-page__description"]}>
        {ReactHtmlParser(news?.description)}
      </div>
    </div>
    : <Loader/>}
  </div>
}

export default memo(ChosenPage);
