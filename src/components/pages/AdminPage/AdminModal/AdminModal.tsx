import { memo, ReactNode } from 'react';
import styles from './AdminModal.module.scss';
import { Modal } from 'antd';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import classNames from 'classnames';
import ButtonElem from 'components/uiKit/ButtomElem';

type Props = {
  title: string;
  isModalVisible: boolean;
  loading: boolean;
  children: ReactNode;
  handleDelete: () => void;
  handleCancel: () => void;
}

function AdminModal(props: Props): JSX.Element {
    return (
      <Modal
        title={props.title}
        className={classNames("delete-modal", styles["delete-modal"])}
        visible={props.isModalVisible}
        onOk={props.handleDelete}
        onCancel={props.handleCancel}
        footer={[
          <ButtonElem
            className={styles["return-btn"]}
            key="back"
            onClick={props.handleCancel}
          >
            Вернуться
          </ButtonElem>,
          <ButtonElem
            className={styles["submit-btn"]}
            key="submit"
            type={buttonElemType.Primary}
            loading={props.loading}
            onClick={props.handleDelete}
          >
            Подтвердить
          </ButtonElem>,
        ]}
      >
        {props.children}
      </Modal>
    );
}

export default memo(AdminModal);