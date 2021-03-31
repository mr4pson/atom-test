import { memo } from "react";
import styles from './OurPartnersItem.module.scss';
// import { Link } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  heading?: string;
  image: string;
}

function OurPartnersItem(props: Props) {

  return <div className={styles["our-partners-item"]}>
    <div className={styles['our-partners-item__img-wrapper']}>
      <div style={{ backgroundImage: `url(${props.image})`}} className={styles['our-partners-item__image']} />
    </div>
    <div className={styles['our-partners-item__title']}>{props.title}</div>
    <div className={styles['our-partners-item__heading']}>{props.heading}</div>
    {/* <Link to={`${paths[Page.PAGE]}/${props.id}`} className={styles['page-item__link']}>Читать полностью</Link> */}
  </div>
}

export default memo(OurPartnersItem);
