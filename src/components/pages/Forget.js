import { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";

const Forget = () => {
    const emailRef = useRef();
    const forgetHandler = async () => {
        const enteredEmail = emailRef.current.value;
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAgGnMLqkFKJf5KduGtLESSQoaaEzpd4sM';
        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: enteredEmail
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.ok) {
                const data = await res.json();
                let errorMessage = "Authentication Failed";

                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }

                throw new Error(errorMessage);
            }

        } catch (err) {
            alert(err.message);
        } finally {
            alert('Check your email')
        }
    }
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">

            <Container className="bg-white p-4 rounded shadow-lg my-5 mx-5">
                <h4 className="text-center">Forget Password</h4>
                <Form>
                    <Form.Group controlId="email">
                        <Form.Label>Email address : </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your registered email"
                            ref={emailRef}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 my-3"
                        onClick={forgetHandler}
                    >

                        Send Link
                    </Button>
                </Form>
            </Container>

        </Container>
    );
}

export default Forget;