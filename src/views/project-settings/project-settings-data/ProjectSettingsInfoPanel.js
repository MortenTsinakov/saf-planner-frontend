import { Column, Divider, IconButton, Row, TextButton, Typography } from 'components';
import Label from 'components/ui/labels/Label';
import { MdClose, MdEdit } from 'react-icons/md';
import { formatSecondsToHMS, truncateString } from 'utils';

const ProjectSettingsInfoPanel = ({
    project,
    setFieldToUpdate,
    setEditPanelIsOpen,
    setLabelToEdit,
    setLabelToDelete,
    setUserToStopSharingWith,
    fields,
    ...props }) => {

    const handleEditField = (field) => {
        setFieldToUpdate(field)
        setEditPanelIsOpen(true);
    }

    const handleEditLabelClick = (label) => {
        setLabelToEdit(label);
        setFieldToUpdate(fields.EDIT_LABEL);
        setEditPanelIsOpen(true);
    }

    const handleStopSharingClick = (user) => {
        setUserToStopSharingWith(user);
    } 

    const getTextField = (category, content, fieldToUpdate) => {
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
                <TextButton
                    onClick={() => handleEditField(fieldToUpdate)}
                >
                    Edit
                </TextButton>
            </Row>
        )
    }

    const getLabelsField = () => {
        return (
            <Column
                style={{
                    backgroundColor: 'var(--background-color-medium)', 
                    width: '100%', 
                    padding: '2rem', 
                    borderRadius: '10px', 
                    gap: '2rem'
                }}
            >
                <Typography color='label'>Labels</Typography>
                <Row style={{flexWrap: 'wrap', width: '100%'}}>
                    {project.labels.map(label => (
                       <Label key={label.id} color={label.color} style={{display: 'flex', gap: '2rem', justifyContent: 'space-between', paddingRight: '5px'}}>
                            {truncateString(label.description, 15)}
                            <Row style={{gap: 0}}>
                                <IconButton style={{fontSize: '2rem', color: 'black', padding: 0}} icon={<MdEdit />} title='Edit label' onClick={() => handleEditLabelClick(label)}/>
                                <IconButton style={{fontSize: '2rem', color: 'black', padding: 0}} icon={<MdClose />} title='Delete label' onClick={() => setLabelToDelete(label)}/>
                            </Row>
                        </Label>
                    ))}
                </Row>
            </Column>
        );
    }

    const getSharedWithField = () => {
        return (
            <Column
                style={{
                    backgroundColor: 'var(--background-color-medium)', 
                    width: '100%', 
                    padding: '2rem',
                    borderRadius: '10px',
                    gap: '2rem',
                }}
            >
                <Typography color='label'>
                    Shared with
                </Typography>
                <Row
                    style={{
                        flexWrap: 'wrap',
                    }}
                >
                {
                    project.sharedWith.length > 0 ?
                    project.sharedWith.map(u => (
                        <Row
                            key={u.id}
                            style={{
                                width: 'fit-content',
                                padding: '0 1rem',
                                borderRadius: 10,
                                border: '1px solid gray',
                            }}
                        >
                            <Typography style={{textWrap: 'nowrap'}}>
                                {u.name}
                            </Typography>
                            <IconButton
                                style={{
                                    fontSize: '2rem',
                                    padding: 0
                                }}
                                icon={<MdClose />}
                                title='Stop sharing'
                                onClick={() => handleStopSharingClick(u)}/>
                        </Row>
                    ))
                    :
                    <Typography fontSize='extrasmall'>You haven't shared the project with anybody yet...</Typography>
                }
                </Row>
            </Column>
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
            <Typography fontSize='medium' style={{padding: '25px 0'}}>Project information</Typography>
            <Divider style={{backgroundColor: 'var(--primary-color)'}}/>
            <Column style={{alignItems: 'start', marginTop: '50px', width: '100%'}}>
                {getTextField("Title", project.title, fields.TITLE)}
                {getTextField("Description", project.description, fields.DESCRIPTION)}
                {getTextField("Estimated length", formatSecondsToHMS(project.estimatedLengthInSeconds), fields.ESTIMATED_LENGTH)}
                {getLabelsField()}
                {getSharedWithField()}
            </Column>
        </Column>
    );
}
 
export default ProjectSettingsInfoPanel;