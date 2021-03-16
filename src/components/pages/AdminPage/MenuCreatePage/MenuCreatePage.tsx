import ButtonElem from "components/uiKit/ButtomElem";
import { buttonElemType } from "components/uiKit/ButtomElem/types";
import { memo } from "react";
import AdminCollapseElem from "components/uiKit/AdminCollapse";
import styles from "./MenuCreatePage.module.scss";
import { TypeMenu } from "./types";
import Icon from "components/uiKit/Icon";
import { editIcon } from "icons";

type Props = {

}

function MenuCreatePage(props: Props): JSX.Element {
    const menuElem: TypeMenu = {
        id: 0,
        title: 'Название меню',
        body: '',
        actions: [
            {
                id: "edit",
                icon: (
                    <Icon
                        className={styles["action-icon__edit"]}
                        path={editIcon.path}
                        viewBox={editIcon.viewBox}
                    />
                ),
                callback: () => {
                    console.log('edit');
                },
            },
        ]
    }
    return (
        <div className={styles['menu-create-page']}>
            <div className={styles['menu-create-page__actions']}>
                <ButtonElem
                    type={buttonElemType.Primary}
                    htmlType="button"
                    className={styles["menu-create-page__create-btn"]}
                    onClick={() => { }}
                >
                    Добавить меню
                </ButtonElem>
            </div>
            <AdminCollapseElem className={'menu-create-page__main-collapse'} config={menuElem}>
                {/* <Form.Item name="description">
                <TextArea placeholder="Введите ответ" rows={1} />
                </Form.Item> */}
            </AdminCollapseElem>
            <div className={styles['menu-create-page__info']}>Расположите элементы в желаемом порядке путём перетаскивания. Можно также щёлкнуть на стрелку справа от пункта меню, чтобы открыть дополнительные настройки.</div>
        </div>
    );
}

export default memo(MenuCreatePage);