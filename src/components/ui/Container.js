import styled, { css } from "styled-components";

const Container = ({children, ...props}) => {
    return (
        <StyledContainer {...props}>
            {children}
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    ${({ $extrastyles }) => $extrastyles && css`${$extrastyles}`}
`
 
export default Container;