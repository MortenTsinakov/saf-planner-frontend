const { render, screen, fireEvent } = require('@testing-library/react');
const { useAlerts } = require('hooks');
const { default: DeleteProject } = require('views/projects/userProjects/DeleteProject');

jest.mock('hooks', () => ({
    useAlerts: jest.fn(),
}));

const defaultUseAlertsValue = {
    addAlert: jest.fn(),
}

const mockProjectToDelete = {id: 1, title: 'Title'};
const mockSetProjectToDelete = jest.fn();
const mockSetDeletingProject = jest.fn();
const mockDeleteProject = jest.fn();

describe('DeleteProject', () => {

    beforeEach(() => {
        useAlerts.mockReturnValue(defaultUseAlertsValue);
        render(
            <DeleteProject 
                projectToDelete={mockProjectToDelete}
                setProjectToDelete={mockSetProjectToDelete}
                setDeletingProject={mockSetDeletingProject}
                deleteProject={mockDeleteProject}
            />
        );
    });
    
    test('renders delete button', () => {
        expect(screen.getByTestId('delete-button')).toBeInTheDocument();
    });

    test('renders cancel button', () => {
        expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
    });

    test('calls hook when delete is clicked', () => {
        const deleteButton = screen.getByTestId('delete-button');

        fireEvent.click(deleteButton);

        expect(mockDeleteProject).toHaveBeenCalledWith(mockProjectToDelete);
    });

    test('closes the modal when cancel is clicked', () => {
        const cancelButton = screen.getByTestId('cancel-button');

        fireEvent.click(cancelButton);

        expect(mockSetProjectToDelete).toHaveBeenCalledWith(null);
        expect(mockSetDeletingProject).toHaveBeenCalledWith(false);
    });

    test('closes the modal on successful delete', () => {
        const deleteButton = screen.getByTestId('delete-button');

        mockDeleteProject.mockReturnValue(true);
        fireEvent.click(deleteButton);

        expect(mockSetDeletingProject).toHaveBeenCalledWith(false);
        expect(mockSetProjectToDelete).toHaveBeenCalledWith(null);
    });

    test('does not close the modal on unsuccessful delete', () => {
        const deleteButton = screen.getByTestId('delete-button');

        mockDeleteProject.mockReturnValue(false);
        fireEvent.click(deleteButton);

        expect(mockSetDeletingProject).not.toHaveBeenCalled();
        expect(mockSetProjectToDelete).not.toHaveBeenCalled();
    });
})