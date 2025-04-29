import { Column, FilledButton, InputField, OutlineButton, Row, Typography } from "components";
import { useAlerts, useAuth } from "hooks";
import { useState } from "react";

const UpdateName = ({setSidebarIsOpen, ...props}) => {

    const {user, updateName, error} = useAuth();
    const {addAlert} = useAlerts();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    const handleUpdateClick = async () => {
        const fn = firstName.trim();
        const ln = lastName.trim();

        if (fn === user.firstName && ln === user.lastName) {
            setFirstName(fn);
            setLastName(ln);
            setSidebarIsOpen(false);
            return;
        }

        if (fn === "" || ln === "") {
            addAlert("Name can't be blank", "error");
            return;
        }

        const successfulUpdate = await updateName(fn, ln);
        if (successfulUpdate) {
            setFirstName(fn);
            setLastName(ln);
            setSidebarIsOpen(false);
            addAlert("Name was updated", "success");
        } else {
            addAlert(error || "Updating name failed", "error");
        }
    }

    const handleCancelClick = () => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setSidebarIsOpen(false);
    }

    return (
        <Column style={{width: '100%', gap: '3rem'}}>
            <Typography fontSize='medium'>Update name</Typography>
            <Column>
                <Column>
                    <Typography color='label'>First name</Typography>
                    <InputField
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Column>
                <Column>
                    <Typography color='label'>Last name</Typography>
                    <InputField
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Column>
            </Column>
            <Row style={{justifyContent: 'space-between'}}>
                <OutlineButton onClick={handleCancelClick}>
                    Cancel
                </OutlineButton>
                <FilledButton onClick={handleUpdateClick}>
                    Update
                </FilledButton>
            </Row>
        </Column>
    );
}
 
export default UpdateName;