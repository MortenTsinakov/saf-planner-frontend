const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const { useAlerts } = require('hooks');
const { default: DeleteFragment } = require('views/project/fragment-grid/DeleteFragment');

jest.mock('hooks', () => ({
    useAlerts: jest.fn(),
}));
const defaultUseAlertsValue = {
    addAlert: jest.fn(),
}

const mockFragment = {id: 1};
const mockSetShowDeleteFragmentModal = jest.fn();
const mockDeleteFragment = jest.fn();


describe('DeleteFragment', () => {

    beforeEach(() => {
        useAlerts.mockReturnValue(defaultUseAlertsValue);
        render(
            <DeleteFragment
                fragment={mockFragment}
                setShowDeleteFragmentModal={mockSetShowDeleteFragmentModal}
                deleteFragment={mockDeleteFragment}
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