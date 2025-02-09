import { Column, Container, FilledButton, Form, InputField, TextButton, Typography } from "components";
import { useAlerts, useAuth } from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {

    const { signIn, error, setError } = useAuth();
    const { addAlert } = useAlerts();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (error) {
            addAlert(error, 'error');
            setError(null);
        }
    }, [error, addAlert, setError]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    } 

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signIn(email, password);
    }

    const handleNavigate = (e, link) => {
        e.preventDefault();
        navigate(link);
    }

    return (
        <Container
            style={{
                minHeight:'calc(100vh - var(--navbar-height))',
                backgroundColor: !props.isMobile && 'var(--primary-color)',
                overflow: 'auto',
            }}
        > 
            <Form
                ariaLabel={'sign in form'}
                style={{
                    height: '100%',
                    width: props.isMobile ? '100%' : '60rem',
                    paddingTop: '100px',
                    overflow: 'auto',
                }}
            >
                <Column>
                    <Typography fontSize='large'>Welcome</Typography>
                    <Typography color='primary' style={{marginBottom:'7rem'}}>Sign in to your account</Typography>
                </Column>
                <InputField
                    aria-label='email'
                    type={'email'}
                    label={!props.isMobile && 'Email'}
                    placeholder={props.isMobile ? 'Email' : ''}
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete={'off'}
                />
                <InputField
                    aria-label='password'
                    type={'password'}
                    label={!props.isMobile && 'Password'}
                    placeholder={props.isMobile ? 'Password' : ''}
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete={'off'}
                />
                <Column
                    style={{marginTop: '7rem', gap:'2rem'}}
                >
                    <FilledButton
                        aria-label='submit'
                        onClick={(e) => handleSubmit(e)}
                    >
                        <Typography
                            color='dark'
                            fontSize='small'
                        >
                            Sign in
                        </Typography>
                    </FilledButton>
                    <TextButton
                        aria-label='navigate to sign up'
                        onClick={(e) => handleNavigate(e, '/sign-up')}
                    >
                        Don't have an account yet? Sign up here
                    </TextButton>
                </Column>
            </Form>
        </Container>
    );
}
 
export default SignIn;