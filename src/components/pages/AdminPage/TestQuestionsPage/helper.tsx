import { TypeAction, TypeCollapseConfig } from "components/uiKit/AdminCollapse/types";
import { ReactComponent as DoneIcon } from '../../../../assets/images/admin/done.svg';
import { ReactComponent as EditIcon } from '../../../../assets/images/admin/edit.svg';
import { ReactComponent as ImageIcon } from '../../../../assets/images/admin/image.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/images/admin/trash.svg';
import { TypeTestQuestion } from "./types";

export const getQuestionActions = (
    isEditing: boolean = false,
    setTestQuestions: React.Dispatch<React.SetStateAction<TypeTestQuestion[]>>,
    testQuestions: TypeTestQuestion[]
): TypeAction[] => {
    return [
        {
            id: 'image',
            icon: <ImageIcon />,
            callback: (action: TypeAction, config: TypeCollapseConfig) => {
                console.log(config.data);
            },
        },
        {
            id: 'edit',
            icon: !isEditing ? <EditIcon /> : <DoneIcon />,
            callback: (action: TypeAction, config: TypeCollapseConfig, formValues: Object) => {
                config.isEditing = !config.isEditing;

                if (config.isEditing) {
                    action.icon = <DoneIcon />;
                } else {
                    action.icon = <EditIcon />;
                    Object.assign(config, formValues);
                    // TODO request to backend
                    if (config.id) {
                        console.log('update');
                    } else {
                        console.log('create');
                        // TODO remove and replace with requested ID
                        config.id = Math.round(Math.random() * 100);
                    }
                    console.log(config);
                }
            },
        },
        {
            id: 'Delete',
            icon: <TrashIcon />,
            callback: (action: TypeAction, config: TypeCollapseConfig) => {
                if (!config.id) {
                    return;
                } 
                if (window.confirm(`Вы уверены, что хотите удалить вопрос №${config.id}`)) {
                    // TODO request to backend
                    setTestQuestions(testQuestions.filter(faqQuestion => faqQuestion.id !== config.id));
                }
            },
        }
    ]
}