import { fireEvent, render, screen } from '@testing-library/react';
import { useAlerts } from 'hooks';
import { default as CreateProject } from 'views/projects/userProjects/CreateProject';

const mockCreateProject = jest.fn();
const mockSetCreatingProject = jest.fn();

jest.mock('hooks', () => ({
    useAlerts: jest.fn(),
}));

const defaultUseAlertsValue = {
    addAlert: jest.fn()
}

describe('CreateProject', () => {

    beforeEach(() => {
        useAlerts.mockReturnValue(defaultUseAlertsValue);
        render(<CreateProject createProject={mockCreateProject} setCreatingProject={mockSetCreatingProject}/>)
    });

    test('renders input field for title', () => {
        expect(screen.getByLabelText('project title')).toBeInTheDocument();
    });

    test('renders input field for description', () => {
        expect(screen.getByLabelText('project description')).toBeInTheDocument();
    });

    test('renders input field for estimated minutes', () => {
        expect(screen.getByLabelText('estimated duration minutes')).toBeInTheDocument();
    });

    test('renders input field for estimated seconds', () => {
        expect(screen.getByLabelText('estimated duration seconds')).toBeInTheDocument();
    });

    test('renders save button', () => {
        expect(screen.getByTestId('save-button')).toBeInTheDocument();
    });

    test('renders cancel button', () => {
        expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
    });

    test('updates title when typing', () => {
        const titleValue = 'Project Title';
        const titleInput = screen.getByLabelText('project title').querySelector('input');

        fireEvent.change(titleInput, { target: { value: titleValue }});

        expect(titleInput.value).toBe(titleValue);
    });

    test('updates description when typing', () => {
        const descriptionValue = 'Project Title';
        const descriptionInput = screen.getByLabelText('project description').querySelector('textarea');

        fireEvent.change(descriptionInput, { target: { value: descriptionValue }});

        expect(descriptionInput.value).toBe(descriptionValue);
    });

    test('updates estimated minutes when typing', () => {
        const estimatedMinutesValue = '15';
        const estimatedMinutesInput = screen.getByLabelText('estimated duration minutes').querySelector('input');

        fireEvent.change(estimatedMinutesInput, {target : { value: estimatedMinutesValue}});

        expect(estimatedMinutesInput.value).toBe(estimatedMinutesValue);
    });

    test('updates estimated seconds when typing', () => {
        const estimatedSecondsValue = '30';
        const estimatedSecondsInput = screen.getByLabelText('estimated duration seconds').querySelector('input');

        fireEvent.change(estimatedSecondsInput, {target : { value: estimatedSecondsValue}});

        expect(estimatedSecondsInput.value).toBe(estimatedSecondsValue);
    });

    test('clamps estimated minutes to 0 when value is negative', () => {
        const estimatedMinutesValue = '-15';
        const estimatedMinutesInput = screen.getByLabelText('estimated duration minutes').querySelector('input');

        fireEvent.change(estimatedMinutesInput, {target : { value: estimatedMinutesValue}});

        expect(estimatedMinutesInput.value).toBe('0');
    });

    test('clamps estimated seconds to 0 when the value is negative', () => {
        const estimatedSecondsValue = '-30';
        const estimatedSecondsInput = screen.getByLabelText('estimated duration seconds').querySelector('input');

        fireEvent.change(estimatedSecondsInput, {target : { value: estimatedSecondsValue}});

        expect(estimatedSecondsInput.value).toBe('0');
    });

    test('clamps estimated seconds to 59 when the value is more than 59', () => {
        const estimatedSecondsValue = '60';
        const estimatedSecondsInput = screen.getByLabelText('estimated duration seconds').querySelector('input');

        fireEvent.change(estimatedSecondsInput, {target : { value: estimatedSecondsValue}});

        expect(estimatedSecondsInput.value).toBe('59');
    });

    test('saves project on click', () => {
        const saveButton = screen.getByTestId('save-button');

        fireEvent.click(saveButton);

        expect(mockCreateProject).toHaveBeenCalled();
    });

    test('trims title on save', () => {
        const titleValue = '  \n   Project \nTitle        \n';
        const trimmedTitleValue = 'Project Title'
        const titleInput = screen.getByLabelText('project title').querySelector('input');
        const saveButton = screen.getByTestId('save-button');

        fireEvent.change(titleInput, {target : {value: titleValue}});
        fireEvent.click(saveButton);

        expect(mockCreateProject).toHaveBeenCalledWith(trimmedTitleValue, '', 0);
    });

    test('trims description on save', () => {
        const descriptionValue = '     Project Description   \n        ';
        const trimmedDescriptionValue = 'Project Description'
        const descriptionInput = screen.getByLabelText('project description').querySelector('textarea');
        const saveButton = screen.getByTestId('save-button');

        fireEvent.change(descriptionInput, {target : {value: descriptionValue}});
        fireEvent.click(saveButton);

        expect(mockCreateProject).toHaveBeenCalledWith('', trimmedDescriptionValue, 0);
    });

    test('converts duration to seconds on save', () => {
        const estLenMinValue = '15';
        const estLenSecValue = '30';
        const expectedValue = 930;
        const estLenMinInput = screen.getByLabelText('estimated duration minutes').querySelector('input');
        const estLenSecInput = screen.getByLabelText('estimated duration seconds').querySelector('input');
        const saveButton = screen.getByTestId('save-button');

        fireEvent.change(estLenMinInput, {target : {value: estLenMinValue}});
        fireEvent.change(estLenSecInput, {target : {value: estLenSecValue}});
        fireEvent.click(saveButton);

        expect(mockCreateProject).toHaveBeenCalledWith('', '', expectedValue);
    });

    test('closes the window on cancel click', () => {
        const cancelButton = screen.getByTestId('cancel-button');

        fireEvent.click(cancelButton);

        expect(mockSetCreatingProject).toHaveBeenCalledWith(false);
    });
});