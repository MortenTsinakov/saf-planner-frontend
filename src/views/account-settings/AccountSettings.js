import { useState } from "react";
import UpdateAccountPanel from "./account-settings-data/UpdateAccountPanel";
import AccountSettingsPanel from "./account-settings-data/AccountSettingsPanel";
import { MdClose } from "react-icons/md";
import {ErrorFallback, Column, Sidebar, IconButton} from "components";

const { ErrorBoundary } = require("react-error-boundary")

const AccountSettings = ({...props}) => {

    const Fields = Object.freeze({
        NAME: 0,
        PASSWORD: 1,
        DELETE_ACCOUNT: 2,
    });

    const [fieldToUpdate, setFieldToUpdate] = useState(null);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    return (
        <ErrorBoundary fallback={<ErrorFallback />}>
            <Column
                style={{
                    padding:'5rem 2rem',
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <AccountSettingsPanel
                    fields={Fields}
                    setFieldToUpdate={setFieldToUpdate}
                    setSidebarIsOpen={setSidebarIsOpen}
                    {...props}
                />
                <Sidebar
                    isOpen={sidebarIsOpen}
                    isMobile={props.isMobile}
                    fromRight={true}
                    style={{justifyContent: 'start'}}
                >
                    <Column style={{width: '80%', alignItems: 'start', padding: '2rem'}}>
                        <IconButton icon={<MdClose />} onClick={() => setSidebarIsOpen(false)}/>
                        <UpdateAccountPanel
                            fieldToUpdate={fieldToUpdate}
                            fields={Fields}
                            setSidebarIsOpen={setSidebarIsOpen}
                        />
                    </Column>
                </Sidebar>
            </Column>
        </ErrorBoundary>
    );
}
 
export default AccountSettings;