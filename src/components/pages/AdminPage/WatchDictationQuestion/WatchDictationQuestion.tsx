import { FormInstance, Input } from "antd";
import ButtonElem from "components/uiKit/ButtomElem";
import { buttonElemType, htmlType } from "components/uiKit/ButtomElem/types";
import { memo, useRef, useEffect } from "react";
import styles from "./WatchDictationQuestion.module.scss";
import TextRedactor from "components/uiKit/TextRedactor";
import { AdminsPage, paths } from "../routes/constants";
import { useHistory, useParams } from "react-router";
import Loader from 'components/uiKit/Loader';
import { useCheckRole } from "components/hooks/useCheckRole";
import { useWatchDictationQuestion } from "./useWatchDictationQuestion";
import { useUpdateDictationQuestions } from "../DictationQuestionsPage/useUpdateDictationQuestions";

function WatchDictationQuestion(): JSX.Element {
  const formRef = useRef<FormInstance>(null);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const { loadingWatch, currentQuestion, getCurrentQuestion } = useWatchDictationQuestion();
  const { deleteDictationQuestion } = useUpdateDictationQuestions();

  async function onDelete(): Promise<void> {
    if (id) {
      await deleteDictationQuestion(id);
    }
    history.push(paths[AdminsPage.DICTATION_QUESTIONS]);
  }

  useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

  useEffect(() => {
    if (id) {
      getCurrentQuestion(id);
    }
  }, []);

  return (
    <>
      {(id ? currentQuestion : true) ? (
        <div className={styles["add-partner-page"]}>
          <ButtonElem
            type={buttonElemType.Primary}
            htmlType={htmlType.SUBMIT}
            className={styles["add-partner-page__button-add"]}
            loading={loadingWatch}
            onClick={onDelete}
          >
            Удалить сообщение
          </ButtonElem>
          <div className={styles["page-content"]}>
            <div className={styles["page-content__header"]}>
              <div className={styles["page-content__title"]}>
                Имя пользователя
              </div>
              <div className={styles["form-item"]}>
                <Input
                  className={styles["page-content__input"]}
                  placeholder="Имя пользователя"
                  type="text"
                  value={currentQuestion?.fullName}
                  disabled={loadingWatch}
                />
              </div>
              <div className={styles["page-content__title"]}>
                Email
              </div>
              <div className={styles["form-item"]}>
                <Input
                  className={styles["page-content__input"]}
                  placeholder="Email пользователя"
                  type="url"
                  value={currentQuestion?.email}
                  disabled={loadingWatch}
                />
              </div>
            </div>
            <div className={styles["page-content-description"]}>
              <div className={styles["page-content__title"]}>
                Сообщение
              </div>
              <div className={styles["form-item"]}>
                <TextRedactor
                  initialValue={currentQuestion?.message!}
                  formRef={formRef}
                />
              </div>
            </div>
          </div>
        </div>
      ) : <Loader className={'admin-loader'} />}
    </>
  );
}

export default memo(WatchDictationQuestion);
