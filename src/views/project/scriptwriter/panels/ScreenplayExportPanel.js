import { Column, FilledButton, IconButton, InputField, OutlineButton, Row, Sidebar, Typography } from "components";
import { useAlerts, useAuth } from "hooks";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useProjectStore } from "stores";

const ScreenplayExportPanel = ({exportPanelIsOpen, setExportPanelIsOpen}) => {

    const project = useProjectStore((state) => state.project);
    const screenplay = useProjectStore((state) => state.screenplay);
    const downloadScreenplayAsPDF = useProjectStore((state) => state.downloadScreenplayAsPDF);
    const {addAlert} = useAlerts();
    const {user} = useAuth();
    const date = new Date();

    const [titlePageData, setTitlePageData] = useState({
        title: project.title,
        author: `${user.firstName} ${user.lastName}`,
        email: `${user.email}`,
        phoneNumber: '',
        date: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`,
    });

    const [optionalFieldsChecked, setOptionalFieldsChecked] = useState({
        email: false,
        phoneNumber: false,
        date: false,
    });

    const getNormalizedFilename = (title) => {
        let filename = "";
        title = title.toLowerCase();

        for (let i = 0; i < title.length; i++) {
            const code = title.charCodeAt(i);
            // If character is not alphanumeric then replace it with a -
            if (!(code > 47 && code < 58) &&
                !(code > 96 && code < 123)) {
                    filename += "-"
            } else {
                filename += title.charAt(i);
            }
        }

        return filename;
    }

    const handleExportClick = async () => {
        const title = titlePageData.title.trim();
        const author = titlePageData.author.trim();
        const email = titlePageData.email.trim();
        const phoneNumber = titlePageData.phoneNumber.trim();
        const dateObject = new Date(titlePageData.date.trim());
        const date = `${('0' + dateObject.getDate()).slice(-2)}.${('0' + dateObject.getMonth()).slice(-2)}.${dateObject.getFullYear()}`;
        if (title === '') {
            addAlert("Title of the project is missing", "error");
            return;
        }
        if (author === '') {
            addAlert("Author of the project is missing", "error");
            return;
        }

        const data = {
            id: screenplay.id,
            title: title,
            author: author,
            email: optionalFieldsChecked.email ? email : null,
            phoneNumber: optionalFieldsChecked.phoneNumber ? phoneNumber : null,
            date: optionalFieldsChecked.date ? date : null,
        }

        try {
            const blob = await downloadScreenplayAsPDF(data);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${getNormalizedFilename(title)}.pdf`;
            link.click();
    
            window.URL.revokeObjectURL(url);
            setExportPanelIsOpen(false);
        } catch (err) {
            console.log(err);
            addAlert("Download failed", "error");
        }
    }

    const handleClosePanel = () => {
        setExportPanelIsOpen(false);
    }

    const handleTitleChange = (e) => {
        setTitlePageData({
            ...titlePageData,
            title: e.target.value,
        });
    }

    const handleAuthorChange = (e) => {
        setTitlePageData({
            ...titlePageData,
            author: e.target.value,
        });
    }

    const handleEmailChange = (e) => {
        setTitlePageData({
            ...titlePageData,
            email: e.target.value,
        });
    }

    const handlePhoneNumberChange = (e) => {
        setTitlePageData({
            ...titlePageData,
            phoneNumber: e.target.value,
        });
    }

    const handleDateChange = (e) => {
        setTitlePageData({
            ...titlePageData,
            date: e.target.value,
        });
    }

    const handleEmailCheckedChange = () => {
        setOptionalFieldsChecked({
            ...optionalFieldsChecked,
            email: !optionalFieldsChecked.email
        });
    }

    const handlePhoneNumberCheckedChange = () => {
        setOptionalFieldsChecked({
            ...optionalFieldsChecked,
            phoneNumber: !optionalFieldsChecked.phoneNumber
        });
    }

    const handleDateCheckedChange = () => {
        setOptionalFieldsChecked({
            ...optionalFieldsChecked,
            date: !optionalFieldsChecked.date
        });
    }

    return (
        <Sidebar
            isOpen={exportPanelIsOpen}
            fromRight={true}
            style={{
                paddingTop: '3rem',
                paddingRight: '2rem',
                paddingLeft: '2rem',
                justifyContent: 'start',
                textAlign: 'center',
            }}
        >
            <Row style={{justifyContent: 'start', width: '100%'}}>
                <IconButton
                    icon={<MdClose />}
                    onClick={handleClosePanel}
                />
            </Row>
            <Column>
                <Column style={{paddingBottom: '3rem'}}>
                    <Typography fontSize='medium'>Export screenplay</Typography>
                    <Typography color='label' style={{textAlign: 'start'}}>Please define what will be displayed on the title page and then click export to download your screenplay as a PDF file.</Typography>
                </Column>
                <Column>
                    <Typography style={{textAlign: 'start'}}>Title</Typography>
                    <InputField
                        value={titlePageData.title}
                        onChange={handleTitleChange}
                    />
                </Column>
                <Column>
                    <Typography style={{textAlign: 'start'}}>Author</Typography>
                    <InputField
                        value={titlePageData.author}
                        onChange={handleAuthorChange}
                    />
                </Column>
                <Column>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Typography style={{textAlign: 'start'}}>Email</Typography>
                        <input 
                            type="checkbox"
                            title='Include email on title page'
                            checked={optionalFieldsChecked.email}
                            onChange={handleEmailCheckedChange}
                        />
                    </Row>
                    <InputField
                        value={titlePageData.email}
                        onChange={handleEmailChange}
                    />
                </Column>
                <Column>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Typography style={{textAlign: 'start'}}>Phone number</Typography>
                        <input
                            type="checkbox"
                            title='Include phone number on title page'
                            checked={optionalFieldsChecked.phoneNumber}
                            onChange={handlePhoneNumberCheckedChange}
                        />
                    </Row>
                    <InputField
                        value={titlePageData.phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                </Column>
                <Column>
                    <Row style={{justifyContent: 'space-between'}}>
                        <Typography style={{textAlign: 'start'}}>Date</Typography>
                        <input
                            type="checkbox"
                            title='Include date on title page'
                            checked={optionalFieldsChecked.date}
                            onChange={handleDateCheckedChange}
                        />
                    </Row>
                    <InputField
                        type='date'
                        value={titlePageData.date}
                        onChange={handleDateChange}
                    />
                </Column>
                <Row style={{paddingTop: '3rem', justifyContent: 'space-between'}}>
                    <OutlineButton
                        onClick={handleClosePanel}
                    >
                        Cancel
                    </OutlineButton>
                    <FilledButton
                        onClick={handleExportClick}
                    >
                        Export
                    </FilledButton>
                </Row>
            </Column>
        </Sidebar>
    );
}
 
export default ScreenplayExportPanel;