import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useAlerts, useProject } from 'hooks';
import { default as EditFragment } from 'views/project/fragment-grid/EditFragment';

jest.mock('hooks', () => ({
    useAlerts: jest.fn(),
    useProject: jest.fn(),
}));

const mockUseAlertValue = {
    addAlert: jest.fn,
}

const fragment = {
    id: 1,
    shortDescription: 'SD',
    longDescription: 'LD',
    duration: 5,
}

const mockSetShowEditFragmentModal = jest.fn();
const mockUpdateFragmentShortDescription = jest.fn();
const mockUpdateFragmentLongDescription = jest.fn();
const mockUpdateFragmentDuration = jest.fn();

const mockUseProjectValue = {
    updateFragmentShortDescription: mockUpdateFragmentShortDescription,
    updateFragmentLongDescription: mockUpdateFragmentLongDescription,
    updateFragmentDuration: mockUpdateFragmentDuration,
}

describe('EditFragment', () => {

    beforeEach(() => {
        useAlerts.mockReturnValue(mockUseAlertValue);
        useProject.mockReturnValue(mockUseProjectValue);
        render(
            <EditFragment
                fragment={fragment}
                setShowEditFragmentModal={mockSetShowEditFragmentModal}
            />
        );
    });

    test('does not render any specific update modals by default', () => {
        expect(screen.queryAllByTestId('update-modal').length).toBe(0);
    });

    test('renders short description field', () => {
        expect(screen.getByLabelText('fragment short description')).toBeInTheDocument();
    });

    test('renders long description field', () => {
        expect(screen.getByLabelText('fragment long description')).toBeInTheDocument();
    });

    test('renders duration field', () => {
        expect(screen.getByLabelText('fragment duration')).toBeInTheDocument();
    });

    test('renders close button', () => {
        expect(screen.getByTestId('close-button')).toBeInTheDocument();
    });

    test('closes the modal when close button is clicked', () => {
        const closeButton = screen.getByTestId('close-button');
        fireEvent.click(closeButton);

        expect(mockSetShowEditFragmentModal).toHaveBeenCalledWith(false);
    });

    test('renders short description field edit button', () => {
        const shortDescField = screen.getByLabelText('fragment short description');
        fireEvent.mouseOver(shortDescField);

        expect(screen.getByTestId('edit-short description-button')).toBeInTheDocument();
    });

    test('renders long description field edit button', () => {
        const longDescField = screen.getByLabelText('fragment long description');
        fireEvent.mouseOver(longDescField);

        expect(screen.getByTestId('edit-long description-button')).toBeInTheDocument();
    });

    test('renders duration field edit button', () => {
        const durationField = screen.getByLabelText('fragment duration');
        fireEvent.mouseOver(durationField);

        expect(screen.getByTestId('edit-duration-button')).toBeInTheDocument();
    });

    test('renders correct edit window on edit click - short description', () => {
        const shortDescField = screen.getByLabelText('fragment short description');
        fireEvent.mouseOver(shortDescField);

        const editButton = screen.getByTestId('edit-short description-button');
        fireEvent.click(editButton);

        expect(screen.getByTestId('short-description-update-modal')).toBeInTheDocument();
    });
    
    test('renders correct edit window on edit click - long description', () => {
        const longDescField = screen.getByLabelText('fragment long description');
        fireEvent.mouseOver(longDescField);

        const editButton = screen.getByTestId('edit-long description-button');
        fireEvent.click(editButton);

        expect(screen.getByTestId('long-description-update-modal')).toBeInTheDocument();
    });

    test('renders correct edit window on edit click - duration', () => {
        const durationField = screen.getByLabelText('fragment duration');
        fireEvent.mouseOver(durationField);

        const editButton = screen.getByTestId('edit-duration-button');
        fireEvent.click(editButton);

        expect(screen.getByTestId('duration-update-modal')).toBeInTheDocument();
    });

    test('closes the edit window on cancel click - short description', () => {
        const shortDescField = screen.getByLabelText('fragment short description');
        fireEvent.mouseOver(shortDescField);

        const editButton = screen.getByTestId('edit-short description-button');
        fireEvent.click(editButton);

        const cancelButton = screen.getByTestId('cancel-button');
        fireEvent.click(cancelButton);

        expect(screen.queryAllByTestId('short-description-update-modal').length).toBe(0);
    });

    test('closes the edit window on cancel click - long description', () => {
        const longDescField = screen.getByLabelText('fragment long description');
        fireEvent.mouseOver(longDescField);

        const editButton = screen.getByTestId('edit-long description-button');
        fireEvent.click(editButton);

        const cancelButton = screen.getByTestId('cancel-button');
        fireEvent.click(cancelButton);

        expect(screen.queryAllByTestId('long-description-update-modal').length).toBe(0);
    });

    test('closes the edit window on cancel click - duration', () => {
        const durationField = screen.getByLabelText('fragment duration');
        fireEvent.mouseOver(durationField);

        const editButton = screen.getByTestId('edit-duration-button');
        fireEvent.click(editButton);

        const cancelButton = screen.getByTestId('cancel-button');
        fireEvent.click(cancelButton);

        expect(screen.queryAllByTestId('duration-update-modal').length).toBe(0);
    });

    test('updates short description value on edit', () => {
        const newValue = "bla";
        const shortDescField = screen.getByLabelText('fragment short description');
        fireEvent.mouseOver(shortDescField);

        const editButton = screen.getByTestId('edit-short description-button');
        fireEvent.click(editButton);

        const updateField = screen.getByLabelText('update short description').querySelector('textarea');
        fireEvent.change(updateField, { target: { value: newValue }});

        expect(updateField.value).toEqual(newValue);
    });

    test('updates long description value on edit', () => {
        const newValue = "bla";
        const longDescField = screen.getByLabelText('fragment long description');
        fireEvent.mouseOver(longDescField);

        const editButton = screen.getByTestId('edit-long description-button');
        fireEvent.click(editButton);

        const updateField = screen.getByLabelText('update long description').querySelector('textarea');
        fireEvent.change(updateField, { target: { value: newValue }});

        expect(updateField.value).toEqual(newValue);
    });

    test('updates duration value on edit', () => {
        const newValue = '12';
        const durationField = screen.getByLabelText('fragment duration');
        fireEvent.mouseOver(durationField);

        const editButton = screen.getByTestId('edit-duration-button');
        fireEvent.click(editButton);

        const updateField = screen.getByLabelText('update duration').querySelector('input');
        fireEvent.change(updateField, { target: { value: newValue }});

        expect(updateField.value).toEqual(newValue);
    });

    test('calls save function on save click - short description', () => {
        const newValue = "    bla  ";
        const shortDescField = screen.getByLabelText('fragment short description');
        fireEvent.mouseOver(shortDescField);

        const editButton = screen.getByTestId('edit-short description-button');
        fireEvent.click(editButton);

        const updateField = screen.getByLabelText('update short description').querySelector('textarea');
        fireEvent.change(updateField, { target: { value: newValue }});

        const saveButton = screen.getByTestId('save-button');
        fireEvent.click(saveButton);

        expect(mockUpdateFragmentShortDescription).toHaveBeenCalledWith(
            fragment,
            'bla'
        );
    });

    test('calls save function on save click - long description', () => {
        const newValue = " bla     ";
        const longDescField = screen.getByLabelText('fragment long description');
        fireEvent.mouseOver(longDescField);

        const editButton = screen.getByTestId('edit-long description-button');
        fireEvent.click(editButton);

        const updateField = screen.getByLabelText('update long description').querySelector('textarea');
        fireEvent.change(updateField, { target: { value: newValue }});

        const saveButton =  screen.getByTestId('save-button');
        fireEvent.click(saveButton);

        expect(mockUpdateFragmentLongDescription).toHaveBeenCalledWith(
            fragment,
            'bla'
        );
    });

    test('calls save function on save click - duration', () => {
        const newValue = '12';
        const durationField = screen.getByLabelText('fragment duration');
        fireEvent.mouseOver(durationField);

        const editButton = screen.getByTestId('edit-duration-button');
        fireEvent.click(editButton);

        const updateField = screen.getByLabelText('update duration').querySelector('input');
        fireEvent.change(updateField, { target: { value: newValue }});

        const saveButton = screen.getByTestId('save-button');
        fireEvent.click(saveButton);

        expect(mockUpdateFragmentDuration).toHaveBeenCalledWith(
            fragment,
            12
        );
    });

    test('closes edit window on successful save - short description', async () => {
        mockUpdateFragmentShortDescription.mockResolvedValue(true);
        const newValue = "    bla  ";
        const shortDescField = screen.getByLabelText('fragment short description');
        fireEvent.mouseOver(shortDescField);

        const editButton = screen.getByTestId('edit-short description-button');
        fireEvent.click(editButton);

        const updateField = screen.getByLabelText('update short description').querySelector('textarea');
        fireEvent.change(updateField, { target: { value: newValue }});

        const saveButton = screen.getByTestId('save-button');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(screen.queryAllByTestId('update-modal').length).toBe(0);
        });
    });

    test('closes edit window on successful save - long description', async () => {
        mockUpdateFragmentLongDescription.mockResolvedValue(true);
        const newValue = " bla     ";
        const longDescField = screen.getByLabelText('fragment long description');
        fireEvent.mouseOver(longDescField);

        const editButton = screen.getByTestId('edit-long description-button');
        fireEvent.click(editButton);

        const updateField = screen.getByLabelText('update long description').querySelector('textarea');
        fireEvent.change(updateField, { target: { value: newValue }});

        const saveButton =  screen.getByTestId('save-button');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(screen.queryAllByTestId('update-modal').length).toBe(0);
        });
    });

    test('closes edit window on successful save - duration', async () => {
        mockUpdateFragmentDuration.mockResolvedValue(true);
        const newValue = '12';
        const durationField = screen.getByLabelText('fragment duration');
        fireEvent.mouseOver(durationField);

        const editButton = screen.getByTestId('edit-duration-button');
        fireEvent.click(editButton);

        const updateField = screen.getByLabelText('update duration').querySelector('input');
        fireEvent.change(updateField, { target: { value: newValue }});

        const saveButton = screen.getByTestId('save-button');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(screen.queryAllByTestId('update-modal').length).toBe(0);
        });
    });
});