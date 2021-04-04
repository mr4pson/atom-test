import { memo } from "react";
import styles from './PageItem.module.scss';
import { Link } from "react-router-dom";
import { Page, paths } from "routes/constants";
import ReactHtmlParser from 'react-html-parser';
import moment from "moment";

type Props = {
  id: string;
  name: string;
  description: string;
  uploadFile: string;
  createdAt: string;
  url: string;
}

function PageItem(props: Props) {
  const formatDate = (dateString: string) => {
    const date = moment(dateString);
    return date.format('DD.MM.YYYY');
  };
  return <div className={styles["page-item"]}>
    <div className={styles['page-item__image']} />
    <div className={styles['page-item__title']}>{props.name}</div>
    <div className={styles['page-item__description']}>{ReactHtmlParser(props.description)}</div> 
    <div className={styles['page-item__footer']}>
      <span className={styles['page-item__creation-date']}>{formatDate(props.createdAt)}</span>
      <Link to={`${paths[Page.PAGE]}/${props.url}`} className={styles['page-item__link']}>Читать полностью</Link>
    </div>
  </div>
}

export default memo(PageItem);