export const applyFilter = (get, set) => (labelId) => {
    let fs = get().filters;
    if (fs.includes(labelId)) {
        return;
    }
    fs = [...fs, labelId];
    const fragments = get().fragments;

    const ff = getSuitableFragments(fragments, fs);
    set({ filteredFragments: ff, filters: fs});
}

export const removeFilter = (get, set) => (labelId) => {
    let fs = get().filters;
    if (!fs.includes(labelId)) {
        return;
    }
    if (fs.length === 1) {
        set({ filteredFragments: [...get().fragments.filter(f => f.onTimeline)], filters: []});
        return;
    }
    fs = [...fs.filter(f => f !== labelId)];
    const fragments = get().fragments;

    const ff = getSuitableFragments(fragments, fs);
    set({ filteredFragments: ff, filters: fs});
}

const getSuitableFragments = (fragments, filters) => {
    let ff = [];
    for (const f of fragments) {
        if (!f.onTimeline) {
            continue;
        }
        const labelIds = [...f.labels.map(l => l.id)];
        if (labelIds.some(l => filters.includes(l))) {
            ff.push(f);
        }
    }

    return ff;
}

export const resetFilters = (get, set) => () => {
    set({ filteredFragments: [...get().fragments.filter(f => f.onTimeline)], filters: []});
}