import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useAlerts, useProject } from 'hooks';
import { default as DeleteFragment } from 'views/project/fragment-grid/DeleteFragment';

jest.mock('hooks', () => ({
    useAlerts: jest.fn(),
    useProject: jest.fn(),
}));
const mockUseAlertsValue = {
    addAlert: jest.fn(),
}

const mockFragment = {id: 1};
const mockSetShowDeleteFragmentModal = jest.fn();
const mockDeleteFragment = jest.fn();

const mockUseProjectValue = {
    deleteFragment: mockDeleteFragment,
}

describe('DeleteFragment', () => {

    beforeEach(() => {
        useAlerts.mockReturnValue(mockUseAlertsValue);
        useProject.mockReturnValue(mockUseProjectValue);
        render(
            <DeleteFragment
                fragment={mockFragment}
                setShowDeleteFragmentModal={mockSetShowDeleteFragmentModal}
            />
        );
    });

    test('renders delete button', () => {
        expect(screen.getByTestId('delete-button')).toBeInTheDocument();
    });

    test('renders cancel button', () => {
        expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
    });

    test('closes the modal on cancel click', () => {
        const cancelButton = screen.getByTestId('cancel-button');
        fireEvent.click(cancelButton);

        expect(mockSetShowDeleteFragmentModal).toHaveBeenCalledWith(false);
    });

    test('calls delete function on delete click', () => {
        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);

        expect(mockDeleteFragment).toHaveBeenCalledWith(mockFragment);
    });

    test('closes the modal on successful delete', async () => {
        mockDeleteFragment.mockResolvedValue(true);
        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(mockDeleteFragment).toHaveBeenCalled();
            expect(mockSetShowDeleteFragmentModal).toHaveBeenCalledWith(false);
        });
    });
});