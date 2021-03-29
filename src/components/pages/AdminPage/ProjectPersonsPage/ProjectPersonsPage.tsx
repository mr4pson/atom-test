import { memo, useEffect, useState } from "react";
import styles from "./ProjectPersonsPage.module.scss";
import { Form, Input } from "antd";
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import ButtonElem from "components/uiKit/ButtomElem";
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import axios from "axios";
import { useCheckRole } from "components/hooks/useCheckRole";

function ProjectPersonsPage(): JSX.Element {
  const { TextArea } = Input;

  const [projectPersons, setProjectPersons] = useState<any[]>([]);

  const getProjectPersonsData = async () => {
    const menuElemsResponse = await axios.get<any[]>(
      "/mocks/getProjectPersonsData.json"
    );
    const newResponse = menuElemsResponse.data.map((item) => ({
      ...item,
      // actions: getActions(false)
    }));
    setProjectPersons(newResponse);
  };

  useCheckRole('У вас нет доступа к панели администратора, т.к. вы обычный пользователь!');

  useEffect(() => {
    getProjectPersonsData();
  }, []);

  return (
    <div className={styles["project-presons-page"]}>
      <div className={styles["project-presons-page__create-wrap"]}>
        <ButtonElem
          type={buttonElemType.Primary}
          htmlType="button"
          className={styles["project-presons-page__create-btn"]}
          onClick={() => {}}
        >
          Добавить лицо
        </ButtonElem>
      </div>
      <div className={styles["project-presons-page__items"]}>
        {projectPersons.map((question, index) => (
          <AdminCollapseElem key={index} config={question}>
            <Form.Item name="description">
              <TextArea placeholder="Введите ответ" rows={1} />
            </Form.Item>
          </AdminCollapseElem>
        ))}
      </div>
    </div>
  );
}

export default memo(ProjectPersonsPage);
