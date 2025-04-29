import { Column, FilledButton, InputField, OutlineButton, Row, Typography } from "components";
import { useAlerts, useAuth } from "hooks";
import { useState } from "react";

const DeleteAccount = ({setSidebarIsOpen, ...props}) => {

    const {addAlert} = useAlerts();
    const {deleteAccount, error} = useAuth();

    const [password, setPassword] = useState('');

    const handleCancelClick = () => {
        setPassword('');
        setSidebarIsOpen(false);
    }

    const handleDeleteClick = async () => {
        if (password === "") {
            addAlert("Password was not provided", "error");
            return;
        }

        const successfulDeletion = await deleteAccount(password);
        console.log("Deletion was successful?", successfulDeletion);
        if (successfulDeletion) {
            setPassword('');
            setSidebarIsOpen(false);
            addAlert("Account was deleted", "info");
        } else {
            addAlert(error || "Account deletion failed", "error");
        }
    }

    return (
        <Column style={{width: '100%', gap: '3rem'}}>
            <Typography fontSize='medium'>Delete account</Typography>
            <Typography>
                Are you sure you want to delete your account? The account
                will be deleted permanently and you will lose all your projects.
            </Typography>
            <Typography>
                Please provide your password to confirm that you want to delete
                your account.
            </Typography>
            <Column>
                <Typography color='label'>Password</Typography>
                <InputField
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Column>
            <Row style={{justifyContent: 'space-between'}}>
                <OutlineButton
                    onClick={handleCancelClick}
                >
                    Cancel
                </OutlineButton>
                <FilledButton
                    onClick={handleDeleteClick}
                    color='error'
                >
                    Delete account
                </FilledButton>
            </Row>
        </Column>
    );
}
 
export default DeleteAccount;