import { Column, FilledButton, InputField, Row, Typography } from 'components';
import { useAlerts } from 'hooks';
import { useState } from 'react';
import { clampNumber, timeInMinsSecsToTimeInSeconds } from 'utils';

const EditProjectEstimatedLength = ({project, updateEstimatedLength, setEditPanelIsOpen}) => {

    // Minutes
    const [estLenMin, setEstLenMin] = useState(Math.floor(project.estimatedLengthInSeconds / 60));
    // Seconds
    const [estLenSec, setEstLenSec] = useState(project.estimatedLengthInSeconds - (60 * Math.floor(project.estimatedLengthInSeconds / 60)));

    const {addAlert} = useAlerts();

    /**
     * Change the value of the minutes input on
     * estimated duration update modal
     */
    const handleEstLenMinChange = (e) => {
        if (isNaN(e.target.value) && e.target.value !== '') {
            return;
        }
        const value = Number(e.target.value);
        setEstLenMin(clampNumber(value, 0, 180));
    }

        /**
     * Change the value of the seconds input on
     * estimated duration update modal
     */
    const handleEstLenSecChange = (e) => {
        if (isNaN(e.target.value) && e.target.value !== '') {
            return;
        }
        const value = Number(e.target.value);
        setEstLenSec(clampNumber(value, 0, 59));
    }

    const handleUpdate = async () => {
        const estimatedLength = timeInMinsSecsToTimeInSeconds(estLenMin, estLenSec);
        if (estimatedLength === project.estimatedLengthInSeconds) {
            setEditPanelIsOpen(false);
            return;
        }
        const updateWasSuccessful = await updateEstimatedLength(project.id, estimatedLength);
        if (updateWasSuccessful) {
            setEditPanelIsOpen(false);
            addAlert("Project's estimated length was updated", "success");
            return
        }
    }

    return (
        <Column
            data-testid='estimated-length-update-modal'
            style={{width: '100%', gap: '3rem', textAlign: 'center'}}
        >
            <Column>
                <Typography fontSize='medium'>
                    Edit estimated duration
                </Typography>
                <Row
                    style={{
                        alignItems: 'end',
                        justifyContent: 'center',
                    }}
                >
                    <InputField
                        aria-label='update estimated duration minutes'
                        type='text'
                        value={estLenMin}
                        onChange={handleEstLenMinChange}
                        style={{
                            width: '60px'
                        }}
                    />
                    <Typography>min</Typography>
                    <InputField
                        aria-label='update estimated duration seconds'
                        type='text'
                        value={estLenSec}
                        onChange={handleEstLenSecChange}
                        style={{
                            width: '60px'
                        }}
                    />
                    <Typography>sec</Typography>
                </Row>
            </Column>
            <FilledButton
                onClick={handleUpdate}
            >
                Save
            </FilledButton>
        </Column>
    );
}
 
export default EditProjectEstimatedLength;