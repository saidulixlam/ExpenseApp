import { useRef, useState, useEffect } from 'react';
import { Container, Form, Button, Card, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import AuthContext from '../store/auth-context';
const Profile = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [name, setName] = useState('');
    const [email,setEmail]=useState('');
    const phone ='8822266900';

    const nameRef = useRef();
    const imageRef = useRef();

    // const ctx = useContext(AuthContext);
    const token = localStorage.getItem('token');

    console.log('token : ', token);

    const handleUpdateButtonClick = async (e) => {
        e.preventDefault();

        const imageUrl = URL.createObjectURL(imageRef.current.files[0])

        const updatedName = nameRef.current.value;

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAgGnMLqkFKJf5KduGtLESSQoaaEzpd4sM',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: token,
                        displayName: updatedName,
                        photoUrl: imageUrl,
                        returnSecureToken: true,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            if (!response.ok) {
                const data = await response.json();
                console.log(data);
                let errorMessage = "Authentication Failed";

                if (data && data.error && data.error.message) {
                    errorMessage = data.error.message;
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log(data);

            setImageUrl(data.photoUrl)

        } catch (err) {
            alert(err.message);
        } finally {
            setName(updatedName);
        }


    }
    useEffect(() => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAgGnMLqkFKJf5KduGtLESSQoaaEzpd4sM', {
            method: 'POST',
            body: JSON.stringify({
                idToken: token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                console.log(response);
                console.log('post to get')
                return response.json();
            }
            // throw new Error("Failed to fetch user data");
        }).then((data) => {
            console.log('i m data', data)
            const user = data.users[0];
            if (user) {
                const imageUrl = user.photoUrl || ''
                setImageUrl(imageUrl);
                setName(user.displayName)
                setEmail(user.email)
            }

        }).catch(err => {
            console.log(err)
        })
    }, [])
   
    const verifyEmailHandler = async () => {
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAgGnMLqkFKJf5KduGtLESSQoaaEzpd4sM', {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'VERIFY_EMAIL',
                    idToken: token
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Firebase-Locale': 'en' // Set the language to English
                }
            })
            if (!response.ok) {
                throw new Error('request failed');
            }
            const data = await response.json();
            console.log(data);
            alert('Code sent on email kindly check');
            return data
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    return (
        <div className="my-5 pt-4">
            <h1 className="text-center">Welcome to your Profile ...!!!</h1>

            <section className="d-flex justify-content-between bg-light" style={{ fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>
                <p className="ml-auto mx-1 mt-3 p-2 bg-light shadow rounded" >"Work hard and spread your knowledge like eternity"</p>
                <section className="mr-auto mx-1 my-3 p-2 bg-light shadow rounded" >
                    <small>Your Profile is <strong>64% </strong>
                        completed .
                        <span><Link to='/profile'>Complete now...</Link></span></small>
                </section>
            </section>

            <Container className='my-5 p-4 bg-light rounded' fluid>
                <Row className='justify-content-center'>
                    <Col sm={12} md={6} lg={4} className='mb-3'>
                        <div className='text-center'>
                            <Image
                                className='bg-light shadow rounded-circle p-2'
                                style={{ height: '14rem', width: '14rem' }}
                                src={imageUrl}
                                roundedCircle
                            />
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={8}>
                        <Card className='rounded bg-light' style={{ border: 'none' }}>
                            <h4 className='text-center my-3 p-2 bg-light shadow rounded'>
                                User Details
                            </h4>
                            <div className='text-center my-1 mx-3 d-flex'>
                                <strong>
                                    <p>Name :</p>
                                </strong>
                                <p>&nbsp;{name}</p>
                            </div>
                            <div className='text-center my-1 mx-3 d-flex'>
                                <strong>Phone Number :</strong>
                                <p>&nbsp;{phone}</p>
                            </div>
                            <div className='text-center my-1 mx-3 d-flex'>
                                <strong>Email :</strong>
                                <p>&nbsp;{email}</p>
                                
                            </div>
                            <div className='text-center my-1 mx-3 d-flex'>
                            <Button variant="success" type="submit" className='my-2 p-1 mr-2' onClick={verifyEmailHandler}>Verify Email</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className='my-5 p-4 bg-light rounded' fluid>
                <h3 className="text-center bg-light shadow p-2 mx-2 rounded" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Update Profile
                </h3>
                <Form className="p-4 mx-2 bg-light shadow rounded">
                    <Form.Group controlId="formName">
                        <Form.Label>Update Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" ref={nameRef} />
                    </Form.Group>

                    <Form.Group controlId="formProfilePic">
                        <Form.Label>Update Profile Picture:</Form.Label>
                        <Form.Control type="file" accept=".jpg, .jpeg, .png" ref={imageRef} />
                    </Form.Group>

                    <Button variant="success" type="submit" className='my-2 p-1 mr-2' onClick={handleUpdateButtonClick}>
                        Update
                    </Button>
                    <Button variant="danger" className="my-2 p-1 mx-2">
                        Cancel
                    </Button>
                </Form>
            </Container>

        </div>
    );
}

export default Profile;