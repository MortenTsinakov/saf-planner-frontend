export const applyFilter = (get, set) => (labelId) => {
    if (get().filters.includes(labelId)) {
        return;
    }
    set({ filters: [...get().filters, labelId]})
}

export const removeFilter = (get, set) => (labelId) => {
    set({filters: [...get().filters.filter(f => f !== labelId)]});
}

export const resetFilters = (set) => () => {
    set({ filters: []});
}