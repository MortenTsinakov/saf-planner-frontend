import ProjectContext from 'contexts/ProjectContext';
import { useContext } from 'react'

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
}