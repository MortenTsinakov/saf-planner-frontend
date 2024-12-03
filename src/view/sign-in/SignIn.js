import { Button, Column, Container, Form, InputField, Text } from "components";
import { css } from "styled-components";
import SignInBackground from "./SignInBackground";

const SignIn = (props) => {
    return (
        <Container
            $extrastyles={css`
                height: calc(100vh - var(--navbar-height));
                background-color: var(--primary-color);
            `}
        > 
            {!props.isMobile && <SignInBackground />}
            <Form
                $extrastyles={css`
                    padding: 8rem;
                    gap: 1.5em;
                    min-height: 500px;
                    height: 75%;
                    width: 60rem;
                    z-index: 1;
                    background-color: var(--background-color-low);
                    border: 1px solid var(--main-gray);
                    
                    @media (max-width: 768px) {
                        width: 100%;
                        min-height: 300px;
                        height: 100%;
                        padding: 2em;
                        border-radius: 0;
                    }
                `}
            >
                <Column>
                    <Text $size={'5rem'}>Welcome</Text>
                    <Text $color='var(--primary-color);' $extrastyles={css`padding-bottom: 5rem;`}>Sign in to your account</Text>
                </Column>
                <InputField
                    label={'Email'}
                    type={'email'}
                    autoComplete={'off'}
                />
                <InputField
                    label={'Password'}
                    type={'password'}
                    autoComplete={'off'}
                />
                <Column
                    $extrastyles={css`margin-top: 5rem;`}
                >
                    <Button $variant={'filled'} $color={'primary'}>
                        Sign in
                    </Button>
                </Column>
            </Form>
        </Container>
    );
}
 
export default SignIn;