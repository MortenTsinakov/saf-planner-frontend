import { Column, Container, FilledButton, Form, InputField, TextButton, Typography } from "components";
import { useAuth } from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {

    const navigate = useNavigate();
    const { signUp, error } = useAuth();

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        await signUp(email, firstName, lastName, password);
    }

    const handleNavigate = (e, link) => {
        e.preventDefault();
        navigate(link);
    }

    return (
        <Container
            style={{
                height:'calc(100vh - var(--navbar-height))',
                backgroundColor:'var(--secondary-color)',
            }}
        > 
            <Form
                style={{
                    height: props.isMobile ? '100%' : '75%',
                    width: '60rem',
                    zIndex: '1',
                }}
            >
                <Column>
                    <Typography fontSize='large'>Welcome</Typography>
                    <Typography color='secondary' style={{marginBottom:props.isMobile ? '0' : '7rem'}}>Create an account</Typography>
                </Column>
                <InputField
                    type={'email'}
                    label={!props.isMobile && 'Email'}
                    placeholder={props.isMobile ? 'Email' : ''}
                    color='secondary'
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete={'off'}
                />
                <InputField
                    type={'text'}
                    label={!props.isMobile && 'First name'}
                    placeholder={props.isMobile ? 'First name' : ''}
                    color='secondary'
                    value={firstName}
                    onChange={handleFirstNameChange}
                    autoComplete={'off'}
                />
                <InputField
                    type={'text'}
                    label={!props.isMobile && 'Last name'}
                    placeholder={props.isMobile ? 'Last name' : ''}
                    color='secondary'
                    value={lastName}
                    onChange={handleLastNameChange}
                    autoComplete={'off'}
                />
                <InputField
                    type={'password'}
                    label={!props.isMobile && 'Password'}
                    placeholder={props.isMobile ? 'Password' : ''}
                    color='secondary'
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete={'off'}
                />
                <Column
                    style={{marginTop: props.isMobile ? '2rem' : '7rem', gap:'2rem'}}
                >
                    <FilledButton
                        color='secondary'
                        onClick={(e) => handleSignUp(e)}
                    >
                        <Typography
                            color='dark'
                            fontSize='small'
                        >
                            Sign up
                        </Typography>
                    </FilledButton>
                    <TextButton
                        onClick={(e) => handleNavigate(e, '/sign-in')}
                        color='secondary'
                    >
                        Already have an account? Sign in here
                    </TextButton>
                </Column>
            </Form>
        </Container>
    );
}
 
export default SignUp;