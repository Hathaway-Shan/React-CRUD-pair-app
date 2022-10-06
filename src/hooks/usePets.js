import { useEffect, useContext } from 'react';
import { getPets } from '../services/pets';
import { UserContext } from '../context/context';

export default function usePets() {
  const { pets, setPets } = useContext(UserContext);
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message);
      }
    };
    fetchPets();
  }, [pets, setPets]);
  return { pets, setPets };
}
