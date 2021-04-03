import { memo } from "react";
import { useParams } from "react-router";
import styles from './ChosenPage.module.scss';

function ChosenPage() {

  const { link } = useParams<{ link: string }>();
  console.log(link);

  return <div className="container">
    <div className={styles["chosen-page"]}>
      <div className={styles['chosen-page__image-headers-wrapper']}>
        <div className={styles['chosen-page__image']} />
        <div className={styles['chosen-page__headers']}>
          <span>Предложенная новость</span>
          <span>Другая новость</span>
          <span>Длинный заголовок новости</span>
          <span>Очень длинный заголовок новости</span>
        </div>
      </div>
      <div className={styles["chosen-page__title"]}>
        Заголовок новости
      </div>
      <div className={styles["chosen-page__creation-time"]}>
        28:03:2021
      </div>
      <div className={styles["chosen-page__description"]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien feugiat massa egestas sem duis egestas natoque. Justo, lectus lorem ultrices arcu. Eget aliquet at tristique dignissim etiam pharetra elit molestie bibendum. Odio nulla urna, nunc, vel. Malesuada morbi morbi feugiat aliquet posuere velit. Praesent felis ut malesuada urna. <br/>
        Lorem integer urna integer lectus leo vitae. Netus congue risus ac pellentesque morbi nulla. Aenean lectus sed morbi scelerisque id felis hendrerit erat. Pulvinar vel scelerisque massa orci imperdiet risus, adipiscing enim nibh. Volutpat sagittis, praesent praesent urna amet tempus. Porttitor massa at dictumst neque tristique. Risus arcu commodo neque sed mattis. Velit lacus nisl, bibendum sed. Mollis sed purus morbi fermentum, aliquam maecenas interdum tincidunt porttitor.<br/>
        Erat interdum aliquam dolor, urna ultrices in habitant praesent mauris. Augue risus dictum ut turpis sem. Metus in a duis pellentesque purus adipiscing pellentesque eu tellus. Gravida quisque dictum quisque at ac egestas a amet. Maecenas auctor imperdiet nunc leo integer feugiat. Amet aenean erat nulla ut gravida nulla tellus. Suscipit ultrices laoreet maecenas purus eget et. Volutpat enim, tristique quam ipsum. Tortor sed mauris eros, orci vulputate mauris ultricies. Faucibus habitasse consectetur non tincidunt nunc vitae nec. Viverra vivamus morbi pellentesque sed eget.<br/>
        Volutpat, quam ipsum eget duis aliquam molestie purus nec. In fusce velit feugiat lobortis placerat sagittis, feugiat odio. Volutpat feugiat at massa nibh dictum magnis neque. Eget quis pretium, eget consectetur pulvinar risus arcu. Adipiscing aliquet suspendisse pellentesque dolor. Aliquet aliquam elit neque ac commodo. Mi tellus, auctor rhoncus ullamcorper tristique sed bibendum tincidunt. Justo aenean aenean sit porttitor eu proin sit. Pharetra sit integer in rhoncus vel etiam. At vitae nibh enim pellentesque sem amet. Arcu sodales aliquet justo ac id tempor.
      </div>
    </div>
  </div>
}

export default memo(ChosenPage);
