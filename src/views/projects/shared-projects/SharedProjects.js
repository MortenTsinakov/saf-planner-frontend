import { Column, Typography } from "components";
import SharedProjectCard from "./shared-projects-data/SharedProjectCard";

const SharedProjects = ({sharedProjects, ...props}) => {
    return (
        <Column>
            {
                sharedProjects.length > 0
                ?
                sharedProjects.map(p => (
                    <SharedProjectCard
                        project={p}
                        {...props}
                    />
                ))
                :
                <Typography color='label'>No projects to display...</Typography>
            }
        </Column>
    );
}
 
export default SharedProjects;