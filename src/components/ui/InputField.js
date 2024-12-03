import styled, { css } from "styled-components";

const InputField = ({label, placeholder, type, value, onChange, ...props}) => {
    return (
        <Container {...props}>
            <Label>{label}</Label>
            <Input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </Container>
    );
};


const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-size: 1.8rem;

    ${({ $extrastyles }) => $extrastyles && css`${$extrastyles}`}
`;

const Label = styled.label`
    display: block;
    font-family: inherit;
`;

const Input = styled.input`
    padding: 1rem;
    color: var(--text-color);
    border-radius: 5px;
    border: 1px solid var(--main-gray);
    outline: none;
    width: 100%;
    font-size: 1.8rem;
    font-family: inherit;
    background-color: var(--background-color-high);

    &:focus {
        border: 1px solid var(--primary-color-variant);
    }
`;
 
export default InputField;