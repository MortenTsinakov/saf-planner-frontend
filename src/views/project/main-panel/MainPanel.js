import FragmentGrid from "./fragment-grid/FragmentGrid";
import Presentation from "./presentation/Presentation";

const MainPanel = ({
    mainPanelViews,
    mainPanelView,
    filteredFragments,
    selectedFragmentIdx,
    hideNonTimelineFragments,
}) => {

    if (mainPanelView === mainPanelViews.FRAGMENT_GRID) {
        return (
            <FragmentGrid
                filteredFragments={filteredFragments}
                selectedFragmentIdx={selectedFragmentIdx}
                hideNonTimelineFragments={hideNonTimelineFragments}
            />
        );
    }

    return (
        <Presentation fragment={filteredFragments[selectedFragmentIdx]} />
    );
}
 
export default MainPanel;