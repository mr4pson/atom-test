import { memo } from "react";
import styles from './PageItem.module.scss';
import { Link } from "react-router-dom";
import { Page, paths } from "routes/constants";

type Props = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

function PageItem(props: Props) {

  return <div className={styles["page-item"]}>
    <div className={styles['page-item__image']} />
    <div className={styles['page-item__title']}>{props.title}</div>
    <div className={styles['page-item__description']}>{props.description}</div> 
    <div className={styles['page-item__footer']}>
      <span className={styles['page-item__creation-date']}>{props.createdAt}</span>
      <Link to={paths[Page.PAGE_ROUTE]} className={styles['page-item__link']}>Читать полностью</Link>
    </div>
  </div>
}

export default memo(PageItem);