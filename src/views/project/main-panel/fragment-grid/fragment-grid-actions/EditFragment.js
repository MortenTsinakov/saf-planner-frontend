import { Column, Divider, IconButton, Loading, Row, TextButton, Typography } from 'components';
import Label from 'components/ui/labels/Label';
import { useEffect, useState } from 'react';
import { MdAdd, MdClose, MdEdit } from 'react-icons/md';
import { possibleSidebarStates } from '../fragment-grid-data/SidebarStates';
import { useProjectStore } from 'stores';
import CreateLabel from './CreateLabel';

const EditFragment = () => {

    const sidebarStates = possibleSidebarStates;

    const project = useProjectStore((state) => state.project);
    const fragmentToEdit = useProjectStore((state) => state.fragmentToEdit);
    const attachLabelToFragment = useProjectStore((state) => state.attachLabelToFragment);
    const removeLabelFromFragment = useProjectStore((state) => state.removeLabelFromFragment);
    const setSidebarState = useProjectStore((state) => state.setSidebarState);
    const [labelSelectionIsOpen, setLabelSelectionIsOpen] = useState(false);
    const [labels, setLabels] = useState([]);
    const [createNewLabel, setCreateNewLabel] = useState(false);

    useEffect(() => {
        const initializeLabels = () => {
            if (fragmentToEdit) {
                setLabels(fragmentToEdit.labels);
            }
        }
        initializeLabels();
    }, [fragmentToEdit]);

    if (!fragmentToEdit) {
        return <Loading />
    }

    const handleAttachLabel = (labelId) => {
        attachLabelToFragment(labelId, fragmentToEdit.id);
    }

    const handleRemoveLabel = async (labelId) => {
        removeLabelFromFragment(labelId, fragmentToEdit.id);
    }

    const handleCreateNewLabelClick = () => {
        setCreateNewLabel(true);
    }

    const getAvailableLabels = () => {
        const labelIds = labels.map(l => l.id);
        const available = project.labels.filter(l => !labelIds.includes(l.id));
        return available;
    }

    const getTextField = (category, content, state) => {
        return (
            <Column>
                <Row style={{justifyContent: 'space-between'}}>
                    <Typography
                        color='label'
                    >
                        {category}
                    </Typography>
                    <IconButton
                        onClick={() => setSidebarState({content: state, open: true})}
                        icon={<MdEdit />}
                        style={{
                            fontSize: '2rem'
                        }}
                    />
                </Row>
                <Typography>{content}</Typography>
            </Column>
        );
    }

    const getLabelsField = () => {
        return (
            <Column style={{gap: 0}}>
                <Typography color='label'>Labels</Typography>
                {
                    labels.length > 0 &&
                    <Row style={{margin: '2rem 0', flexWrap: 'wrap'}}>
                        {
                        labels.map(label => (
                            <Label
                                key={label.id} 
                                color={label.color} 
                                style={{
                                    display: 'flex', 
                                    gap: '2rem', 
                                    justifyContent: 'space-between', 
                                    paddingRight: '5px'
                                }}
                            >
                                {label.description}
                                <IconButton
                                    onClick={() => handleRemoveLabel(label.id)}
                                    icon={<MdClose />}
                                    style={{
                                        fontSize: '2rem',
                                        color: 'black',
                                        padding: 0
                                    }}
                                    title='Remove label'
                                />
                            </Label>
                        ))
                        }
                    </Row>
                }
                <Column style={{marginTop: '1rem'}}>
                    {
                        labelSelectionIsOpen ?
                        <Column style={{top: '3rem', gap: '3rem'}}>
                            <Divider />
                            <Column>
                                {getAvailableLabels().map(label => (
                                    <Row key={label.id} style={{justifyContent: 'space-between'}}>
                                    <Label color={label.color}>
                                        {label.description}
                                    </Label>
                                    <IconButton
                                        onClick={() => handleAttachLabel(label.id)}
                                        icon={<MdAdd />}
                                        style={{fontSize: '3rem'}}
                                    />
                                </Row>
                                ))}
                            </Column>
                            <Row style={{justifyContent: 'space-between'}}>
                                <TextButton
                                    onClick={handleCreateNewLabelClick}
                                >
                                    Create new label
                                </TextButton>
                                <TextButton onClick={() => setLabelSelectionIsOpen(false)}>
                                    Close
                                </TextButton>
                            </Row>
                            <Divider />
                        </Column>
                        :
                        <TextButton
                            style={{padding: 0, width: 'fit-content'}}
                            onClick={() => setLabelSelectionIsOpen(true)}
                        >
                            <Row style={{width: 'fit-content', gap: 0}}>
                                <MdAdd />
                                <Typography>Add label</Typography>
                            </Row>
                        </TextButton>
                    }
                </Column>
            </Column>
        );
    }

    return (
        createNewLabel
        ?
        <Column
            style={{
                padding: '5rem 3rem',
                height: '100%',
                width: '100%',
                overflow: 'auto',
                alignItems: 'center',
            }}
        >
            <CreateLabel exitFn={() => setCreateNewLabel(false)}/>
        </Column>
        :
        <Column
            style={{
                width: '100%', 
                padding: '5rem 3rem', 
                gap: '3rem',
                overflow: 'auto',
        }}>
            {getTextField('Short description', fragmentToEdit.shortDescription, sidebarStates.EDIT_SHORT_DESCRIPTION)}
            {getTextField('Long description', fragmentToEdit.longDescription, sidebarStates.EDIT_LONG_DESCRIPTION)}
            {getTextField('Duration', `${fragmentToEdit.durationInSeconds} seconds`, sidebarStates.EDIT_DURATION)}
            {getLabelsField()}
        </Column>
    );
}
 
export default EditFragment;