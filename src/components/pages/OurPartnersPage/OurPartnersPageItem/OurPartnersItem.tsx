import { getImageUrl } from "components/common/commonHelper";
import { memo } from "react";
import styles from './OurPartnersItem.module.scss';

type Props = {
  id: string;
  title: string;
  link: string;
  organizationType?: any;
  ownType?: string;
  uploadFile: string;
  visible: boolean;
}

function OurPartnersItem(props: Props) {
  return <>
    {
      props.visible && <div className={styles["our-partners-item"]}>
        <a target="__blank" className={styles['our-partners-item__link']} href={props.link}>
          <span className={styles['our-partners-item__img-wrapper']}>
            <div
              style={{ backgroundImage: `url(${getImageUrl(props.uploadFile)})` }}
              className={styles['our-partners-item__image']}
            />
          </span>
        </a>
        <div className={styles['our-partners-item__title']}>{props.title}</div>
        <div className={styles['our-partners-item__heading']}>{props.ownType ? props.ownType : props.organizationType?.title}</div>
      </div>
    }
  </>
}

export default memo(OurPartnersItem);
