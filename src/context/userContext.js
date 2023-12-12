import { createContext } from 'react';

const UserContext = createContext();

const UserProvider = UserContext.Provider;

export default UserContext;
export { UserProvider };
