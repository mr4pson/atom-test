import { TypeAction, TypeCollapseConfig } from "components/uiKit/AdminCollapse/types";
import { ReactComponent as DoneIcon } from '../../../../assets/images/admin/done.svg';
import { ReactComponent as EditIcon } from '../../../../assets/images/admin/edit.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/images/admin/trash.svg';

export const actions = [
    {
        id: 'edit',
        icon: <EditIcon />,
        callback: (action: TypeAction, config: TypeCollapseConfig, formValues: Object) => {
            config.isEditing = !config.isEditing;

            if (config.isEditing) {
                action.icon = <DoneIcon />;
            } else {
                action.icon = <EditIcon />;
                Object.assign(config, formValues);
                console.log(config);
                // TODO request to backend
            }
        },
    },
    {
        id: 'Delete',
        icon: <TrashIcon />,
        callback: () => {
            console.log('Trash');
        },
    }
]