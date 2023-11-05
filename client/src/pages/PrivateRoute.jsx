import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
