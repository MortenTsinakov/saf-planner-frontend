import FragmentGrid from "./fragment-grid/FragmentGrid";
import Presentation from "./presentation/Presentation";

const MainPanel = ({
    mainPanelViews,
    mainPanelView,
    filteredFragments,
    selectedFragmentIdx,
}) => {

    if (mainPanelView === mainPanelViews.FRAGMENT_GRID) {
        return (
            <FragmentGrid
                filteredFragments={filteredFragments}
                selectedFragmentIdx={selectedFragmentIdx}
            />
        );
    }

    return (
        <Presentation fragment={filteredFragments[selectedFragmentIdx]} />
    );
}
 
export default MainPanel;