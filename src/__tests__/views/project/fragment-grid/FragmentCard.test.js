import { fireEvent, render, screen } from '@testing-library/react';
import { default as FragmentCard } from 'views/project/fragment-grid/FragmentCard';

const defaultFragment = {
    id: 1,
    shortDescription: 'Fragment short description text',
    onTimeline: true,
}

jest.mock('views/project/fragment-grid/CreateFragment', () => () => <div>MockCreateFragment</div>);
jest.mock('views/project/fragment-grid/DeleteFragment', () => () => <div>MockDeleteFragment</div>);
jest.mock('views/project/fragment-grid/EditFragment', () => () => <div>MockEditFragment</div>);
jest.mock('views/project/fragment-grid/FragmentDetails', () => () => <div>MockFragmentDetails</div>);


describe('fragment-card', () => {
    test('renders fragment card', () => {
        render(<FragmentCard fragment={defaultFragment} />);
        expect(screen.getByTestId('fragment-card')).toBeInTheDocument();
    });

    test('renders no action icons by default', () => {
        render(<FragmentCard fragment={defaultFragment} />);
        expect(screen.queryAllByTestId('fragment-card-action-buttons').length).toBe(0);
    });

    test('renders action icons on mouse enter', () => {
        render(<FragmentCard fragment={defaultFragment} />);

        const fragmentCard = screen.getByTestId('fragment-card');
        fireEvent.mouseEnter(fragmentCard);

        expect(screen.getByTestId('fragment-card-action-buttons')).toBeInTheDocument();
    });

    test('renders no action icons on mouse leave', () => {
        render(<FragmentCard fragment={defaultFragment} />);

        const fragmentCard = screen.getByTestId('fragment-card');
        fireEvent.mouseEnter(fragmentCard);
        fireEvent.mouseLeave(fragmentCard);

        expect(screen.queryAllByTestId('fragment-card-action-buttons').length).toBe(0);
    });

    test('renders on-timeline icon if on timeline', () => {
        render(<FragmentCard fragment={defaultFragment} />);
        expect(screen.getByTestId('fragment-on-timeline-marker')).toBeInTheDocument();
    });

    test('renders no on-timeline icon if not on timline', () => {
        const notOnTimelineFragment = {
            id: 1,
            shortDescription: 'Short description',
            onTimeline: false,
        };
        render(<FragmentCard fragment={notOnTimelineFragment} />);
        expect(screen.queryAllByTestId('fragment-on-timeline-marker').length).toBe(0);
    });

    test('renders short description if present', () => {
        render(<FragmentCard fragment={defaultFragment} />);
        expect(screen.queryAllByText(defaultFragment.shortDescription).length).toBeGreaterThan(0);
    });

    test('renders create-fragment when icon is clicked', () => {
        render(<FragmentCard fragment={defaultFragment} />);

        const fragmentCard = screen.getByTestId('fragment-card');
        fireEvent.mouseEnter(fragmentCard);
        const createFragmentButton = screen.getByTestId('create-fragment-action-button');
        fireEvent.click(createFragmentButton);

        expect(screen.getByText('MockCreateFragment')).toBeInTheDocument();
    });

    test('renders fragment-details when icon is clicked', () => {
        render(<FragmentCard fragment={defaultFragment} />);

        const fragmentCard = screen.getByTestId('fragment-card');
        fireEvent.mouseEnter(fragmentCard);
        const fragmentDetailsButton = screen.getByTestId('details-action-button');
        fireEvent.click(fragmentDetailsButton);

        expect(screen.getByText('MockFragmentDetails')).toBeInTheDocument();
    });

    test('renders edit-fragment when icon is clicked', () => {
        render(<FragmentCard fragment={defaultFragment} />);

        const fragmentCard = screen.getByTestId('fragment-card');
        fireEvent.mouseEnter(fragmentCard);
        const editFragmentButton = screen.getByTestId('edit-fragment-action-button');
        fireEvent.click(editFragmentButton);

        expect(screen.getByText('MockEditFragment')).toBeInTheDocument();
    });

    test('renders delete-fragment when icon is clicked', () => {
        render(<FragmentCard fragment={defaultFragment} />);

        const fragmentCard = screen.getByTestId('fragment-card');
        fireEvent.mouseEnter(fragmentCard);
        const deleteFragmentButton = screen.getByTestId('delete-fragment-action-button');
        fireEvent.click(deleteFragmentButton);

        expect(screen.getByText('MockDeleteFragment')).toBeInTheDocument();
    });

    test('calls to remove from timeline when icon is clicked', () => {
        const mockUpdateTimelineStatus = jest.fn();
        render(<FragmentCard fragment={defaultFragment} updateFragmentOnTimelineStatus={mockUpdateTimelineStatus}/>);

        const fragmentCard = screen.getByTestId('fragment-card');
        fireEvent.mouseEnter(fragmentCard);
        const onTimelineActionButton = screen.getByTestId('on-timeline-action-button');
        fireEvent.click(onTimelineActionButton);

        expect(mockUpdateTimelineStatus).toHaveBeenCalledWith(defaultFragment, false);        
    });

    test('calls to add to timeline when icon is clicked', () => {
        const mockUpdateTimelineStatus = jest.fn();
        const notOnTimelineFragment = {
            id: 1,
            shortDescription: 'Short description',
            onTimeline: false,
        };
        render(<FragmentCard fragment={notOnTimelineFragment} updateFragmentOnTimelineStatus={mockUpdateTimelineStatus}/>);

        const fragmentCard = screen.getByTestId('fragment-card');
        fireEvent.mouseEnter(fragmentCard);
        const onTimelineActionButton = screen.getByTestId('on-timeline-action-button');
        fireEvent.click(onTimelineActionButton);

        expect(mockUpdateTimelineStatus).toHaveBeenCalledWith(notOnTimelineFragment, true);        
    });
});