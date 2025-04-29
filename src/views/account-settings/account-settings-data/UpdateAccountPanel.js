import { Column } from "components";
import UpdateName from "../account-settings-actions/UpdateName";
import UpdatePassword from "../account-settings-actions/UpdatePassword";
import DeleteAccount from "../account-settings-actions/DeleteAccount";

const UpdateAccountPanel = ({fieldToUpdate, fields, setSidebarIsOpen, ...props}) => {
    return (
        <Column style={{width: '100%'}}>
            {fieldToUpdate === fields.NAME && <UpdateName setSidebarIsOpen={setSidebarIsOpen} {...props}/>}
            {fieldToUpdate === fields.PASSWORD && <UpdatePassword setSidebarIsOpen={setSidebarIsOpen} {...props}/>}
            {fieldToUpdate === fields.DELETE_ACCOUNT && <DeleteAccount setSidebarIsOpen={setSidebarIsOpen} {...props}/>}
        </Column>
    );
}
 
export default UpdateAccountPanel;