import { render, screen } from '@testing-library/react';
import { useProject, useAlerts } from 'hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import Project from 'views/project/Project';

jest.mock('views/project/fragment-grid/FragmentGrid', () => () => <div>MockFragmentGrid</div>);
jest.mock('views/project/read-all/ReadAll', () => () => <div>MockReadAll</div>);
jest.mock('views/project/timeline/Timeline', () => () => <div>MockTimeline</div>);
jest.mock('views/project/toolbar/Toolbar', () => () => <div>MockToolbar</div>);

jest.mock('hooks', () => ({
    useAlerts: jest.fn(),
    useProject: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

const mockedUseProjectValue = {
    fetchProject: jest.fn(),
    createFragment: jest.fn(),
    updateFragmentOnTimelineStatus: jest.fn(),
    updateFragmentShortDescription: jest.fn(),
    updateFragmentLongDescription: jest.fn(),
    updateFragmentDuration: jest.fn(),
    deleteFragment: jest.fn(),
    fragments: [],
    loading: false,
    error: null,
    setError: jest.fn(),
};
const mockedUseAlertsValue = {
    addAlert: jest.fn(),
}
const mockedUseNavigateValue = jest.fn();
const mockUseLocationValue = {
    pathname: '/project',
    search: '?id=1',
    hash: '',
    state: null,
};

describe('Project', () => {
    beforeEach(() => {
        useProject.mockReturnValue(mockedUseProjectValue);
        useAlerts.mockReturnValue(mockedUseAlertsValue);
        useLocation.mockReturnValue(mockUseLocationValue);
        useNavigate.mockReturnValue(mockedUseNavigateValue);
    });
    
    test('renders toolbar', () => {
        render(<Project/>);
        expect(screen.getByText('MockFragmentGrid')).toBeInTheDocument();
    });
    
    test('renders timeline', () => {
        render(<Project />);
        expect(screen.getByText('MockTimeline')).toBeInTheDocument();
    });

    test('renders toolbar', () => {
        render(<Project />);
        expect(screen.getByText('MockToolbar')).toBeInTheDocument();
    });
});