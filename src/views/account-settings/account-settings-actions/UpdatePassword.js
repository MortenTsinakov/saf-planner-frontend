import { Column, FilledButton, InputField, OutlineButton, Row, Typography } from "components";
import { useAlerts, useAuth } from "hooks";
import { useState } from "react";

const UpdatePassword = ({setSidebarIsOpen, ...props}) => {

    const {addAlert} = useAlerts();
    const {updatePassword, error} = useAuth();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleCancelClick = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setSidebarIsOpen(false);
    }

    const handleUpdateClick = async() => {
        if (currentPassword === "") {
            addAlert("Current password was not provided", "error");
            return;
        }

        if (newPassword === "" || confirmNewPassword === "") {
            addAlert("New password was not provided", "error");
            return;
        } 

        if (newPassword !== confirmNewPassword) {
            addAlert("New passwords don't match", "error");
            return;
        }

        if (newPassword.length < 8) {
            addAlert("New password is too short", "error");
            return;
        }

        const successfulUpdate = await updatePassword(currentPassword, newPassword);
        if (successfulUpdate) {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setSidebarIsOpen(false);
            addAlert("Password was changed", "success");

        } else {
            addAlert(error || "Changing password failed", "error");
            return;
        }
    }

    return (
        <Column style={{width: '100%', gap: '3rem'}}>
            <Typography fontSize='medium'>
                Change password
            </Typography>
            <Column>
                <Column>
                    <Typography color='label'>Current password</Typography>
                    <InputField
                        type='password'
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </Column>
                <Column>
                    <Typography color='label'>New password</Typography>
                    <InputField
                        type='password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Column>
                <Column>
                    <Typography color='label'>Confirm new password</Typography>
                    <InputField
                        type='password'
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </Column>
            </Column>
            <Row style={{justifyContent: 'space-between'}}>
                <OutlineButton
                    onClick={handleCancelClick}
                >
                    Cancel
                </OutlineButton>
                <FilledButton
                    onClick={handleUpdateClick}
                >
                    Update
                </FilledButton>
            </Row>
        </Column>
    );
}
 
export default UpdatePassword;