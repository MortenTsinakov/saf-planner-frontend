import { create } from 'zustand';
import { fetchProject } from './project-store-actions/projectActions';
import { createFragment, deleteFragment, moveFragment, updateFragmentDuration, updateFragmentLongDescription, updateFragmentOnTimelineStatus, updateFragmentShortDescription } from './project-store-actions/fragmentActions';
import { setSidebarState } from './project-store-actions/sidebarActions';
import { setFragmentToEdit } from './project-store-actions/sidebarActions';
import { attachLabelToFragment, createLabel, removeLabelFromFragment } from './project-store-actions/labelActions';
import { fetchImage, uploadImage } from './project-store-actions/imageActions';

const useProjectStore = create((set, get) => ({
    project: null,
    fragments: [],
    images: new Map(),
    loading: true,
    error: null,
    sidebarState: {content: null, open: false},
    newFragments: [],
    fragmentToEdit: null,
    activeId: null,

    // Basic setters
    setProject: (project) => set({ project }),
    setFragments: (fragments) => set({ fragments }),
    setImages: (images) => set({ images }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setNewFragments: (newFragments) => set({ newFragments }),
    setActiveId: (activeId) => set({activeId}),
    
    // Project actions
    fetchProject: fetchProject(set),
    createFragment: createFragment(get, set),
    updateFragmentOnTimelineStatus: updateFragmentOnTimelineStatus(get, set),
    updateFragmentShortDescription: updateFragmentShortDescription(get, set),
    updateFragmentLongDescription: updateFragmentLongDescription(get, set),
    updateFragmentDuration: updateFragmentDuration(get, set),
    moveFragment: moveFragment(get, set),
    deleteFragment: deleteFragment(get, set),
    
    // Sidebar actions
    setSidebarState: setSidebarState(set),
    setFragmentToEdit: setFragmentToEdit(set),

    // Label actions
    createLabel: createLabel(get, set),
    attachLabelToFragment: attachLabelToFragment(get, set),
    removeLabelFromFragment: removeLabelFromFragment(get, set),

    // Image actions
    fetchImage: fetchImage(get, set),
    uploadImage: uploadImage(get, set),
}));

export default useProjectStore;