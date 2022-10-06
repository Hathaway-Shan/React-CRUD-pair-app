import { useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { UserContext } from '../context/context';
import usePetDetail from '../hooks/usePetDetail';
import PetCard from './PetCard';

export default function PetDetail() {
  const params = useParams();
  usePetDetail(params);
  const { petDetail } = useContext(UserContext);

  return (
    <div className="wrapper">
      <NavLink to="/pets">Back to Pets Page</NavLink>
      <PetCard {...petDetail}></PetCard>
    </div>
  );
}
