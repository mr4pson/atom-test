import { memo, ReactNode } from 'react';
import styles from './AdminModal.module.scss';
import { Modal } from 'antd';
import { buttonElemType } from 'components/uiKit/ButtomElem/types';
import classNames from 'classnames';
import ButtonElem from 'components/uiKit/ButtomElem';

type Props = {
  isModalVisible: boolean;
  loading: boolean;
  chosenNews: string;
  children: ReactNode;
  showModal: (text: any) => void;
  handleOk: () => void;
  handleCancel: () => void;
}

function AdminModal(props: Props): JSX.Element {
    return (
      <Modal
        title={`Удаление "${props.chosenNews}"`}
        className={classNames("delete-modal", styles["delete-modal"])}
        visible={props.isModalVisible}
        onOk={props.handleOk}
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
            onClick={props.handleOk}
          >
            Подтвердить
          </ButtonElem>,
        ]}
      >
        <span>Вы действительно хотите удалить "{props.chosenNews}"?</span>
      </Modal>
    );
}

export default memo(AdminModal);