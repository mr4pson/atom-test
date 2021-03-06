import { Checkbox, Col, Radio, Row } from 'antd';
import classNames from 'classnames';
import { getImageUrl } from 'components/common/commonHelper';
import { QuestionType } from "components/pages/UserTest/types";
import { memo } from "react";
import styles from './UserTestOption.module.scss';

type Props = {
    type: QuestionType;
    value: string;
    children: string;
    url?: string;
}

function UserTestOption(props: Props): JSX.Element {
    function getNavigationClassName(type: QuestionType): string {
        return classNames({
            [styles['user-test-option']]: true,
            [styles['user-test-option--with-picture']]: [
                QuestionType.SENGLE_PICTURE,
                QuestionType.MULTIPLE_PICTURE
            ].includes(type),
        })
    }

    return (
        <div className={getNavigationClassName(props.type)}>
            {props.type === QuestionType.SINGLE && 
                <Radio value={props.value}>
                    <span className={styles['user-test-option__label']}>{props.children}</span>
                </Radio>
            }
            {props.type === QuestionType.MULTIPLE && 
                <Row>
                    <Col span={24}>
                        <Checkbox value={props.value}>
                            <span className={styles['user-test-option__label']}>{props.children}</span>
                        </Checkbox>
                    </Col>
                </Row>
            }
            {props.type === QuestionType.SENGLE_PICTURE && 
                <Radio className="user-test-option-multiple" value={props.value}>
                    <div
                        className={styles['user-test-option__image']} 
                        style={{backgroundImage: `url(${getImageUrl(props.url!)}`}}
                    ></div>
                </Radio>
            }
            {props.type === QuestionType.MULTIPLE_PICTURE && 
                <Checkbox className="user-test-option-multiple" value={props.value}>
                    <div
                        className={styles['user-test-option__image']} 
                        style={{backgroundImage: `url(${getImageUrl(props.url!)}`}}
                    ></div>
                </Checkbox>
            }
        </div>
    );
}

export default memo(UserTestOption);