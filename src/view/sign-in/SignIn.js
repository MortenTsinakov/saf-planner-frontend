import { ButtonFilled, Column, Container, Form, InputField, Typography } from "components";
import SignInBackground from "./SignInBackground";

const SignIn = (props) => {
    return (
        <Container
            style={{
                height:'calc(100vh - var(--navbar-height))',
            }}
        > 
            {!props.isMobile && <SignInBackground />}
            <Form
                style={{
                    height: '75%',
                    width: '60rem',
                    zIndex: '1',
                }}
            >
                <Column>
                    <Typography fontSize='large'>Welcome</Typography>
                    <Typography color='primary' style={{marginBottom:'7rem'}}>Sign in to your account</Typography>
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
                    style={{marginTop: '7rem'}}
                >
                    <ButtonFilled>
                        <Typography
                            color='dark'
                            fontSize='small'
                        >
                            Sign in
                        </Typography>
                    </ButtonFilled>
                </Column>
            </Form>
        </Container>
    );
}
 
export default SignIn;