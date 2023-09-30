import { Fragment } from "react";
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Home = () => {
   const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
   console.log(isDarkMode);
    return ( 
        <Fragment>
           <Container className="my-5 p-3">
           <Link to="/profile">Click here to profile</Link>
           <h1>Products</h1>
           </Container>
           
        </Fragment>

     );
}
 
export default Home;