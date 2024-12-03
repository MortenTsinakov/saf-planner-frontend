import styled, { css } from "styled-components";

const Form = ({children, ...props}) => {
    return (
        <Container {...props}>
            {children}
        </Container>
    );
}

const Container = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    padding: 50px 50px;
    background-color: var(--background-color-medium);

    ${({ $extrastyles }) => $extrastyles && css`${$extrastyles}`}
`

export default Form;