import { useContext } from 'react';
import { UserContext } from '../../context/context';
import { signOut } from '../../services/auth';

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
      <div>
        <div>hello {user.email}</div>
        <button className="logout-button" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    );
}
