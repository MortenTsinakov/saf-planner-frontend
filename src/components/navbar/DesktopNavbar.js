import Button from "components/ui/Button";
import Container from "components/ui/Container";
import Row from "components/ui/Row";
import { useAuth } from "hooks";
import { useNavigate } from "react-router-dom";
import { css } from "styled-components";

const DesktopNavbar = () => {

    const { authToken } = useAuth();
    const navigate = useNavigate();

    const handleNavigate = (e, link) => {
        e.preventDefault();
        navigate(link);
    }
    
    return (
        <Row
            $extrastyles={css`
                justify-content: space-between;
                padding: 0 2rem 0 2rem;
                height: var(--navbar-height);
                background-color: var(--background-color-ternary);
                align-items: center;
                border-bottom: 1px solid var(--main-gray);    
            `}
            >
            <Container>
                Future logo perhaps?
            </Container>
            <Row
                $extrastyles={css`
                    gap: 0;    
                `}
            >
                {!authToken &&
                    <Button $variant={'text'} onClick={(e) => {handleNavigate(e, '/sign-in')}}>
                        Login
                    </Button>
                }
                {authToken &&
                    <Button $variant={'text'} onClick={(e) => {}}>
                        Dashboard
                    </Button>
                }
                {authToken &&
                    <Button $variant={'text'} onClick={(e) => {}}>
                        Projects
                    </Button>
                }
                {authToken &&
                    <Button $variant={'text'} onClick={(e) => {}}>
                        Account
                    </Button>
                }
            </Row>
        </Row>
    );
}
 
export default DesktopNavbar;