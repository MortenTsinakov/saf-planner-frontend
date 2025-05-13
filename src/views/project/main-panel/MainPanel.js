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
    const selectedFragment = filteredFragments.find(f => f.id === selectedFragmentIdx);

    if (mainPanelView === mainPanelViews.FRAGMENT_GRID) {
        return (
            <FragmentGrid
                selectedFragmentIdx={selectedFragmentIdx}
                hideNonTimelineFragments={hideNonTimelineFragments}
            />
        );
    }

    return (
        <Presentation fragment={selectedFragment ? selectedFragment : null} />
    );
}
 
export default MainPanel;