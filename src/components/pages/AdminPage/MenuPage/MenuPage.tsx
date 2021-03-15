import { memo, useEffect, useState } from "react";
import styles from "./MenuPage.module.scss";
import { Form, Input } from "antd";
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import ButtonElem from "components/uiKit/ButtomElem";
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import axios from "axios";

function MenuPage(): JSX.Element {
  const { TextArea } = Input;

  const [menuElems, setMenuElems] = useState<any[]>([]);

  const getMenuPageData = async () => {
    const menuElemsResponse = await axios.get<any[]>(
      "/mocks/getMenuPageData.json"
    );
    const newResponse = menuElemsResponse.data.map((item) => ({
      ...item,
      // actions: getActions(false)
    }));
    setMenuElems(newResponse);
  };

  useEffect(() => {
    getMenuPageData();
  }, []);

  return (
    <div className={styles["menu-page"]}>
      <div className={styles["menu-page__create-wrap"]}>
        <ButtonElem
          type={buttonElemType.Primary}
          htmlType="button"
          className={styles["menu-page__create-btn"]}
          onClick={() => {}}
        >
          Добавить меню
        </ButtonElem>
      </div>
      <div className={styles["menu-page__items"]}>
        {menuElems.map((question, index) => (
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

export default memo(MenuPage);
