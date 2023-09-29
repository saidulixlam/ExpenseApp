import { useState, useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
// import { authSlice } from '../store/authSlice';
import { authActions } from '../store/authSlice';
import { useDispatch } from 'react-redux';
// import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';
const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const history = useHistory();

    // const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    if (token) {
        dispatch(authActions.login(token))
    }

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;

        if (!isLogin) {
            const confirmpassword = confirmpasswordRef.current.value;

            if (enteredPassword !== confirmpassword) {
                setError('Passwords do not match.');
                return;
            }
        }

        setIsLoading(true);

        let url;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgGnMLqkFKJf5KduGtLESSQoaaEzpd4sM';

        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgGnMLqkFKJf5KduGtLESSQoaaEzpd4sM';
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const data = await response.json();
                let errorMessage = "Authentication Failed";

                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();
            const email = data.email;
            const token = data.idToken;
            const endpoint = `${email.replace(/\.|@/g, "")}`;
            localStorage.setItem('endpoint',endpoint);

            // authCtx.login(token, endpoint);
            dispatch(authActions.login(token));
            history.replace('/expenses');
        } catch (err) {
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
        setError('');
    }
    const forgetPasswordHandler = () => {
        history.replace('/forget')
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="signup-container p-4 shadow rounded">
                <h1 className='text-center'>{isLogin ? 'Login' : 'Sign Up'}</h1>
                {error && <p className="text-danger">{error}</p>}
                <Form onSubmit={submitHandler} className='mt-4'>
                    <Form.Group controlId='email'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter your email'
                            required
                            ref={emailRef}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter your password'
                            required
                            ref={passwordRef}
                        />
                    </Form.Group>
                    {!isLogin && <Form.Group controlId='confirmpassword'>
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm your password'
                            required
                            ref={confirmpasswordRef}
                        />
                    </Form.Group>}
                    <div className='text-center'>
                        {!isLoading && (
                            <Button

                                variant='light'
                                className='mt-3 p-1 w-60 rounded btn-sm text-danger'
                                onClick={forgetPasswordHandler}
                            >
                                Forget Passowrd ?
                            </Button>
                        )}
                        {/* {isLoading && <p>Sending request...</p>} */}
                    </div>
                    <div className='text-center'>
                        {!isLoading && (
                            <Button
                                type='submit'
                                variant='primary'
                                className='mt-1 p-2 w-100 rounded'
                            >
                                {isLogin ? 'Login' : 'Create Account'}
                            </Button>
                        )}
                        {isLoading && <p>Sending request...</p>}
                    </div>
                    <div className='text-center'>
                        <Button
                            variant='none'
                            onClick={switchAuthModeHandler}
                            className='my-3 p-1 rounded btn-sm'
                        >
                            {isLogin
                                ? "New here ?SignUp"
                                : 'Have an account? Login..'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
