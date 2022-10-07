import { createContext, useState } from 'react';
import { getUser } from '../services/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pets, setPets] = useState([]);
  const [petDetail, setPetDetail] = useState({});
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [description, setDescription] = useState('');

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        email,
        setEmail,
        password,
        setPassword,
        pets,
        setPets,
        petDetail,
        setPetDetail,
        name,
        setName,
        species,
        setSpecies,
        description,
        setDescription
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
