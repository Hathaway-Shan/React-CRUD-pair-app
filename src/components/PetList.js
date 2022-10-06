import usePets from '../hooks/usePets';
import PetCard from './PetCard';



export default function Pets() {
  const { pets } = usePets();
  return (
    <div>
      {pets.map((pet) => (
        <PetCard key={pet.id} {...pet} />
      ))}
    </div>
  );
}