import { ButtonText, Container, Row } from "components";
import { useAuth } from "hooks";
import { useNavigate } from "react-router-dom";

const DesktopNavbar = () => {

    const { authToken } = useAuth();
    const navigate = useNavigate();

    const handleNavigate = (e, link) => {
        e.preventDefault();
        navigate(link);
    }
    
    return (
        <Row
            style={{
                justifyContent: 'space-between',
                padding: '0 2rem 0 2rem',
                height: 'var(--navbar-height)',
                backgroundColor: 'var(--background-color-ternary)',
                alignItems: 'center',
                borderBottom: '1px solid var(--main-gray)',    
            }}
        >
            <Container>
                Future logo perhaps?
            </Container>
            <Row
                style={{
                    gap: '10' 
                }}
            >
                {!authToken &&
                    <ButtonText>
                        Login
                    </ButtonText>
                }
                {authToken &&
                    <ButtonText>
                        Dashboard
                    </ButtonText>
                }
                {authToken &&
                    <ButtonText>
                        Projects
                    </ButtonText>
                }
                {authToken &&
                    <ButtonText>
                        Account
                    </ButtonText>
                }
            </Row>
        </Row>
    );
}
 
export default DesktopNavbar;