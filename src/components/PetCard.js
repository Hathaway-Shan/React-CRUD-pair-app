import { useContext } from 'react';
import { UserContext } from '../context/context';
import { Link } from 'react-router-dom';

export default function PetCard({ name, species, description, owner_id, id }) {
  const { user } = useContext(UserContext);

  const owner = user.id === owner_id;
  return (
    <div className="pets">
      <h2>{name}</h2>
      <h3>{species}</h3>
      <p>{description}</p>
      {owner && (
        <p>
          <Link to={`/pets/edit/${id}`}>Edit </Link>
        </p>
      )}
    </div>
  );
}
