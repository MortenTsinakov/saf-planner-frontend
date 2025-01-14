import { screen, render } from '@testing-library/react';
import { default as FragmentGrid } from 'views/project/fragment-grid/FragmentGrid';

jest.mock('views/project/fragment-grid/FragmentCard', () => () => <div>MockFragmentCard</div>);


describe('fragment-grid', () => {
    test('renders fragment cards if there are fragments', () => {
        const mockFragments = [{
            id: 1
        }];
        render(<FragmentGrid fragments={mockFragments} />);
        expect(screen.queryAllByText('MockFragmentCard').length).toBeGreaterThan(0);
    });

    test('renders error text if no fragments', () => {
        const mockFragments = [];
        render(<FragmentGrid fragments={mockFragments} />);
        expect(screen.queryAllByText('MockFragmentCard').length).toBe(0);
        expect(screen.getByTestId('no-fragments-error-message')).toBeInTheDocument();
    });
});