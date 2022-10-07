import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/context';
import usePets from '../../hooks/usePets';
import PetCard from '../PetCard/PetCard';
import './PetList.css';

export default function Pets() {
  const { pets } = usePets();
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  return (
    <div className='petListWrapper' style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/monsterbackground.jpg'})`
    }}>
      {pets.map((pet) => (
        <PetCard key={pet.id} {...pet} />
      ))}
    </div>
  );
}
