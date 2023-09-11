import React, { useState,useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function SignupForm() {
    // const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const history = useHistory();
    // const authCtx = useContext(AuthContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();


     const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if password and confirmPassword match
        
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const confirmPassword= confirmRef.current.value;

        if (enteredPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);

        // let url;
        // if (isLogin) {
        //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUCboRWtRYqoJfilnJXv_ws_eNYSV3-wI';

        // } else {
          let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUCboRWtRYqoJfilnJXv_ws_eNYSV3-wI';
        // }
        
        try{
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
      
                if(!response.ok){
                    const data = await response.json();
                    let errorMessage="Authentication Failed";
    
                    if(data && data.error && data.error.message){
                        errorMessage=data.error.message;
                    }
    
                    throw new Error(errorMessage);
                }
          
                const data = await response.json();
                console.log(data);
                // const email=data.email;
                // const token=data.idToken;
                // const endpoint=`${email.replace(/\.|@/g, "")}`;
                // authCtx.login(token,endpoint);
                // history.replace('/products');
        } catch (err){
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
        // Form is valid, you can proceed with form submission or other actions
        // For this example, let's just display a success message
        setError('');
        alert('Signup successful!');
    };


    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="signup-container p-4 shadow">
            {/* <h1 className='text-center'>{isLogin ? 'Login' : 'Sign Up'}</h1> */}
                <Form onSubmit={handleSubmit}>
                    <h3 className='t text-center'>Sign Up</h3>
                    {error && <p className="text-danger">{error}</p>}
                    <Form.Group controlId="email" className='my-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            ref={emailRef}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password" className='my-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            ref={passwordRef}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword" className='my-2'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            ref={confirmRef}
                            required
                        />
                    </Form.Group>
                    <section>{isLoading && <p>Sending request...</p>}</section>
                    <Button className='my-2 w-100 rounded' variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default SignupForm;
