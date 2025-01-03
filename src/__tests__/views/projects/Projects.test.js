import { fireEvent, render, screen } from '@testing-library/react';
import { useProjects, useAlerts } from 'hooks';
import { Projects } from 'views';


jest.mock('hooks', () => ({
    useProjects: jest.fn(),
    useAlerts: jest.fn(),
}));

jest.mock('views/projects/userProjects/UserProjects', () => () => <div>MockUserProjects</div>);
jest.mock('views/projects/sharedProjects/SharedProjects', () => () => <div>MockSharedProjects</div>);

const defaultUseProjectsValue = {
    fetchUserProjects: jest.fn(),
    createProject: jest.fn(),
    updateProjectTitle: jest.fn(),
    updateProjectDescription: jest.fn(),
    updateProjectEstimatedLength: jest.fn(),
    deleteProject: jest.fn(),
    userProjects: [],
    loading: false,
    error: null,
    setError: jest.fn()
}

const defaultUseAlertsValue = {
    addAlert: jest.fn()
}

// Selected tab
describe('Projects', () => {   
    
    beforeEach(() => {
        useProjects.mockReturnValue(defaultUseProjectsValue);
        useAlerts.mockReturnValue(defaultUseAlertsValue);
    });

    test('loads UserProjects tab button', () => {
        render(<Projects />);

        expect(screen.getByTestId('user-projects-tab-button')).toBeInTheDocument();
    });

    test('loads SharedProjects tab button', () => {
        render(<Projects />);

        expect(screen.getByTestId('shared-projects-tab-button')).toBeInTheDocument();
    });
    
    test('loads UserProjects by default', () => {
        render(<Projects />);

        expect(screen.getByText('MockUserProjects')).toBeInTheDocument();
    });

    test('loads SharedProjects after tab switch', () => {
        render(<Projects />);

        const sharedProjectsTabButton = screen.getByTestId('shared-projects-tab-button');
        fireEvent.click(sharedProjectsTabButton);

        expect(screen.getByText('MockSharedProjects')).toBeInTheDocument();
    });
});
