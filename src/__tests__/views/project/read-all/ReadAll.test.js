import { render, screen } from '@testing-library/react';
import { useProject } from 'hooks';
import ReadAll from 'views/project/read-all/ReadAll';

jest.mock('hooks', () => ({
    useAlerts: jest.fn(),
    useProject: jest.fn(),
}));
const mockUseProjectsValue = {
    project: {id: 1, title: "Title"},
    fragments: [
        {id: 1, longDescription: '1st fragment long description'},
        {id: 2, longDescription: '2nd fragment long description'}
    ]
}
const mockReadAllHeight = 500;
const mockReadAllWidth = 350;
const mockSetReadAllWidth = jest.fn();


describe('ReadAll', () => {

    beforeEach(() => {
        useProject.mockReturnValue(mockUseProjectsValue);
        render(
            <ReadAll
                readAllHeight={mockReadAllHeight}
                readAllWidth={mockReadAllWidth}
                setReadAllWidth={mockSetReadAllWidth}
            />
        );
    });

    test('renders read-all', () => {
        expect(screen.getByTestId('read-all')).toBeInTheDocument();
    });

    test('renders fragments', () => {
        expect(screen.queryAllByTestId('fragment').length).toBe(2);
    });

    test('renders edge for resizing', () => {
        expect(screen.getByTestId('resize-handle')).toBeInTheDocument();
    });
});