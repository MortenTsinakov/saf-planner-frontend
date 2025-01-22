import { render, screen, fireEvent, queryAllByTestId, waitFor } from '@testing-library/react';
import { useAlerts } from 'hooks';
import { default as CreateFragment } from 'views/project/fragment-grid/CreateFragment';

jest.mock('hooks', () => ({
    useAlerts: jest.fn(),
}));
const defaultUseAlertsValue = {
    addAlert: jest.fn(),
}
jest.mock('views/project/fragment-grid/NewCard', () => () => <div>MockNewCard</div>);

const props = {projectId: 1}
const mockNewCards = [{id: 1, shortDescription: 'Short'}];
const mockSetNewCards = jest.fn()

const mockSetShowCreateFragmentPanel = jest.fn();


describe('CreateFragment', () => {

    beforeEach(() => {
        useAlerts.mockReturnValue(defaultUseAlertsValue);
        render(
            <CreateFragment
                newCards={mockNewCards}
                setNewCards={mockSetNewCards}
                setShowCreateFragmentPanel={mockSetShowCreateFragmentPanel}
                {...props}
            />
        );
    });

    test('renders create fragment panel', () => {
        expect(screen.getByTestId('create-fragment-panel')).toBeInTheDocument();
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

        for (let i = 0; i < 3; i++) {
            fireEvent.click(forwardButton);
            expect(screen.getByTestId('forward-button')).toBeInTheDocument();
        }

        fireEvent.click(forwardButton);
        expect(screen.queryAllByTestId('forward-button').length).toBe(0);
    });

    test('renders backward button on all pages except first', () => {
        const forwardButton = screen.getByTestId('forward-button');
        for (let i = 0; i < 4; i++) {
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

    test('renders new card on the last page', () => {
        const forwardButton = screen.getByTestId('forward-button');
        fireEvent.click(forwardButton);
        fireEvent.click(forwardButton);
        fireEvent.click(forwardButton);
        fireEvent.click(forwardButton);

        expect(screen.getByText('MockNewCard')).toBeInTheDocument();
    });

    test('renders close button on all pages', () => {
        expect(screen.getByTestId('create-fragment-close-button')).toBeInTheDocument();
        const forwardButton = screen.getByTestId('forward-button');
        for (let i = 0; i < 4; i++) {
            fireEvent.click(forwardButton);
            expect(screen.getByTestId('create-fragment-close-button')).toBeInTheDocument();
        }
    });

    test('closes the window on close click', () => {
        const cancelButton = screen.getByTestId('create-fragment-close-button');
        fireEvent.click(cancelButton);

        expect(mockSetShowCreateFragmentPanel).toHaveBeenCalledWith(false);
    });
});