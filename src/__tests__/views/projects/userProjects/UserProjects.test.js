import { fireEvent, render, screen } from '@testing-library/react';
import UserProjects from 'views/projects/userProjects/UserProjects';

jest.mock('views/projects/userProjects/CreateProject', () => () => <div>MockCreateProject</div>);
jest.mock('views/projects/userProjects/UpdateProject', () => () => <div>MockUpdateProject</div>);
jest.mock('views/projects/userProjects/DeleteProject', () => () => <div>MockDeleteProject</div>);
jest.mock('views/projects/userProjects/UserProjectCard', () => () => <div>MockUserProjectCard</div>);

const mockUserProjects = [{
    id: 0,
    title: 'Project Title'
}];


describe('UserProjects', () => {
    
    test('renders user projects', () => {
        render(<UserProjects userProjects={mockUserProjects}/>);

        expect(screen.getByText('MockUserProjectCard')).toBeInTheDocument();
    });

    test('renders create new project button by default', () => {
        render(<UserProjects userProjects={mockUserProjects} />);

        expect(screen.getByTestId('create-project-button')).toBeInTheDocument();
    });

    test('does not render create/update/delete components by default', () => {
        render(<UserProjects userProjects={mockUserProjects} />);

        expect(screen.queryByText('MockCreateProject')).toBeNull();
        expect(screen.queryByText('MockUpdateProject')).toBeNull();
        expect(screen.queryByText('MockDeleteProject')).toBeNull();
    });

    test('renders create new project window when the button is clicked', () => {
        render(<UserProjects userProjects={mockUserProjects} />);

        const createProjectButton = screen.getByTestId('create-project-button');
        fireEvent.click(createProjectButton);

        expect(screen.getByText('MockCreateProject')).toBeInTheDocument();
    });

    test('does not render create project button when it as been clicked', () => {
        render(<UserProjects userProjects={mockUserProjects} />);

        const createProjectButton = screen.getByTestId('create-project-button');
        fireEvent.click(createProjectButton);

        expect(screen.queryByTestId('create-project-button')).toBeNull();
    });
});
