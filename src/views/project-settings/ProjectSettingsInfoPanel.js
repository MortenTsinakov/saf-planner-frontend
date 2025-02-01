import { Clickable, Column, Divider, IconButton, Row, TextButton, Typography } from 'components';
import Label from 'components/ui/labels/Label';
import { MdAdd, MdClose, MdEdit } from 'react-icons/md';
import { formatSecondsToHMS, truncateString } from 'utils';

const ProjectSettingsInfoPanel = ({
    project,
    setFieldToUpdate,
    setEditPanelIsOpen,
    setLabelToEdit,
    setLabelToDelete,
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

    const getTextField = (category, content, fieldToUpdate) => {
        return (
            <Clickable
                onClick={() => handleEditField(fieldToUpdate)}
                style={{
                    width: '100%',
                    backgroundColor: 'var(--background-color-medium)',
                    borderRadius: '10px',

                }}
            >
                <Column
                    style={{
                        alignItems: 'center',
                        padding: '25px 0',
                        width: '80%'
                    }}
                >
                    <Typography color='label'>
                        {category}
                    </Typography>
                    <Typography>
                        {content}
                    </Typography>
                </Column>
            </Clickable>
        );
    }

    const getLabelsField = () => {
        return (
            <Column
                style={{
                    width: '100%',
                    alignItems: 'center', 
                    padding: '25px 0',
                }}
            >
                <Typography color='label'>Labels</Typography>
                {project.labels.map(label => (
                        <Label key={label.id} color={label.color} style={{width: '100%', display: 'flex', justifyContent: 'space-between', paddingRight: '5px'}}>
                            {truncateString(label.description, 15)}
                            <Row style={{gap: 0}}>
                                <IconButton style={{fontSize: '2rem', color: 'black'}} icon={<MdEdit />} title='Edit label' onClick={() => handleEditLabelClick(label)}/>
                                <IconButton style={{fontSize: '2rem', color: 'black'}} icon={<MdClose />} title='Delete label' onClick={() => setLabelToDelete(label)}/>
                            </Row>
                        </Label>
                ))}
                <TextButton onClick={() => handleEditField(fields.CREATE_LABEL)}>
                    <Row>
                        <MdAdd/>
                        <Typography>    
                            Create new label
                        </Typography>
                    </Row>
                </TextButton>
            </Column>
        );
    }

    return (
        <Column
            style={{
                width: props.isMobile ? '100%' : '750px', 
                alignItems: 'center', 
                gap: 0,
                backgroundColor: 'var(--background-color-medium)',
                borderRadius: '10px',
                paddingBottom: '50px',
            }}
        >
            <Typography fontSize='medium' style={{padding: '25px 0'}}>Project information</Typography>
            <Divider style={{width: '80%', backgroundColor: 'var(--primary-color)'}}/>
            {getTextField("Title", project.title, fields.TITLE)}
            {getTextField("Description", project.description, fields.DESCRIPTION)}
            {getTextField("Estimated length", formatSecondsToHMS(project.estimatedLengthInSeconds), fields.ESTIMATED_LENGTH)}
            {getLabelsField()}
            {getTextField("Shared with", "TODO: Display users with whom the project has been shared with")}
        </Column>
    );
}
 
export default ProjectSettingsInfoPanel;