import FragmentGrid from "./fragment-grid/FragmentGrid";
import Presentation from "./presentation/Presentation";
import { useProjectStore } from "stores";

const MainPanel = ({
    mainPanelViews,
    mainPanelView,
    selectedFragmentIdx,
    hideNonTimelineFragments,
}) => {

    const filteredFragments = useProjectStore((state) => state.filteredFragments);

    if (mainPanelView === mainPanelViews.FRAGMENT_GRID) {
        return (
            <FragmentGrid
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