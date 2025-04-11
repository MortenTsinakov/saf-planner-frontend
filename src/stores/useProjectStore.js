import { create } from 'zustand';
import { fetchProject } from './project-store-actions/projectActions';
import { createFragment, deleteFragment, moveFragment, updateFragmentDuration, updateFragmentLongDescription, updateFragmentOnTimelineStatus, updateFragmentShortDescription } from './project-store-actions/fragmentActions';
import { setSidebarState } from './project-store-actions/sidebarActions';
import { setFragmentToEdit } from './project-store-actions/sidebarActions';
import { attachLabelToFragment, createLabel, removeLabelFromFragment } from './project-store-actions/labelActions';
import { deleteImage, fetchImage, uploadImage } from './project-store-actions/imageActions';
import { deleteScreenplay, fetchScreenplay, saveScreenplay } from './project-store-actions/screenplayActions';
import { applyFilter, removeFilter, resetFilters } from './project-store-actions/filteringActions';

const initialState = {
    project: null,
    fragments: [],
    screenplay: null,
    currentScreenplay: {
                type: 'screenplay',
                id: 1,
                children: [
                    { type: 'header', children: [{ text: 'fade in:' }] },
                ],
            },
    images: new Map(),
    loading: true,
    error: null,
    sidebarState: {content: null, open: false},
    newFragments: [],
    fragmentToEdit: null,
    activeId: null,

    //Filtering options
    filters: [],
    filteredFragments: [],
}

const useProjectStore = create((set, get) => ({
    ...initialState,

    // Reset function
    reset: () => set(initialState),

    // Basic setters
    setProject: (project) => set({ project }),
    setFragments: (fragments) => set({ fragments }),
    setScreenplay: (screenplay) => set ({ screenplay }),
    setCurrentScreenplay: (currentScreenplay) => set ({ currentScreenplay }),
    setImages: (images) => set({ images }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setNewFragments: (newFragments) => set({ newFragments }),
    setActiveId: (activeId) => set({activeId}),
    setFilters: (filters) => set({ filters }),
    setFilteredFragments: (filteredFragments) => set({ filteredFragments }),
    
    // Project actions
    fetchProject: fetchProject(set),
    createFragment: createFragment(get, set),
    updateFragmentOnTimelineStatus: updateFragmentOnTimelineStatus(get, set),
    updateFragmentShortDescription: updateFragmentShortDescription(get, set),
    updateFragmentLongDescription: updateFragmentLongDescription(get, set),
    updateFragmentDuration: updateFragmentDuration(get, set),
    moveFragment: moveFragment(get, set),
    deleteFragment: deleteFragment(get, set),

    // Screenplay actions
    fetchScreenplay: fetchScreenplay(get, set),
    saveScreenplay: saveScreenplay(get, set),
    deleteScreenplay: deleteScreenplay(get, set),
    
    // Sidebar actions
    setSidebarState: setSidebarState(set),
    setFragmentToEdit: setFragmentToEdit(set),

    // Label actions
    createLabel: createLabel(get, set),
    attachLabelToFragment: attachLabelToFragment(get, set),
    removeLabelFromFragment: removeLabelFromFragment(get, set),
    applyFilter: applyFilter(get, set),
    removeFilter: removeFilter(get, set),
    resetFilters: resetFilters(set),

    // Image actions
    fetchImage: fetchImage(get, set),
    uploadImage: uploadImage(get, set),
    deleteImage: deleteImage(get, set),
}));

export default useProjectStore;