import { Column, FilledButton, Loading, Typography } from "components";
import { useAuth } from "hooks";
import { useState } from "react";
import { apiClient } from "services";

/**
 * Main page of the application after user has logged in.
 */
const Dashboard = () => {

    /** AT THE MOMENT THIS PAGE IS FOR TESTING WHETHER WE CAN REACH
     * BOTH OPEN AND CLOSED ENDPOINTS
     */
    const { user } = useAuth();
    const [message, setMessage] = useState("No endpoint has been called");

    const callEndpoint = async (endpoint) => {
        try {
            const response = await apiClient.get(`/test/${endpoint}`);
            setMessage(response.data);
        } catch(error) {
            setMessage(error.message);
        }
    }

    return ( 
        <Column
            style={{width:'50%', gap: '2rem'}}
        >
            <Typography fontSize='large'>
                Temporary page for testing different stuff... for now
            </Typography>
            {
                user &&
                <Typography fontSize='medium'>
                    Hello, {user.firstName}
                </Typography>    
            }
            <Column>
                <Typography fontSize='medium'>Calling open and closed endpoints</Typography>
                <FilledButton
                    onClick={() => callEndpoint('open')}
                >
                    Call open endpoint
                </FilledButton>
                <FilledButton
                    onClick={() => callEndpoint('closed')}
                >
                    Call closed endpoint
                </FilledButton>
                <Typography>
                    {message}
                </Typography>
            </Column>
            <Column>
                <Typography fontSize='medium'>Loading animation</Typography>
                <Loading />
            </Column>
        </Column>
    );
}
 
export default Dashboard;