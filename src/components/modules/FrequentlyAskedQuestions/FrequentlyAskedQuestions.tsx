import { TypeFaqQuestion } from "components/pages/AdminPage/FaqPage/types";
import { memo } from "react";
import ReactHtmlParser from 'react-html-parser';
import styles from './FrequentlyAskedQuestions.module.scss';
import CollapseElem from 'components/uiKit/CollapseElem/CollapseElem';
import { homePage } from 'i18n';

type Props = {
  questions: TypeFaqQuestion[];
}

function FrequentlyAskedQuestions(props: Props): JSX.Element {
  return <div className={styles['q-and-a']}>
    <div className={styles['q-and-a__title']}>
      {ReactHtmlParser(homePage.frequentlyAskedQuestions.title)}
    </div>
    <div className={styles['q-and-a__body']}>
      {props.questions.map((question, index) => (
        <CollapseElem key={index} title={question.title}>{question.description as string}</CollapseElem>
      ))}
    </div>
  </div>
}

export default memo(FrequentlyAskedQuestions);