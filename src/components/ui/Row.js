import styled, {css} from "styled-components";

const Row = ({children, ...props}) => {
    return (
        <Container {...props}>
            {children}
        </Container>
    );
}

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap: 2rem;

    ${({ $extrastyles }) => $extrastyles && css`${$extrastyles}`}
`
 
export default Row;