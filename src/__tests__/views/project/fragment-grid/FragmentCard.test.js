import { fireEvent, render, screen } from '@testing-library/react';
import { useProject } from 'hooks';
import { default as FragmentCard } from 'views/project/fragment-grid/FragmentCard';

const defaultFragment = {
    id: 1,
    shortDescription: 'Fragment short description text',
    onTimeline: true,
}

const mockUpdateTimelineStatus = jest.fn();
const mockUseProjectValue = {
    updateFragmentOnTimelineStatus: mockUpdateTimelineStatus,
}

jest.mock('hooks', () => ({
    useProject: jest.fn(),
}));
jest.mock('views/project/fragment-grid/DeleteFragment', () => () => <div>MockDeleteFragment</div>);
jest.mock('views/project/fragment-grid/EditFragment', () => () => <div>MockEditFragment</div>);
jest.mock('views/project/fragment-grid/FragmentDetails', () => () => <div>MockFragmentDetails</div>);


describe('fragment-card', () => {

    beforeEach(() => {
        useProject.mockReturnValue(mockUseProjectValue);
    })

    test('renders fragment card', () => {
        render(<FragmentCard fragment={defaultFragment} />);
        expect(screen.getByTestId('fragment-card')).toBeInTheDocument();
    });

    test('renders no action icons by default', () => {
        render(<FragmentCard fragment={defaultFragment} />);
        const editButton = screen.getByTestId('edit-fragment-action-button');
        const commentButton = screen.getByTestId('add-comment-action-button');
        const detailsButton = screen.getByTestId('details-action-button');
        const deleteButton = screen.getByTestId('delete-fragment-action-button');
        expect(editButton.style.visibility).toEqual('hidden');
        expect(commentButton.style.visibility).toEqual('hidden');
        expect(detailsButton.style.visibility).toEqual('hidden');
        expect(deleteButton.style.visibility).toEqual('hidden');
    });

    test('renders action icons when expand button is clicked', () => {
        render(<FragmentCard fragment={defaultFragment} />);

        const editButton = screen.getByTestId('edit-fragment-action-button');
        const commentButton = screen.getByTestId('add-comment-action-button');
        const detailsButton = screen.getByTestId('details-action-button');
        const deleteButton = screen.getByTestId('delete-fragment-action-button');
        
        const showIconsButton = screen.getByTestId('show-action-icons-button');
        fireEvent.click(showIconsButton);

        expect(editButton.style.visibility).toEqual('visible');
        expect(commentButton.style.visibility).toEqual('visible');
        expect(detailsButton.style.visibility).toEqual('visible');
        expect(deleteButton.style.visibility).toEqual('visible');
    });

    test('renders no action icons on mouse leave', () => {
        render(<FragmentCard fragment={defaultFragment} />);

        const editButton = screen.getByTestId('edit-fragment-action-button');
        const commentButton = screen.getByTestId('add-comment-action-button');
        const detailsButton = screen.getByTestId('details-action-button');
        const deleteButton = screen.getByTestId('delete-fragment-action-button');

        const showIconsButton = screen.getByTestId('show-action-icons-button');
        const buttonRow = screen.getByTestId('button-row');
        fireEvent.click(showIconsButton);
        fireEvent.mouseLeave(buttonRow);

        expect(editButton.style.visibility).toEqual('hidden');
        expect(commentButton.style.visibility).toEqual('hidden');
        expect(detailsButton.style.visibility).toEqual('hidden');
        expect(deleteButton.style.visibility).toEqual('hidden');
    });

    test('renders on-timeline icon', () => {
        render(<FragmentCard fragment={defaultFragment} />);
        expect(screen.getByTestId('on-timeline-button')).toBeInTheDocument();
    });

    test('renders short description if present', () => {
        render(<FragmentCard fragment={defaultFragment} />);
        expect(screen.queryAllByText(defaultFragment.shortDescription).length).toBeGreaterThan(0);
    });

    test('renders fragment-details when icon is clicked', () => {
        render(<FragmentCard fragment={defaultFragment} />);

        const fragmentDetailsButton = screen.getByTestId('details-action-button');
        fireEvent.click(fragmentDetailsButton);

        expect(screen.getByText('MockFragmentDetails')).toBeInTheDocument();
    });

    test('renders edit-fragment when icon is clicked', () => {
        render(<FragmentCard fragment={defaultFragment} />);

        const editFragmentButton = screen.getByTestId('edit-fragment-action-button');
        fireEvent.click(editFragmentButton);

        expect(screen.getByText('MockEditFragment')).toBeInTheDocument();
    });

    test('renders delete-fragment when icon is clicked', () => {
        render(<FragmentCard fragment={defaultFragment} />);

        const deleteFragmentButton = screen.getByTestId('delete-fragment-action-button');
        fireEvent.click(deleteFragmentButton);

        expect(screen.getByText('MockDeleteFragment')).toBeInTheDocument();
    });

    test('calls to remove from timeline when icon is clicked', () => {
        render(<FragmentCard fragment={defaultFragment} updateFragmentOnTimelineStatus={mockUpdateTimelineStatus}/>);

        const onTimelineActionButton = screen.getByTestId('on-timeline-button');
        fireEvent.click(onTimelineActionButton);

        expect(mockUpdateTimelineStatus).toHaveBeenCalledWith(defaultFragment, false);        
    });

    test('calls to add to timeline when icon is clicked', () => {
        const notOnTimelineFragment = {
            id: 1,
            shortDescription: 'Short description',
            onTimeline: false,
        };
        render(<FragmentCard fragment={notOnTimelineFragment} updateFragmentOnTimelineStatus={mockUpdateTimelineStatus}/>);

        const onTimelineActionButton = screen.getByTestId('on-timeline-button');
        fireEvent.click(onTimelineActionButton);

        expect(mockUpdateTimelineStatus).toHaveBeenCalledWith(notOnTimelineFragment, true);        
    });
});