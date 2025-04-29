import { Column, Divider, FilledButton, Row, TextButton, Typography } from "components";
import { useAuth } from "hooks";

const AccountSettingsPanel = ({fields, setFieldToUpdate, setSidebarIsOpen, ...props}) => {

    const {user} = useAuth();

    const handleEditField = (fieldToEdit) => {
        setFieldToUpdate(fieldToEdit);
        setSidebarIsOpen(true);
    }

    const getField = (category, content, fieldToUpdate, mutable) => {
        return (
            <Row
                style={{
                    backgroundColor: 'var(--background-color-medium)', 
                    width: '100%', 
                    padding: '2rem', 
                    borderRadius: '10px', 
                    justifyContent: 'space-between'
                }}
            >
                <Column>
                    <Typography color='label'>{category}</Typography>
                    <Typography>{content}</Typography>
                </Column>
                {
                    mutable &&
                    <TextButton
                        onClick={() => handleEditField(fieldToUpdate)}
                    >
                        Edit
                    </TextButton>
                }
            </Row>
        );
    }

    return (
        <Column
            style={{
                width: props.isMobile ? '100%' : '750px',
                alignItems: 'center',
                gap: 0,
                borderRadius: '10px',
                paddingBottom: '50px',
            }}
        >
            <Typography fontSize='medium' style={{padding: '25px 0'}}>Account settings</Typography>
            <Divider style={{backgroundColor: 'var(--primary-color)'}}/>
            <Column style={{alignItems: 'start', marginTop: 50, width: '100%'}}>
                {getField("Name", `${user.firstName} ${user.lastName}`, fields.NAME, true)}
                {getField("Email", `${user.email}`, null, false)}
                <Divider />
                <Row style={{justifyContent: 'space-between', width: '100%'}}>
                    <FilledButton
                        onClick={() => handleEditField(fields.PASSWORD)}
                    >
                        Change password
                    </FilledButton>
                    <FilledButton
                        color='error'
                        onClick={() => handleEditField(fields.DELETE_ACCOUNT)}
                    >
                        Delete account
                    </FilledButton>
                </Row>
            </Column>
        </Column>
    );
}
 
export default AccountSettingsPanel;