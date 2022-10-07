import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/context';
import { signOut } from '../../services/auth';
import './Header.css';

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  if (user)
    return (
      <div className='header-container'>
        <NavLink to="/pets/new">Add A Pet</NavLink>
        <div>hello {user.email}</div>
        <button className="logout-button" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    );
}
