import styled, {css} from "styled-components";

const Column = ({children, ...props}) => {
    return (
        <Container {...props}>
            {children}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    ${({ $extrastyles }) => $extrastyles && css`${$extrastyles}`}
`
 
export default Column;