import Layout from '../store/Layout/Layout';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
const Home = () => {
   return (
      <Layout>
         <Container className="my-5 p-3">
            <Link to="/profile">Click here to profile</Link>
            <h1>Products</h1>
         </Container>
      </Layout>
   );
}

export default Home;