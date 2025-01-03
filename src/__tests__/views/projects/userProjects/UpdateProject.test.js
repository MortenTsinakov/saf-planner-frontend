import { fireEvent, render, screen } from '@testing-library/react';
import { useAlerts } from 'hooks';
import { default as UpdateProject } from 'views/projects/userProjects/UpdateProject';

const mockProjectToUpdate = {
    id: 1,
    title: 'Title',
    description: 'Description',
    estimatedLengthInSeconds: 150,
    createdAt: "2025-01-03T16:40:06.934Z",
    updatedAt: "2025-01-03T16:40:06.934Z",
    owner: "Firstname Lastname"
};

jest.mock('hooks', () => ({
    useAlerts: jest.fn(),
}));

const defaultUseAlertsValue = {
    addAlert: jest.fn()
}

const mockUpdateProjectTitle = jest.fn();
const mockUpdateProjectDescription = jest.fn();
const mockUpdateProjectEstimatedLength = jest.fn()

describe('UpdateProject', () => {

    beforeEach(() => {
        useAlerts.mockReturnValue(defaultUseAlertsValue);
        render(
            <UpdateProject
                projectToUpdate={mockProjectToUpdate}
                updateProjectTitle={mockUpdateProjectTitle}
                updateProjectDescription={mockUpdateProjectDescription}
                updateProjectEstimatedLength={mockUpdateProjectEstimatedLength}
            />
        );
    });
    
    test('renders title field in settings window', () => {
        expect(screen.getByLabelText('project title')).toBeInTheDocument();
    });
    
    test('renders description field in settings window', () => {
        expect(screen.getByLabelText('project description')).toBeInTheDocument();
    });
    
    test('renders estimated length field in settings window', () => {
        expect(screen.getByLabelText('project estimated length')).toBeInTheDocument();
    });
    
    test('converts estimated length field to min and sec', () => {
        expect(screen.getByText('2min 30sec')).toBeInTheDocument();
    });

    test('renders labels field in settings window', () => {
        expect(screen.getByLabelText('project labels')).toBeInTheDocument();
    });

    test('renders shared with field in the settings window', () => {
        expect(screen.getByLabelText('project shared with')).toBeInTheDocument();
    });
    
    test('renders close button in project settings window', () => {
        expect(screen.getByTestId('close-button')).toBeInTheDocument();
    });
    
    test('does not render update modal by default', () => {
        expect(screen.queryAllByTestId('update-modal').length).toEqual(0);
    });
    
    test('renders edit button for title field', () => {
        const titleField = screen.getByLabelText('project title');

        fireEvent.mouseOver(titleField);
        expect(screen.getByTestId('edit-title-button')).toBeInTheDocument();
    });

    test('renders edit button for description field', () => {
        const descriptionField = screen.getByLabelText('project description');

        fireEvent.mouseOver(descriptionField);
        expect(screen.getByTestId('edit-description-button')).toBeInTheDocument();
    });

    test('renders edit button for estimated length field', () => {
        const estimatedLengthField = screen.getByLabelText('project estimated length');

        fireEvent.mouseOver(estimatedLengthField);
        expect(screen.getByTestId('edit-estimated length-button')).toBeInTheDocument();
    });

    test('renders edit button for labels field', () => {
        const labelsField = screen.getByLabelText('project labels');

        fireEvent.mouseOver(labelsField);
        expect(screen.getByTestId('edit-labels-button')).toBeInTheDocument();
    });

    test('renders edit button for shared with field', () => {
        const sharedWithField = screen.getByLabelText('project shared with');

        fireEvent.mouseOver(sharedWithField);
        expect(screen.getByTestId('edit-shared with-button')).toBeInTheDocument();
    });

    test('renders title update modal on title edit', () => {
        const titleField = screen.getByLabelText('project title');
        fireEvent.mouseOver(titleField);
        const editButton = screen.getByTestId('edit-title-button');
        fireEvent.click(editButton);

        expect(screen.getByTestId('title-update-modal')).toBeInTheDocument();
    });

    test('renders description update modal on description edit', () => {
        const descriptionField = screen.getByLabelText('project description');
        fireEvent.mouseOver(descriptionField);
        const editButton = screen.getByTestId('edit-description-button');
        fireEvent.click(editButton);

        expect(screen.getByTestId('description-update-modal')).toBeInTheDocument();
    });

    test('renders estimated length update modal on estimated length edit', () => {
        const estLenField = screen.getByLabelText('project estimated length');
        fireEvent.mouseOver(estLenField);
        const editButton = screen.getByTestId('edit-estimated length-button');
        fireEvent.click(editButton);

        expect(screen.getByTestId('estimated-length-update-modal')).toBeInTheDocument();
    });

    test('updates title input value when typing', () => {
        const titleValue = 'New Title'
        const titleField = screen.getByLabelText('project title');
        fireEvent.mouseOver(titleField);
        const editButton = screen.getByTestId('edit-title-button');
        fireEvent.click(editButton);
        const inputField = screen.getByLabelText('update title').querySelector('input');

        fireEvent.change(inputField, { target: { value: titleValue}});

        expect(inputField.value).toEqual(titleValue);
    });

    test('updates description input value when typing', () => {
        const descriptionValue = 'New Title'
        const descriptionField = screen.getByLabelText('project description');
        fireEvent.mouseOver(descriptionField);
        const editButton = screen.getByTestId('edit-description-button');
        fireEvent.click(editButton);
        const inputField = screen.getByLabelText('update description').querySelector('textarea');

        fireEvent.change(inputField, { target: { value: descriptionValue}});

        expect(inputField.value).toEqual(descriptionValue);
    });

    test('updates estimated length input value when typing', () => {
        const newEstLenMinValue = '3'
        const newEstLenSecValue = '10'
        
        const estLenField = screen.getByLabelText('project estimated length');
        fireEvent.mouseOver(estLenField);
        const editButton = screen.getByTestId('edit-estimated length-button');
        fireEvent.click(editButton);
        const estLenMinInputField = screen.getByLabelText('update estimated duration minutes').querySelector('input');
        const estLenSecInputField = screen.getByLabelText('update estimated duration seconds').querySelector('input');

        fireEvent.change(estLenMinInputField, { target: { value: newEstLenMinValue}});
        fireEvent.change(estLenSecInputField, { target: { value: newEstLenSecValue}});

        expect(estLenMinInputField.value).toEqual(newEstLenMinValue);
        expect(estLenSecInputField.value).toEqual(newEstLenSecValue);
    });
    
    test('saves new title', () => {
        const titleValue = 'New Title'
        const titleField = screen.getByLabelText('project title');
        fireEvent.mouseOver(titleField);
        const editButton = screen.getByTestId('edit-title-button');
        fireEvent.click(editButton);
        const inputField = screen.getByLabelText('update title').querySelector('input');
        const saveButton = screen.getByTestId('save-button');

        fireEvent.change(inputField, { target: { value: titleValue}});
        fireEvent.click(saveButton);

        expect(mockUpdateProjectTitle).toHaveBeenCalledWith(mockProjectToUpdate.id, titleValue);        
    });

    test('updates description input value when typing', () => {
        const descriptionValue = 'New Title'
        const descriptionField = screen.getByLabelText('project description');
        fireEvent.mouseOver(descriptionField);
        const editButton = screen.getByTestId('edit-description-button');
        fireEvent.click(editButton);
        const inputField = screen.getByLabelText('update description').querySelector('textarea');
        const saveButton = screen.getByTestId('save-button');

        fireEvent.change(inputField, { target: { value: descriptionValue}});
        fireEvent.click(saveButton);

        expect(mockUpdateProjectDescription).toHaveBeenCalledWith(mockProjectToUpdate.id, descriptionValue);
    });

    test('updates estimated length input value when typing', () => {
        const newEstLenMinValue = '3'
        const newEstLenSecValue = '10'
        
        const estLenField = screen.getByLabelText('project estimated length');
        fireEvent.mouseOver(estLenField);
        const editButton = screen.getByTestId('edit-estimated length-button');
        fireEvent.click(editButton);
        const estLenMinInputField = screen.getByLabelText('update estimated duration minutes').querySelector('input');
        const estLenSecInputField = screen.getByLabelText('update estimated duration seconds').querySelector('input');
        const saveButton = screen.getByTestId('save-button');

        fireEvent.change(estLenMinInputField, { target: { value: newEstLenMinValue}});
        fireEvent.change(estLenSecInputField, { target: { value: newEstLenSecValue}});
        fireEvent.click(saveButton);

        expect(mockUpdateProjectEstimatedLength).toHaveBeenCalledWith(mockProjectToUpdate.id, 190);
    });

    test('closes update modal when cancel is clicked', () => {
        const titleField = screen.getByLabelText('project title');
        fireEvent.mouseOver(titleField);
        const editButton = screen.getByTestId('edit-title-button');
        fireEvent.click(editButton);
        const cancelButton = screen.getByTestId('cancel-button');

        fireEvent.click(cancelButton);

        expect(screen.queryByTestId('update-modal')).toBeNull();
    });
});