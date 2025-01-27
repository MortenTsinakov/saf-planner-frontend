const { screen, render } = require('@testing-library/react');
const { useProject } = require('hooks');
const { default: Timeline } = require('views/project/timeline/Timeline');

jest.mock('hooks',  () => ({
    useProject: jest.fn(),
}));

jest.mock('views/project/timeline/TimelineItem', () => () => <div>MockTimelineItem</div>);
jest.mock('views/project/timeline/TimelineInfo', () => () => <div>MockTimelineInfo</div>);
jest.mock('views/project/timeline/TimelineToolbar', () => () => <div>MockTimelineToolbar</div>);
jest.mock('views/project/timeline/TimelineMarkings', () => () => <div>MockTimelineMarkings</div>);

const mockUseProjectValue = {
    project: {
        id: 1,
        estimatedLengthInSeconds: 60,

    },
    fragments: [
        {id: 1, onTimeline: true, durationInSeconds: 3},
        {id: 2, onTimeline: true, durationInSeconds: 3},
        {id: 3, onTimeline: true, durationInSeconds: 3}],
}

describe('Timeline', () => {

    beforeEach(() => {
        useProject.mockReturnValue(mockUseProjectValue);
        render(<Timeline />)
    });

    test('renders timeline component', () => {
        expect(screen.getByTestId('timeline-component')).toBeInTheDocument();
    });

    test('renders correct amount of timeline items', () => {
        expect(screen.queryAllByText('MockTimelineItem').length).toBe(3);
    });

    test('renders timeline markings component', () => {
        expect(screen.getByText('MockTimelineMarkings')).toBeInTheDocument();
    });

    test('renders toolbar component', () => {
        expect(screen.getByTestId('timeline-toolbar-component')).toBeInTheDocument();
    });

    test('renders timeline info component', () => {
        expect(screen.getByText('MockTimelineInfo')).toBeInTheDocument();
    });
});