import styled, { css } from "styled-components";

const Button = ({ $variant, $color, $selected, children, ...props }) => {
    return (
        <StyledButton $variant={$variant} $color={$color} $selected={$selected} {...props}>
            {children}
        </StyledButton>
    );
};

const StyledButton = styled.button`
    box-sizing: border-box;
    padding: 1rem 2rem;
    border-radius: 5px;
    cursor: pointer;

    /* Default styles */
    color: var(--text-color);
    background: none;
    border: none;

    &:hover {
        filter: brightness(110%);
    };
    &:active {
        filter: brightness(90%);
    };

    /* Colors */
    ${({$color}) => {
        switch ($color) {
            case 'primary':
                return css`
                    color: var(--primary-color);
                    background-color: var(--primary-color);
                    border-color: var(--primary-color);
                `
            case 'positive':
                return css`
                    color: var(--main-green);
                    background-color: var(--main-green);
                    border-color: var(--main-green);
                `
            case 'negative':
                return css`
                    color: var(--main-red);
                    background-color: var(--main-red);
                    border-color: var(--main-red);
                `
            default:
                return css`
                    color: var(--text-color);
                    border-color: var(--text-color);
                    &:hover {
                        color: var(--primary-color);
                    }
                `
        }
    }};

    /* variants */
    ${({ $variant, $selected }) => {
        switch ($variant) {
            case 'text':
                return css`
                    background: none;
                    border: none;
                `;
            case 'outline':
                return css`
                    background: none;
                    border: 1px solid;
                    &:hover {
                        background: initial;
                    }
                `;
            case 'filled':
                return css`
                    border-style: solid;
                    border-width: 1px;
                    color: var(--background-color-lowest);
                `;
            case 'underlined':
                return css`
                    border-style: solid;
                    border-width: 0 0 1px 0;
                    border-color: ${$selected ? 'var(--primary-color)': 'var(--main-gray)'};
                    border-radius: 0;
                `;
            default:
                return css`
                    background: none;
                    border: none;
                `
        }
    }};

    ${({ $extrastyles }) => $extrastyles && css`${$extrastyles}`}
`;
 
export default Button;