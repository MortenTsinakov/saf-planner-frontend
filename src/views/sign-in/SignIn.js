import { Column,
         Container,
         FilledButton,
         Form,
         InputField,
         Typography } from "components";
import { useAuth } from "hooks";
import { useState } from "react";
import SignInBackground from "./SignInBackground";

const SignIn = (props) => {

    const { signIn, error } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    } 

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    if (error) {
        console.log(error);
    }

    return (
        <Container
            style={{
                height:'calc(100vh - var(--navbar-height))',
            }}
        > 
            {!props.isMobile && <SignInBackground />}
            <Form
                style={{
                    height: props.isMobile ? '100%' : '75%',
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
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                    autoComplete={'off'}
                />
                <InputField
                    label={'Password'}
                    type={'password'}
                    value={password}
                    onChange={(e) => handlePasswordChange(e)}
                    autoComplete={'off'}
                />
                <Column
                    style={{marginTop: '7rem'}}
                >
                    <FilledButton
                        onClick={(e) => signIn(e, {
                            email: email,
                            password: password,
                        })}
                    >
                        <Typography
                            color='dark'
                            fontSize='small'
                        >
                            Sign in
                        </Typography>
                    </FilledButton>
                </Column>
            </Form>
        </Container>
    );
}
 
export default SignIn;