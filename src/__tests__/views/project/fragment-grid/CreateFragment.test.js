const { render, screen, fireEvent, queryAllByTestId, waitFor } = require('@testing-library/react');
const { useAlerts, useFragments } = require('hooks');
const { default: CreateFragment } = require('views/project/fragment-grid/CreateFragment');

jest.mock('hooks', () => ({
    useAlerts: jest.fn(),
}));
const defaultUseAlertsValue = {
    addAlert: jest.fn(),
}

const props = {projectId: 1}
const mockCreateFragment = jest.fn();
const mockPreviousFragment = {
    id: 1,
    position: 10,
};
const mockSetShowCreateFragmentModal = jest.fn();


describe('CreateFragment', () => {

    beforeEach(() => {
        useAlerts.mockReturnValue(defaultUseAlertsValue);
        render(
            <CreateFragment
                createFragment={mockCreateFragment}
                previousFragment={mockPreviousFragment}
                setShowCreateFragmentModal={mockSetShowCreateFragmentModal}
                {...props}
            />
        );
    });

    test('renders create fragment modal', () => {
        expect(screen.getByTestId('create-fragment-modal')).toBeInTheDocument();
    });

    test('renders short description page by default', () => {
        expect(screen.getByTestId('create-fragment-short-description')).toBeInTheDocument();
    });
    
    test('renders no backward button on first page', () => {
        expect(screen.queryAllByTestId('backward-button').length).toBe(0);
    });
    
    test('renders forward button on all pages except last', () => {
        expect(screen.getByTestId('forward-button')).toBeInTheDocument();

        const forwardButton = screen.getByTestId('forward-button');

        for (let i = 0; i < 2; i++) {
            fireEvent.click(forwardButton);
            expect(screen.getByTestId('forward-button')).toBeInTheDocument();
        }

        fireEvent.click(forwardButton);
        expect(screen.queryAllByTestId('forward-button').length).toBe(0);
    });

    test('renders backward button on all pages except first', () => {
        const forwardButton = screen.getByTestId('forward-button');
        for (let i = 0; i < 3; i++) {
            fireEvent.click(forwardButton);
            expect(screen.getByTestId('backward-button')).toBeInTheDocument();
        }
    });
    
    test('renders long description on 2nd page', () => {
        const forwardButton = screen.getByTestId('forward-button');
        fireEvent.click(forwardButton);

        expect(screen.getByTestId('create-fragment-long-description')).toBeInTheDocument();
    });

    test('renders duration on 3rd page', () => {
        const forwardButton = screen.getByTestId('forward-button');
        fireEvent.click(forwardButton);
        fireEvent.click(forwardButton);

        expect(screen.getByTestId('create-fragment-duration')).toBeInTheDocument();
    });

    test('renders on-timeline on 4th page', () => {
        const forwardButton = screen.getByTestId('forward-button');
        fireEvent.click(forwardButton);
        fireEvent.click(forwardButton);
        fireEvent.click(forwardButton);

        expect(screen.getByTestId('create-fragment-timeline-status')).toBeInTheDocument();
    });

    test('renders cancel button on all pages', () => {
        expect(screen.getByTestId('create-fragment-cancel-button')).toBeInTheDocument();
        const forwardButton = screen.getByTestId('forward-button');
        for (let i = 0; i < 3; i++) {
            fireEvent.click(forwardButton);
            expect(screen.getByTestId('create-fragment-cancel-button')).toBeInTheDocument();
        }
    });
    
    test('renders save button only on last page', () => {
        const forwardButton = screen.getByTestId('forward-button');
        for (let i=0; i < 3; i++) {
            expect(screen.queryAllByTestId('create-fragment-save-button').length).toBe(0);
            fireEvent.click(forwardButton);
        }
        expect(screen.getByTestId('create-fragment-save-button')).toBeInTheDocument();
    });

    test('closes the window on cancel click', () => {
        const cancelButton = screen.getByTestId('create-fragment-cancel-button');
        fireEvent.click(cancelButton);

        expect(mockSetShowCreateFragmentModal).toHaveBeenCalledWith(false);
    });

    test('calls the hook on save click', () => {
        const forwardButton = screen.getByTestId('forward-button');
        for (let i = 0; i < 3; i++) {
            fireEvent.click(forwardButton);
        }
        const saveButton = screen.getByTestId('create-fragment-save-button');
        fireEvent.click(saveButton);

        expect(mockCreateFragment).toHaveBeenCalled();
    });

    test('calls the hook on save with correct values', () => {
        const shortDescription = 'SD';
        const longDescription = 'LD';
        const duration = '10';
        const onTimeline = true;
        const position = mockPreviousFragment.position + 1;
        const projectId = props.projectId;
        
        
        const forwardButton = screen.getByTestId('forward-button');
        const shortDescriptionInput = screen.getByTestId('create-fragment-short-description').querySelector('textarea');
        fireEvent.change(shortDescriptionInput, { target: { value: shortDescription }});
        fireEvent.click(forwardButton);

        const longDescriptionInput = screen.getByTestId('create-fragment-long-description').querySelector('textarea');
        fireEvent.change(longDescriptionInput, { target: { value: longDescription }});
        fireEvent.click(forwardButton);

        const durationInput = screen.getByTestId('create-fragment-duration').querySelector('input');
        fireEvent.change(durationInput, { target: { value: duration }});
        fireEvent.click(forwardButton);

        const onTimelineToggle = screen.getByTestId('on-timeline-toggle');
        fireEvent.click(onTimelineToggle);

        const saveButton = screen.getByTestId('create-fragment-save-button');
        fireEvent.click(saveButton);

        expect(mockCreateFragment).toHaveBeenCalledWith(
            shortDescription,
            longDescription,
            Number(duration),
            onTimeline,
            position,
            projectId,
        );
    });

    test('closes the window after successful save', async () => {
        mockCreateFragment.mockResolvedValue(true);
        const forwardButton = screen.getByTestId('forward-button');
        for (let i = 0; i < 3; i++) {
            fireEvent.click(forwardButton);
        }
        const saveButton = screen.getByTestId('create-fragment-save-button');
        fireEvent.click(saveButton);
        
        await waitFor(() => {
            expect(mockCreateFragment).toHaveBeenCalled();
            expect(mockSetShowCreateFragmentModal).toHaveBeenCalledWith(false);
        });
    });
});