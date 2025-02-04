export const setSidebarState = (set) => (state) => {
    set({ sidebarState: state });
}

export const setFragmentToEdit = (set) => (fragment) => {
    set({ fragmentToEdit: fragment });
}