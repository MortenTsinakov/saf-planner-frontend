import { IconButton, Row } from "components";
import { MdAutoStories, MdGridView, MdTv, MdViewTimeline } from "react-icons/md";

const PlanModeToolbar = ({
    mainPanelView,
    mainPanelViews,
    iconStyle,
    toggleReadAllPanel,
    toggleTimelinePanel,
    changeViewToPresentation,
    changeViewToFragmentGrid,
}) => {
    return (
        <Row>
            <IconButton
                    icon={<MdAutoStories />}
                    style={iconStyle}
                    onClick={toggleReadAllPanel}
                />
                <IconButton
                    icon={<MdViewTimeline />}
                    style={iconStyle}
                    onClick={toggleTimelinePanel}
                />
                {
                    mainPanelView === mainPanelViews.FRAGMENT_GRID &&
                    <IconButton
                        icon={<MdTv />}
                        style={iconStyle}
                        onClick={changeViewToPresentation}
                    />
                }
                {
                    mainPanelView === mainPanelViews.PRESENTATION &&
                    <IconButton
                        icon={<MdGridView />}
                        style={iconStyle}
                        onClick={changeViewToFragmentGrid}
                    />
                }
        </Row>
    );
}
 
export default PlanModeToolbar;