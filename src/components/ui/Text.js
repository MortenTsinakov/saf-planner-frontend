import styled, { css } from "styled-components";

const Text = ({$size, $color, children, ...props}) => {
    return (
        <Container $size={$size} $color={$color} {...props}>
            {children}
        </Container>
    );
}

const Container = styled.span`
    ${({$size, $color}) => {
        return css`
            font-size: ${$size};
            color: ${$color};
        `
    }}

    ${({ $extrastyles }) => $extrastyles && css`${$extrastyles}`}
`
 
export default Text;