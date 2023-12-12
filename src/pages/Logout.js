import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../context/userContext';

const Logout = () => {
  const { unsetUser, setUser } = useContext(UserContext);
  unsetUser();

  useEffect(() => {
    setUser({
      id: null,
      isAdmin: null,
    });
  }, []);

  return <Navigate to="/login" />;
};

export default Logout;
