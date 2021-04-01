import { memo } from "react";
import styles from './OurPartnersItem.module.scss';
import { Link } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  link: string;
  massMedia?: string;
  uploadFile: string;
}

function OurPartnersItem(props: Props) {

  return <div className={styles["our-partners-item"]}>
    <a className={styles['our-partners-item__link']} href={props.link}>
      <span className={styles['our-partners-item__img-wrapper']}>
        <div style={{ backgroundImage: `url(${props.uploadFile})` }} className={styles['our-partners-item__image']} />
      </span>
    </a>
    <div className={styles['our-partners-item__title']}>{props.title}</div>
    <div className={styles['our-partners-item__heading']}>{props.massMedia}</div>
    {/* <Link to={`${paths[Page.PAGE]}/${props.id}`} className={styles['page-item__link']}>Читать полностью</Link> */}
  </div>
}

export default memo(OurPartnersItem);
