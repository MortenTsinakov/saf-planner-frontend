import SharedProjectContext from "contexts/SharedProjectContext";
import { useContext } from "react"

export const useSharedProject = () => {
    const context = useContext(SharedProjectContext);
    if (!context) {
        throw new Error("useSharedProject must be used within SharedProjectProvider");
    }
    return context;
}