import { screen, render } from '@testing-library/react';
import { useAlerts, useProject } from 'hooks';
import { default as FragmentGrid } from 'views/project/fragment-grid/FragmentGrid';

jest.mock('views/project/fragment-grid/FragmentCard', () => () => <div>MockFragmentCard</div>);
jest.mock('hooks', () => ({
    useAlerts: jest.fn(),
    useProject: jest.fn(),
}));
const defaultUseAlertsValue = {
    addAlert: jest.fn(),
}


describe('fragment-grid', () => {

    beforeEach(() => {
        useAlerts.mockReturnValue(defaultUseAlertsValue);
    });

    test('renders fragment cards if there are fragments', () => {
        const mockFragments = [{
            id: 1
        }];
        useProject.mockReturnValue({fragments: mockFragments});
        render(<FragmentGrid />);
        expect(screen.queryAllByText('MockFragmentCard').length).toBeGreaterThan(0);
    });

    test('renders droppable even if fragment grid is empty', () => {
        const mockFragments = [];
        useProject.mockReturnValue({fragments: mockFragments});
        render(<FragmentGrid />);
        expect(screen.queryAllByText('MockFragmentCard').length).toBe(0);
        expect(screen.getByTestId('empty-fragment-grid')).toBeInTheDocument();
    });
});